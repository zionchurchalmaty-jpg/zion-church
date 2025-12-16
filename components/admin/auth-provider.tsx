"use client";

import { auth, isFirebaseConfigured } from "@/lib/firebase/client";
import { logger } from "@/lib/logger";
import {
  GoogleAuthProvider,
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  isAuthorized: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const ALLOWED_DOMAIN = process.env.NEXT_PUBLIC_ADMIN_EMAIL_DOMAIN;

function isEmailAuthorized(email: string | null): boolean {
  if (!email || !ALLOWED_DOMAIN) return false;
  return email.endsWith(`@${ALLOWED_DOMAIN}`);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAuthorized = user ? isEmailAuthorized(user.email) : false;

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setLoading(false);
      setError(
        "Firebase is not configured. Please set up environment variables."
      );
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);

      if (user) {
        logger.debug("User signed in", { email: user.email });
        if (!isEmailAuthorized(user.email)) {
          setError(
            `Access denied. Only @${ALLOWED_DOMAIN} emails are allowed.`
          );
        } else {
          setError(null);
        }
      } else {
        setError(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = useCallback(async () => {
    if (!isFirebaseConfigured || !auth) {
      setError("Firebase is not configured");
      return;
    }

    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      // Optionally restrict to specific domain
      if (ALLOWED_DOMAIN) {
        provider.setCustomParameters({
          hd: ALLOWED_DOMAIN,
        });
      }
      const result = await signInWithPopup(auth, provider);

      if (!isEmailAuthorized(result.user.email)) {
        // Sign out if not authorized
        await signOut(auth);
        setError(`Access denied. Only @${ALLOWED_DOMAIN} emails are allowed.`);
        logger.warn("Unauthorized login attempt", {
          email: result.user.email,
        });
      } else {
        logger.info("User signed in successfully", {
          email: result.user.email,
        });
      }
    } catch (err) {
      const error = err as Error;
      logger.error("Sign in failed", { error: error.message });
      setError(error.message || "Failed to sign in");
    }
  }, []);

  const logout = useCallback(async () => {
    if (!auth) return;

    try {
      await signOut(auth);
      logger.info("User signed out");
    } catch (err) {
      const error = err as Error;
      logger.error("Sign out failed", { error: error.message });
    }
  }, []);

  const value: AuthContextValue = {
    user,
    loading,
    isAuthorized,
    signInWithGoogle,
    logout,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
