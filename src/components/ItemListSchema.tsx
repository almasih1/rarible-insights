// ItemListSchema component for structured data
interface ItemListSchemaProps {
  items: {
    name: string;
    url: string;
    description?: string;
  }[];
  name: string;
}

export const ItemListSchema = ({ items, name }: ItemListSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Thing",
        name: item.name,
        url: item.url,
        ...(item.description && { description: item.description }),
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
