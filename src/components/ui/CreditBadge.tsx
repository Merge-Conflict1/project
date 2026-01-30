import { Coins, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface CreditBadgeProps {
  credits: number;
  size?: "sm" | "md" | "lg";
  showTrend?: boolean;
  className?: string;
}

const CreditBadge = ({ 
  credits, 
  size = "md", 
  showTrend = false,
  className 
}: CreditBadgeProps) => {
  const sizeClasses = {
    sm: "px-2 py-1 text-xs gap-1",
    md: "px-3 py-1.5 text-sm gap-1.5",
    lg: "px-4 py-2 text-base gap-2",
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full bg-primary/10 border border-primary/20",
        "font-semibold text-primary",
        sizeClasses[size],
        className
      )}
    >
      <Coins className={iconSizes[size]} />
      <span>{credits}</span>
      <span className="text-primary/70">Credits</span>
      {showTrend && (
        <TrendingUp className={cn(iconSizes[size], "text-success ml-1")} />
      )}
    </div>
  );
};

export default CreditBadge;
