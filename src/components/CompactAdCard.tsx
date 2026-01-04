interface CompactAdCardProps {
  icon: string;
  name: string;
  bgColor?: string;
  url?: string;
}

const CompactAdCard = ({ icon, name, bgColor = "bg-gray-50", url }: CompactAdCardProps) => {
  // Extract border color from bgColor
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

  // Get first 1-2 words from name
  const getShortName = (fullName: string) => {
    const words = fullName.split(' ');
    return words.slice(0, 2).join(' ');
  };

  const borderColor = getBorderColor(bgColor);
  const shortName = getShortName(name);

  const content = (
    <div className="flex flex-col items-center justify-center gap-2 w-28 h-20">
      <div className="text-xl">{icon}</div>
      <h3 className="font-medium text-xs text-foreground text-center leading-tight">
        {shortName}
      </h3>
    </div>
  );

  const className = `${bgColor} border ${borderColor} rounded-xl transition-all`;

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${className} block cursor-pointer hover:shadow-sm`}
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

export default CompactAdCard;
