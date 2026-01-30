import { cn } from "@/lib/utils";

interface SkillTagProps {
  label: string;
  variant?: "default" | "primary" | "outline";
  size?: "sm" | "md";
  onClick?: () => void;
  className?: string;
}

const SkillTag = ({ 
  label, 
  variant = "default", 
  size = "sm",
  onClick,
  className 
}: SkillTagProps) => {
  const baseClasses = "inline-flex items-center rounded-full font-medium transition-all duration-200";
  
  const variantClasses = {
    default: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    primary: "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20",
    outline: "border border-border text-muted-foreground hover:border-primary hover:text-primary",
  };

  const sizeClasses = {
    sm: "px-3 py-1 text-xs",
    md: "px-4 py-1.5 text-sm",
  };

  return (
    <span
      onClick={onClick}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        onClick && "cursor-pointer",
        className
      )}
    >
      {label}
    </span>
  );
};

export default SkillTag;
