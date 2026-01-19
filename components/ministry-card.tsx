import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MinistryCardProps {
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  variant?: "feature" | "compact";
  className?: string;
}

export function MinistryCard({
  title,
  icon: Icon,
  children,
  variant = "feature",
  className,
}: MinistryCardProps) {
  const cardStyle = {
    iconBg: "bg-navy/5",
    iconColor: "text-primary-orange",
    borderColor: "border-navy"
  };

  {/* Feature Card */}
  if (variant === "feature") {
    return (
      <section
        className={cn(
          "bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100",
          className
        )}
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          {Icon && (
            <div
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center",
                cardStyle.iconBg
              )}
            >
              <Icon className={cn("w-6 h-6", cardStyle.iconColor)} />
            </div>
          )}
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-navy leading-none mt-[2px]">
            {title}
          </h2>
        </div>
        <div>{children}</div>
      </section>
    );
  }

  {/* Compact Card */}
  return (
    <div
      className={cn(
        "bg-white p-6 rounded-xl shadow-sm border-t-4",
        cardStyle.borderColor,
        className
      )}
    >
      <div className="mb-4">
        {Icon && <Icon className={cn("w-8 h-8 mb-3", cardStyle.iconColor)} />}
        <h4 className="font-bold text-xl text-navy">{title}</h4>
      </div>
      <div>{children}</div>
    </div>
  );
}
