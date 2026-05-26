export const categorySections: Record<string, string[]> = {
  Music: ["Hip Hop", "Rock", "Metal"],
  Movies: ["Action", "Drama", "Horror"],
  Sports: ["Football", "Basketball", "Boxing"],
};

export function getCategorySections(category: string) {
  return categorySections[category] ?? [];
}
