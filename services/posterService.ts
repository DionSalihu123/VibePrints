import { supabase } from "@/lib/supabase";
import { Poster } from "@/types/poster";
import { posters as samplePosters } from "@/lib/posters";

function normalizePosters(rawData: unknown[]): Poster[] {
  return rawData.map((poster) => {
    const typedPoster = poster as Poster;
    const defaultPrice = samplePosters.find((item) => item.id === typedPoster.id)?.price ?? 49;
    return {
      ...typedPoster,
      price: typedPoster.price ?? defaultPrice,
    };
  });
}

export async function getPosters() {
  const { data, error } = await supabase
    .from("posters")
    .select("id,title,category,creator,image_url,created_at");

  if (error || !data || data.length === 0) {
    if (error) console.error(error);
    return samplePosters;
  }

  return normalizePosters(data as unknown[]);
}

export async function getPostersByCategory(category: string) {
  const { data, error } = await supabase
    .from("posters")
    .select("id,title,category,creator,image_url,created_at")
    .eq("category", category);

  if (error || !data) {
    if (error) console.error(error);
    return samplePosters.filter((poster) => poster.category.toLowerCase() === category.toLowerCase());
  }

  return normalizePosters(data as unknown[]);
}

export async function getPostersByIds(ids: number[]) {
  if (ids.length === 0) {
    return [];
  }

  const { data, error } = await supabase
    .from("posters")
    .select("id,title,category,creator,image_url,created_at")
    .in("id", ids);

  if (error || !data) {
    if (error) console.error(error);
    return samplePosters.filter((poster) => ids.includes(poster.id));
  }

  return normalizePosters(data as unknown[]);
}

export async function getPosterById(id: number) {
  const { data, error } = await supabase
    .from("posters")
    .select("id,title,category,creator,image_url,created_at")
    .eq("id", id)
    .single();

  if (error || !data) {
    if (error) console.error(error);
    return samplePosters.find((poster) => poster.id === id) ?? null;
  }

  return normalizePosters([data])[0] ?? null;
}
