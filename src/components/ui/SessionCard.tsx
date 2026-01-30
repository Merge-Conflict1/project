import { Calendar, Clock, Video } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SessionCardProps {
  tutorName: string;
  tutorAvatar?: string;
  topic: string;
  date: string;
  time: string;
  duration: string;
  status?: "upcoming" | "live" | "completed";
  className?: string;
}

const SessionCard = ({
  tutorName,
  tutorAvatar,
  topic,
  date,
  time,
  duration,
  status = "upcoming",
  className,
}: SessionCardProps) => {
  const statusConfig = {
    upcoming: {
      badge: "Upcoming",
      badgeClass: "bg-primary/10 text-primary",
      button: "Join Session",
      buttonVariant: "default" as const,
    },
    live: {
      badge: "Live Now",
      badgeClass: "bg-destructive/10 text-destructive animate-pulse",
      button: "Join Now",
      buttonVariant: "default" as const,
    },
    completed: {
      badge: "Completed",
      badgeClass: "bg-muted text-muted-foreground",
      button: "View Summary",
      buttonVariant: "secondary" as const,
    },
  };

  const config = statusConfig[status];

  return (
    <div
      className={cn(
        "relative p-4 rounded-2xl bg-card border border-border/50",
        "transition-all duration-300 animate-fade-in",
        status === "live" && "border-destructive/30 glow",
        className
      )}
    >
      {/* Status badge */}
      <div className="absolute top-4 right-4">
        <span className={cn(
          "px-2.5 py-1 rounded-full text-xs font-medium",
          config.badgeClass
        )}>
          {config.badge}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={tutorAvatar} alt={tutorName} />
          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
            {tutorName.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <h4 className="font-semibold text-foreground">{tutorName}</h4>
          <p className="text-sm text-muted-foreground">{topic}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          <span>{time}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Video className="h-4 w-4" />
          <span>{duration}</span>
        </div>
      </div>

      <Button
        className={cn(
          "w-full mt-4 rounded-xl",
          status === "live" && "bg-destructive hover:bg-destructive/90"
        )}
        variant={config.buttonVariant}
      >
        {status === "live" && <div className="h-2 w-2 rounded-full bg-current mr-2 animate-pulse" />}
        {config.button}
      </Button>
    </div>
  );
};

export default SessionCard;
