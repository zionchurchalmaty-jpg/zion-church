/**
 * Frontend Logger
 *
 * A structured logger for the frontend that works in development and production.
 * In production, logs are only output if explicitly enabled.
 *
 * @example
 * ```tsx
 * import { logger } from '@/lib/logger';
 *
 * logger.debug('Detailed diagnostic info');
 * logger.info('Normal operation completed');
 * logger.warn('Unexpected but handled situation');
 * logger.error('Operation failed', { error, userId });
 * ```
 */

type LogLevel = "debug" | "info" | "warn" | "error";

interface LogContext {
  [key: string]: unknown;
}

const isDevelopment = process.env.NODE_ENV === "development";

function formatMessage(
  level: LogLevel,
  message: string,
  context?: LogContext
): string {
  const timestamp = new Date().toISOString();
  const contextStr = context ? ` ${JSON.stringify(context)}` : "";
  return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`;
}

function shouldLog(level: LogLevel): boolean {
  // Always log errors and warnings
  if (level === "error" || level === "warn") {
    return true;
  }
  // Only log debug/info in development
  return isDevelopment;
}

export const logger = {
  debug(message: string, context?: LogContext): void {
    if (shouldLog("debug")) {
      // eslint-disable-next-line no-console
      console.debug(formatMessage("debug", message, context));
    }
  },

  info(message: string, context?: LogContext): void {
    if (shouldLog("info")) {
      // eslint-disable-next-line no-console
      console.info(formatMessage("info", message, context));
    }
  },

  warn(message: string, context?: LogContext): void {
    if (shouldLog("warn")) {
      // eslint-disable-next-line no-console
      console.warn(formatMessage("warn", message, context));
    }
  },

  error(message: string, context?: LogContext): void {
    if (shouldLog("error")) {
      // eslint-disable-next-line no-console
      console.error(formatMessage("error", message, context));
    }
  },
};

/**
 * Hook-style logger for React components
 *
 * @example
 * ```tsx
 * const log = useLogger('MyComponent');
 * log.info('Component mounted');
 * ```
 */
export function useLogger(componentName: string) {
  return {
    debug(message: string, context?: LogContext): void {
      logger.debug(`[${componentName}] ${message}`, context);
    },
    info(message: string, context?: LogContext): void {
      logger.info(`[${componentName}] ${message}`, context);
    },
    warn(message: string, context?: LogContext): void {
      logger.warn(`[${componentName}] ${message}`, context);
    },
    error(message: string, context?: LogContext): void {
      logger.error(`[${componentName}] ${message}`, context);
    },
  };
}
