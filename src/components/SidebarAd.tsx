interface SidebarAdProps {
  icon: string;
  name: string;
  description: string;
  bgColor?: string;
  url?: string;
}

const SidebarAd = ({ icon, name, description, bgColor = "bg-gray-50", url }: SidebarAdProps) => {
  const content = (
    <>
      <div className="text-3xl mb-3 text-center">{icon}</div>
      <h3 className="font-semibold text-sm mb-2 text-center text-foreground">{name}</h3>
      <p className="text-xs text-center text-muted-foreground leading-relaxed">{description}</p>
    </>
  );

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${bgColor} rounded-2xl p-5 block cursor-pointer`}
      >
        {content}
      </a>
    );
  }

  return (
    <div className={`${bgColor} rounded-2xl p-5`}>
      {content}
    </div>
  );
};

export default SidebarAd;
