interface SidebarAdProps {
  icon: string;
  name: string;
  description: string;
  bgColor?: string;
  url?: string;
}

const SidebarAd = ({ icon, name, description, bgColor = "bg-gray-50", url }: SidebarAdProps) => {
  // Extract border color from bgColor
  // bg-pink-50 -> border-pink-200
  // bg-blue-50 -> border-blue-200
  const getBorderColor = (bg: string) => {
    if (bg.includes('pink')) return 'border-pink-200';
    if (bg.includes('orange')) return 'border-orange-200';
    if (bg.includes('blue')) return 'border-blue-200';
    if (bg.includes('purple')) return 'border-purple-200';
    if (bg.includes('green')) return 'border-green-200';
    if (bg.includes('yellow')) return 'border-yellow-200';
    if (bg.includes('red')) return 'border-red-200';
    if (bg.includes('indigo')) return 'border-indigo-200';
    if (bg.includes('teal')) return 'border-teal-200';
    return 'border-gray-200';
  };

  const borderColor = getBorderColor(bgColor);

  const content = (
    <>
      <div className="text-3xl mb-3 text-center">{icon}</div>
      <h3 className="font-semibold text-sm mb-2 text-center text-foreground">{name}</h3>
      <p className="text-xs text-center text-muted-foreground leading-relaxed">{description}</p>
    </>
  );

  const className = `${bgColor} border-2 ${borderColor} rounded-2xl p-5 transition-all hover:shadow-md`;

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${className} block cursor-pointer hover:scale-[1.02]`}
      >
        {content}
      </a>
    );
  }

  return (
    <div className={className}>
      {content}
    </div>
  );
};

export default SidebarAd;
