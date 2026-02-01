import { useState, useEffect } from "react";
import { Search, Filter, Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TutorCard from "@/components/ui/TutorCard";
import SkillTag from "@/components/ui/SkillTag";
import CreditBadge from "@/components/ui/CreditBadge";
import { supabase } from "@/integrations/supabase/client";

const filters = ["Top Rated", "Available Now", "New"];

// Tutors data is now fetched from Supabase

const SearchTutors = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Top Rated");
  const [tutors, setTutors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutors = async () => {
      setLoading(true);
      try {
        // Simple fetch for now, can be improved with join on skills
        const { data, error } = await supabase.from("profiles").select("*");

        if (error) throw error;

        // Client side filter for demo purposes (should be DB side in prod)
        // Also filtering out current user ideally
        const filtered =
          data?.filter(
            (p) =>
              !searchQuery ||
              p.name?.toLowerCase().includes(searchQuery.toLowerCase())
          ) || [];
        setTutors(filtered);
      } catch (error) {
        console.error("Error fetching tutors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, [searchQuery]);

  return (
    <AppLayout title="Search Tutors">
      <div className="px-4 py-6 space-y-5">
        {/* Search input */}
        <div className="relative animate-fade-in">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search skills or tutors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-12 h-12 rounded-2xl bg-secondary border-border/50 focus:border-primary"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-xl"
          >
            <Filter className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>

        {/* Filter tabs */}
        <div
          className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          {filters.map((filter) => (
            <SkillTag
              key={filter}
              label={filter}
              variant={activeFilter === filter ? "primary" : "outline"}
              size="md"
              onClick={() => setActiveFilter(filter)}
            />
          ))}
        </div>

        {/* Results count */}
        <p
          className="text-sm text-muted-foreground animate-fade-in"
          style={{ animationDelay: "0.15s" }}
        >
          Showing{" "}
          <span className="text-foreground font-medium">{tutors.length}</span>{" "}
          tutors
          {searchQuery && ` for "${searchQuery}"`}
        </p>

        {/* Tutor list */}
        {loading ? (
          <div className="text-center py-8 text-muted-foreground">
            Loading specific tutors...
          </div>
        ) : (
          <div className="space-y-4">
            {tutors.map((tutor, i) => (
              <TutorCard
                key={tutor.id}
                name={tutor.name}
                title={
                  tutor.bio ? tutor.bio.substring(0, 30) + "..." : "Tutor"
                }
                rating={5.0} // Placeholder until review system is active
                sessions={0}
                credits={tutor.credits}
                isAvailable={true}
                skills={[]} // Use a separate query to fetch their skills if needed or join in future
                onClick={() => navigate(`/tutor/${tutor.id}`)}
                className="animate-fade-in"
                style={{
                  animationDelay: `${0.2 + i * 0.1}s`,
                } as React.CSSProperties}
              />
            ))}
          </div>
        )}

        {/* AI Fallback */}
        {!loading && tutors.length === 0 && (
          <div className="text-center py-8 animate-fade-in">
            <p className="text-muted-foreground mb-4">
              No tutors found for "{searchQuery}"
            </p>
          </div>
        )}

        {/* AI Learning Option */}
        <div
          className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 animate-fade-in"
          style={{ animationDelay: "0.6s" }}
        >
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">
                Can't wait? Learn with AI
              </p>
              <p className="text-xs text-muted-foreground">
                Get instant feedback on your questions
              </p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <CreditBadge credits={0.5} size="sm" />
              <Button size="sm" className="rounded-full text-xs h-7 px-3">
                Start <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default SearchTutors;
