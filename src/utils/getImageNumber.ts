export const getImageNumber = (category: string, index: number): number => {
  const availableImages: Record<string, number> = {
    coffee: 8,
    tea: 10,
    dessert: 14,
  };

  const maxImages = availableImages[category] || 8;
  return (index % maxImages) + 1;
};
