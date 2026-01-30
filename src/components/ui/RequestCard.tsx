import { Clock, Check, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RequestCardProps {
  name: string;
  avatar?: string;
  topic: string;
  message: string;
  timeAgo: string;
  type: "incoming" | "outgoing";
  status?: "pending" | "accepted" | "rejected";
  className?: string;
}

const RequestCard = ({
  name,
  avatar,
  topic,
  message,
  timeAgo,
  type,
  status = "pending",
  className,
}: RequestCardProps) => {
  return (
    <div
      className={cn(
        "relative p-4 rounded-2xl bg-card border border-border/50",
        "transition-all duration-300 animate-fade-in",
        status === "pending" && type === "incoming" && "border-primary/20",
        className
      )}
    >
      {/* Status indicator */}
      <div className="absolute top-4 right-4">
        <span className={cn(
          "px-2 py-1 rounded-full text-xs font-medium capitalize",
          status === "pending" && "bg-warning/10 text-warning",
          status === "accepted" && "bg-success/10 text-success",
          status === "rejected" && "bg-destructive/10 text-destructive"
        )}>
          {status}
        </span>
      </div>

      <div className="flex items-start gap-3">
        <Avatar className="h-11 w-11">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
            {name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-foreground">{name}</h4>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {timeAgo}
            </span>
          </div>
          <p className="text-sm font-medium text-primary mt-0.5">{topic}</p>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{message}</p>
        </div>
      </div>

      {/* Action buttons for incoming pending requests */}
      {type === "incoming" && status === "pending" && (
        <div className="flex gap-2 mt-4">
          <Button 
            variant="secondary" 
            size="sm" 
            className="flex-1 rounded-xl"
          >
            <X className="h-4 w-4 mr-1.5" />
            Decline
          </Button>
          <Button 
            size="sm" 
            className="flex-1 rounded-xl bg-primary hover:bg-primary/90"
          >
            <Check className="h-4 w-4 mr-1.5" />
            Accept
          </Button>
        </div>
      )}
    </div>
  );
};

export default RequestCard;
