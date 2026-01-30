import { ArrowLeft, Star, Clock, Award, BookOpen, MessageSquare } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import SkillTag from "@/components/ui/SkillTag";
import CreditBadge from "@/components/ui/CreditBadge";

const tutorData = {
  name: "Alex Rivero",
  username: "@alexrivero",
  title: "Senior UX Designer & Guitar Enthusiast",
  avatar: "",
  rating: 4.9,
  sessions: 120,
  credits: 850,
  about: "I've been designing apps for 5 years at top tech firms. I believe in learning by doing. I'm currently looking to expand my horizons into music and languages. Happy to trade detailed UX audits or Figma lessons for Spanish conversation practice or Piano basics.",
  teachSkills: ["UI Design", "Figma", "User Research", "Prototyping", "Design Systems"],
  learnSkills: ["Spanish (Beginner)", "Jazz Piano", "React Native"],
  reviews: [
    {
      name: "Sarah J.",
      rating: 5,
      comment: "Alex is an amazing teacher! He explained some really tough topics in Figma so clearly.",
      avatar: "",
    },
    {
      name: "Mike T.",
      rating: 5,
      comment: "Great session on design systems. Very patient and knowledgeable.",
      avatar: "",
    },
  ],
};

const TutorProfile = () => {
  const navigate = useNavigate();
  const { name } = useParams();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 glass border-b border-border/50">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-xl"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <span className="font-medium">Profile</span>
        </div>
      </div>

      <div className="px-4 py-6 pb-32 space-y-6">
        {/* Profile header */}
        <div className="text-center animate-fade-in">
          <Avatar className="h-24 w-24 mx-auto ring-4 ring-primary/20">
            <AvatarImage src={tutorData.avatar} alt={tutorData.name} />
            <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
              {tutorData.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold text-foreground mt-4">{tutorData.name}</h1>
          <p className="text-sm text-muted-foreground">{tutorData.username}</p>
          <p className="text-sm text-secondary-foreground mt-2">{tutorData.title}</p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Star className="h-5 w-5 text-warning fill-warning" />
                <span className="text-lg font-bold">{tutorData.rating}</span>
              </div>
              <p className="text-xs text-muted-foreground">Rating</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-center">
              <span className="text-lg font-bold">{tutorData.sessions}+</span>
              <p className="text-xs text-muted-foreground">Sessions</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-center">
              <span className="text-lg font-bold">{tutorData.credits}</span>
              <p className="text-xs text-muted-foreground">Credits</p>
            </div>
          </div>
        </div>

        {/* About */}
        <section className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            About Me
          </h2>
          <p className="text-sm text-secondary-foreground leading-relaxed">
            {tutorData.about}
          </p>
        </section>

        {/* Skills I Teach */}
        <section className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              I Teach
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {tutorData.teachSkills.map((skill) => (
              <SkillTag key={skill} label={skill} variant="primary" />
            ))}
          </div>
        </section>

        {/* Skills I Want to Learn */}
        <section className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="flex items-center gap-2 mb-3">
            <Award className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              I Want to Learn
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {tutorData.learnSkills.map((skill) => (
              <SkillTag key={skill} label={skill} variant="outline" />
            ))}
          </div>
        </section>

        {/* Recent Reviews */}
        <section className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Recent Reviews
            </h2>
            <button className="text-sm text-primary hover:underline">See All</button>
          </div>
          <div className="space-y-3">
            {tutorData.reviews.map((review, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-card border border-border/50"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={review.avatar} alt={review.name} />
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                      {review.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{review.name}</h4>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 text-warning fill-warning" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{review.comment}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Fixed bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 glass border-t border-border/50">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl shrink-0">
            <MessageSquare className="h-5 w-5" />
          </Button>
          <Button className="flex-1 h-12 rounded-2xl bg-primary hover:bg-primary/90 font-semibold">
            Send Request
            <CreditBadge credits={1} size="sm" className="ml-2 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TutorProfile;
