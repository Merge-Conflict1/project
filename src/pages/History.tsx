import { ArrowUpRight, ArrowDownLeft, Coins, Sparkles } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { cn } from "@/lib/utils";

const creditHistory = [
  {
    type: "earned",
    title: "Taught Python Basics",
    subtitle: "Session with Mike T.",
    date: "Today, 2:30 PM",
    amount: 1,
  },
  {
    type: "spent",
    title: "Learned Piano",
    subtitle: "Session with Elena R.",
    date: "Yesterday, 4:00 PM",
    amount: -1,
  },
  {
    type: "spent",
    title: "AI Learning Session",
    subtitle: "Spanish Vocabulary",
    date: "Jan 28, 10:15 AM",
    amount: -0.5,
    isAI: true,
  },
  {
    type: "earned",
    title: "Welcome Bonus",
    subtitle: "Profile completed",
    date: "Jan 25, 9:00 AM",
    amount: 3,
    isBonus: true,
  },
];

const History = () => {
  const currentBalance = 2.5;

  return (
    <AppLayout title="Credit History">
      <div className="px-4 py-6 space-y-6">
        {/* Balance card */}
        <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-card via-card to-secondary border border-border/50 animate-scale-in">
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
          <div className="relative text-center">
            <p className="text-sm text-muted-foreground uppercase tracking-wide">Current Balance</p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <Coins className="h-8 w-8 text-primary" />
              <span className="text-5xl font-bold gradient-text">{currentBalance}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Skill Credits</p>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <button className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
            All
          </button>
          <button className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors">
            Earned
          </button>
          <button className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors">
            Spent
          </button>
        </div>

        {/* Transaction list */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Transactions
          </h3>
          {creditHistory.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/50 animate-fade-in"
              style={{ animationDelay: `${0.15 + i * 0.05}s` }}
            >
              <div className={cn(
                "h-10 w-10 rounded-xl flex items-center justify-center shrink-0",
                item.type === "earned" ? "bg-success/10" : "bg-destructive/10"
              )}>
                {item.isAI ? (
                  <Sparkles className="h-5 w-5 text-primary" />
                ) : item.isBonus ? (
                  <Coins className="h-5 w-5 text-warning" />
                ) : item.type === "earned" ? (
                  <ArrowDownLeft className="h-5 w-5 text-success" />
                ) : (
                  <ArrowUpRight className="h-5 w-5 text-destructive" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.date}</p>
              </div>

              <div className={cn(
                "text-lg font-bold",
                item.type === "earned" ? "text-success" : "text-foreground"
              )}>
                {item.amount > 0 ? "+" : ""}{item.amount}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default History;
