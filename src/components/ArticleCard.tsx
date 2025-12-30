import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface ArticleCardProps {
  id: string;
  title: string;
  date: string;
  category: string;
  categoryColor: string;
  icon?: string;
}

const ArticleCard = ({ 
  id,
  title, 
  date, 
  category, 
  categoryColor, 
  icon = "📄"
}: ArticleCardProps) => {
  return (
    <Link to={`/article/${id}`}>
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
          <span className="text-xs text-muted-foreground">{date}</span>
          <Badge 
            variant="outline" 
            className={`text-[10px] px-2 py-0.5 rounded font-medium ${categoryColor}`}
          >
            {category}
          </Badge>
        </div>
      </article>
    </Link>
  );
};

export default ArticleCard;
