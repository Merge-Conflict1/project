import { Star, Clock, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import SkillTag from "./SkillTag";
import CreditBadge from "./CreditBadge";
import { cn } from "@/lib/utils";

interface TutorCardProps {
  name: string;
  avatar?: string;
  title: string;
  skills: string[];
  rating: number;
  sessions: number;
  credits: number;
  isAvailable?: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const TutorCard = ({
  name,
  avatar,
  title,
  skills,
  rating,
  sessions,
  credits,
  isAvailable = true,
  onClick,
  className,
  style,
}: TutorCardProps) => {
  return (
    <div
      onClick={onClick}
      style={style}
      className={cn(
        "group relative p-4 rounded-2xl bg-card border border-border/50",
        "transition-all duration-300 hover:border-primary/30 hover:shadow-lg",
        "cursor-pointer animate-fade-in",
        className
      )}
    >
      {/* Availability indicator */}
      <div className="absolute top-4 right-4">
        <div className={cn(
          "flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium",
          isAvailable 
            ? "bg-success/10 text-success" 
            : "bg-muted text-muted-foreground"
        )}>
          <div className={cn(
            "h-1.5 w-1.5 rounded-full",
            isAvailable ? "bg-success animate-pulse" : "bg-muted-foreground"
          )} />
          {isAvailable ? "Available" : "Busy"}
        </div>
      </div>

      <div className="flex items-start gap-3">
        <Avatar className="h-14 w-14 ring-2 ring-border group-hover:ring-primary/30 transition-all">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
            {name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{name}</h3>
          <p className="text-sm text-muted-foreground truncate">{title}</p>
          
          <div className="flex items-center gap-3 mt-2 text-sm">
            <div className="flex items-center gap-1 text-warning">
              <Star className="h-4 w-4 fill-warning" />
              <span className="font-medium">{rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{sessions} sessions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mt-3">
        {skills.slice(0, 3).map((skill) => (
          <SkillTag key={skill} label={skill} variant="primary" />
        ))}
        {skills.length > 3 && (
          <SkillTag label={`+${skills.length - 3}`} variant="outline" />
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
        <CreditBadge credits={credits} size="sm" />
        <Button 
          size="sm" 
          className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <MessageSquare className="h-4 w-4 mr-1.5" />
          Request
        </Button>
      </div>
    </div>
  );
};

export default TutorCard;
