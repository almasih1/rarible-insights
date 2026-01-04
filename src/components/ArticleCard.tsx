import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface ArticleCardProps {
  id: string;
  slug: string;
  title: string;
  created_at: string;
  icon?: string;
  seo_category?: {
    id: string;
    title: string;
    slug: string;
  };
}

const ArticleCard = ({ 
  slug,
  title, 
  created_at, 
  icon = "📄",
  seo_category
}: ArticleCardProps) => {
  // Format date
  const formattedDate = new Date(created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link to={`/digital-nomad-relocation/${slug}`}>
      <article className="bg-card border border-border/40 rounded-xl p-4 hover:shadow-md transition-all cursor-pointer group">
        {/* Icon and Title */}
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-xl shrink-0">
            {icon}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2">
              {title}
            </h3>
          </div>
        </div>
        
        {/* Date and Category Row */}
        <div className="flex items-center justify-between pt-3 border-t border-border/30">
          <span className="text-xs text-muted-foreground">{formattedDate}</span>
          {seo_category ? (
            <Badge 
              variant="outline" 
              className="text-[10px] px-2 py-0.5 rounded font-medium bg-blue-50 text-blue-700 border-blue-200"
            >
              {seo_category.title}
            </Badge>
          ) : (
            <Badge 
              variant="outline" 
              className="text-[10px] px-2 py-0.5 rounded font-medium bg-gray-50 text-gray-600 border-gray-200"
            >
              Uncategorized
            </Badge>
          )}
        </div>
      </article>
    </Link>
  );
};

export default ArticleCard;
