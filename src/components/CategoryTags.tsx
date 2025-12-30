import {
  Bot,
  MessageCircle,
  Video,
  Bitcoin,
  Headphones,
  Palette,
  Code,
  ShoppingCart,
  GraduationCap,
  Tv,
  DollarSign,
  Gamepad2,
  Leaf,
  Heart,
  Cpu,
  Scale,
  Megaphone,
  Store,
  Newspaper,
  Blocks,
  Briefcase,
  Building2,
  Users,
  Cloud,
  TrendingUp,
  Shield,
  Share2,
  Plane,
  Wrench,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const categories = [
  { name: "Artificial Intelligence", icon: Bot },
  { name: "Community", icon: MessageCircle },
  { name: "Content Creation", icon: Video },
  { name: "Crypto & Web3", icon: Bitcoin },
  { name: "Crypto Analytics", icon: Headphones },
  { name: "Design Tools", icon: Palette },
  { name: "Developer Tools", icon: Code },
  { name: "E-commerce", icon: ShoppingCart },
  { name: "Education", icon: GraduationCap },
  { name: "Entertainment", icon: Tv },
  { name: "Finance", icon: DollarSign },
  { name: "Digitaal Nomads", icon: Gamepad2 },
  { name: "Solopreneur", icon: Leaf },
  { name: "Health & Fitness", icon: Heart },
  { name: "IoT & Hardware", icon: Cpu },
  { name: "Legal", icon: Scale },
  { name: "Marketing", icon: Megaphone },
  { name: "Marketplace", icon: Store },
  { name: "Geopolitics", icon: Newspaper },
  { name: "No-Code", icon: Blocks },
  { name: "Productivity", icon: Briefcase },
  { name: "Real Estate", icon: Building2 },
  { name: "Investing", icon: Users },
  { name: "SaaS", icon: Cloud },
  { name: "Relocation", icon: TrendingUp },
  { name: "Security", icon: Shield },
  { name: "Social Media", icon: Share2 },
  { name: "Travel", icon: Plane },
  { name: "Utilities", icon: Wrench },
];

interface CategoryTagsProps {
  selectedCategory: string | null;
  onCategoryClick: (category: string) => void;
}

const CategoryTags = ({ selectedCategory, onCategoryClick }: CategoryTagsProps) => {
  return (
    <section className="py-12 px-4">
      <h2 className="font-serif text-2xl md:text-3xl font-normal text-center mb-8">Browse other categories</h2>
      <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
        {categories.map((category) => (
          <Badge
            key={category.name}
            variant="outline"
            onClick={() => onCategoryClick(category.name)}
            className={`px-4 py-2 text-sm font-normal cursor-pointer hover:bg-muted transition-colors gap-2 ${
              selectedCategory === category.name 
                ? "bg-foreground text-background border-foreground" 
                : "bg-background"
            }`}
          >
            <category.icon className="w-4 h-4" />
            {category.name}
          </Badge>
        ))}
      </div>
    </section>
  );
};

export default CategoryTags;
