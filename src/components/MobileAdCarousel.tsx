import { useEffect, useRef } from "react";
import SidebarAd from "./SidebarAd";

interface Ad {
  id: string;
  name: string;
  icon: string;
  description: string;
  url?: string;
  bg_color: string;
}

interface MobileAdCarouselProps {
  ads: Ad[];
  direction?: 'left' | 'right';
}

const MobileAdCarousel = ({ ads, direction = 'left' }: MobileAdCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || ads.length === 0) return;

    let animationFrameId: number;
    let scrollPosition = direction === 'left' ? 0 : scrollContainer.scrollWidth;

    const scroll = () => {
      if (!scrollContainer) return;

      if (direction === 'left') {
        scrollPosition += 0.5; // Speed
        if (scrollPosition >= scrollContainer.scrollWidth / 2) {
          scrollPosition = 0;
        }
      } else {
        scrollPosition -= 0.5; // Speed
        if (scrollPosition <= 0) {
          scrollPosition = scrollContainer.scrollWidth / 2;
        }
      }

      scrollContainer.scrollLeft = scrollPosition;
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [ads, direction]);

  // Duplicate ads for infinite scroll effect
  const duplicatedAds = [...ads, ...ads];

  return (
    <div className="w-full overflow-hidden py-3 bg-background">
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide px-4"
        style={{ 
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {duplicatedAds.map((ad, index) => (
          <div key={`${ad.id}-${index}`} className="flex-shrink-0 w-64">
            <SidebarAd
              icon={ad.icon}
              name={ad.name}
              description={ad.description}
              bgColor={ad.bg_color}
              url={ad.url}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileAdCarousel;
