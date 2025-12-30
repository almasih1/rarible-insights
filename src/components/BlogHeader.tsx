import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Star, Search, Plus } from "lucide-react";

const BlogHeader = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      toast({
        title: "Search",
        description: `Searching for: ${searchQuery}`,
      });
    }
  };

  return (
    <header className="bg-background pt-6 pb-8 px-4">
      <div className="max-w-3xl mx-auto text-center">
        {/* Brand */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
          <span className="font-medium text-lg tracking-tight text-muted-foreground">TrustMRR</span>
        </div>

        {/* Main Title */}
        <h1 className="font-serif text-2xl md:text-4xl lg:text-5xl font-normal tracking-wide mb-8 leading-tight text-foreground">
          The database of verified<br />
          startup revenues
        </h1>
        
        {/* Search & Add Row */}
        <form onSubmit={handleSearch} className="flex items-center justify-center gap-3 max-w-lg mx-auto mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search startups, founders, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 h-11 rounded-full border border-border/50 bg-background shadow-none focus-visible:ring-1"
            />
          </div>
          <Button 
            type="button" 
            className="h-11 px-5 rounded-full font-medium gap-2"
          >
            <Plus className="w-4 h-4" />
            Add startup
          </Button>
        </form>

        {/* Filter Tags */}
        <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
          <span className="hover:text-foreground cursor-pointer transition-colors">New</span>
          <span className="text-border">·</span>
          <span className="hover:text-foreground cursor-pointer transition-colors">Stats</span>
          <span className="text-border">·</span>
          <span className="hover:text-foreground cursor-pointer transition-colors">Acquisition</span>
          <span className="text-border">·</span>
          <span className="hover:text-foreground cursor-pointer transition-colors">$1 vs $1,000,000</span>
        </div>
      </div>
    </header>
  );
};

export default BlogHeader;