import { Search } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const conversations = [
  {
    name: "Jane D.",
    avatar: "",
    lastMessage: "Hi there! You wanted to learn about Python loops.",
    time: "2m",
    unread: 2,
    online: true,
  },
  {
    name: "Sarah J.",
    avatar: "",
    lastMessage: "Yes! I'm struggling with while loops specifically. I keep getting stuck in...",
    time: "1h",
    unread: 0,
    online: true,
  },
  {
    name: "Mike T.",
    avatar: "",
    lastMessage: "Great session today! Looking forward to the next one.",
    time: "3h",
    unread: 0,
    online: false,
  },
  {
    name: "Elena R.",
    avatar: "",
    lastMessage: "The design feedback was really helpful, thank you!",
    time: "1d",
    unread: 0,
    online: false,
  },
];

const scheduleMessage = {
  type: "schedule",
  name: "Pro Tip",
  message: "Agree on a specific topic before booking to make sessions more productive!",
};

const Messages = () => {
  return (
    <AppLayout title="Messages">
      <div className="px-4 py-6 space-y-4">
        {/* Search */}
        <div className="relative animate-fade-in">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search messages..."
            className="pl-12 h-11 rounded-2xl bg-secondary border-border/50 focus:border-primary"
          />
        </div>

        {/* Pro Tip */}
        <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-primary text-lg">💡</span>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{scheduleMessage.name}</p>
              <p className="text-sm text-muted-foreground mt-0.5">{scheduleMessage.message}</p>
            </div>
          </div>
        </div>

        {/* Conversation list */}
        <div className="space-y-1">
          {conversations.map((convo, i) => (
            <div
              key={convo.name}
              className={cn(
                "flex items-center gap-3 p-3 rounded-2xl",
                "transition-all duration-200 hover:bg-secondary cursor-pointer",
                "animate-fade-in"
              )}
              style={{ animationDelay: `${0.15 + i * 0.05}s` }}
            >
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={convo.avatar} alt={convo.name} />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {convo.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {convo.online && (
                  <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-success border-2 border-background" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-foreground">{convo.name}</h4>
                  <span className="text-xs text-muted-foreground">{convo.time}</span>
                </div>
                <p className="text-sm text-muted-foreground truncate mt-0.5">
                  {convo.lastMessage}
                </p>
              </div>

              {convo.unread > 0 && (
                <div className="h-5 min-w-[20px] rounded-full bg-primary flex items-center justify-center px-1.5">
                  <span className="text-xs font-semibold text-primary-foreground">
                    {convo.unread}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Messages;
