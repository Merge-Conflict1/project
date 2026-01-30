import { Camera, Edit2, ChevronRight, LogOut, Settings, HelpCircle, Shield } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import SkillTag from "@/components/ui/SkillTag";
import { cn } from "@/lib/utils";

const user = {
  name: "Alex Morgan",
  email: "alex.morgan@email.com",
  avatar: "",
  bio: "Passionate about design and always eager to learn new skills. Currently focusing on UI/UX and exploring music.",
  teachSkills: ["Photography", "UI Design", "Copywriting"],
  learnSkills: ["Guitar", "Spanish", "Cooking"],
  stats: {
    sessionsCompleted: 24,
    averageRating: 4.8,
    creditsEarned: 45,
  },
};

const menuItems = [
  { icon: Edit2, label: "Edit Profile", action: () => {} },
  { icon: Settings, label: "Settings", action: () => {} },
  { icon: Shield, label: "Privacy & Security", action: () => {} },
  { icon: HelpCircle, label: "Help & Support", action: () => {} },
];

const Profile = () => {
  return (
    <AppLayout title="Profile">
      <div className="px-4 py-6 space-y-6">
        {/* Profile header */}
        <div className="text-center animate-fade-in">
          <div className="relative inline-block">
            <Avatar className="h-24 w-24 ring-4 ring-primary/20">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary flex items-center justify-center border-2 border-background">
              <Camera className="h-4 w-4 text-primary-foreground" />
            </button>
          </div>
          <h1 className="text-2xl font-bold text-foreground mt-4">{user.name}</h1>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          {[
            { label: "Sessions", value: user.stats.sessionsCompleted },
            { label: "Rating", value: user.stats.averageRating },
            { label: "Earned", value: user.stats.creditsEarned },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-4 rounded-2xl bg-card border border-border/50 text-center"
            >
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Bio */}
        <div className="animate-fade-in" style={{ animationDelay: "0.15s" }}>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            About
          </h3>
          <p className="text-sm text-secondary-foreground leading-relaxed">{user.bio}</p>
        </div>

        {/* Skills I Teach */}
        <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            I Can Teach
          </h3>
          <div className="flex flex-wrap gap-2">
            {user.teachSkills.map((skill) => (
              <SkillTag key={skill} label={skill} variant="primary" />
            ))}
          </div>
        </div>

        {/* Skills I Want to Learn */}
        <div className="animate-fade-in" style={{ animationDelay: "0.25s" }}>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            I Want to Learn
          </h3>
          <div className="flex flex-wrap gap-2">
            {user.learnSkills.map((skill) => (
              <SkillTag key={skill} label={skill} variant="outline" />
            ))}
          </div>
        </div>

        {/* Menu items */}
        <div className="space-y-2 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className={cn(
                "w-full flex items-center gap-3 p-4 rounded-2xl",
                "bg-card border border-border/50",
                "transition-all duration-200 hover:bg-secondary"
              )}
            >
              <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center">
                <item.icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <span className="flex-1 text-left font-medium text-foreground">
                {item.label}
              </span>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
          ))}
        </div>

        {/* Logout */}
        <Button
          variant="outline"
          className="w-full h-12 rounded-2xl border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive animate-fade-in"
          style={{ animationDelay: "0.35s" }}
        >
          <LogOut className="h-5 w-5 mr-2" />
          Sign Out
        </Button>
      </div>
    </AppLayout>
  );
};

export default Profile;
