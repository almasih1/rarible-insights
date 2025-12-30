import { Badge } from "@/components/ui/badge";

interface StartupCardProps {
  icon: string;
  name: string;
  description: string;
  totalRevenue: string;
  forSale?: boolean;
}

const StartupCard = ({ 
  icon, 
  name, 
  description, 
  totalRevenue,
  forSale = false
}: StartupCardProps) => {
  return (
    <article className="bg-card border border-border/40 rounded-xl p-4 hover:shadow-md transition-all cursor-pointer group relative">
      {forSale && (
        <Badge 
          className="absolute top-3 right-3 bg-green-100 text-green-700 border-green-300 text-[10px] px-2 py-0.5 font-medium"
        >
          FOR SALE
        </Badge>
      )}
      
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-xl shrink-0 overflow-hidden">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="text-xs text-muted-foreground truncate">{description}</p>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-border/30">
        <p className="text-xs text-muted-foreground">Total revenue</p>
        <p className="font-bold text-base">{totalRevenue}</p>
      </div>
    </article>
  );
};

export default StartupCard;
