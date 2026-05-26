import { supabase } from "@/lib/supabase";
import { Poster } from "@/types/poster";
import { posters as samplePosters } from "@/lib/posters";

function logUnexpectedSupabaseError(error: { code?: string } | null) {
  if (!error || error.code === "PGRST116" || error.code === "42703") {
    return;
  }

  console.error(error);
}

function normalizePosters(rawData: unknown[]): Poster[] {
  return rawData.map((poster) => {
    const typedPoster = poster as Poster;
    const samplePoster = samplePosters.find((item) => item.id === typedPoster.id);
    return {
      ...typedPoster,
      section: typedPoster.section ?? samplePoster?.section,
      price: typedPoster.price ?? samplePoster?.price ?? 49,
    };
  });
}

function mergeWithSamplePosters(posters: Poster[], fallbackPosters: Poster[]) {
  const posterIds = new Set(posters.map((poster) => poster.id));
  const missingFallbackPosters = fallbackPosters.filter((poster) => !posterIds.has(poster.id));

  return [...posters, ...missingFallbackPosters];
}

export async function getPosters() {
  const { data, error } = await supabase
    .from("posters")
    .select("id,title,category,section,creator,image_url,created_at");

  if (error || !data || data.length === 0) {
    logUnexpectedSupabaseError(error);
    return samplePosters;
  }

  return mergeWithSamplePosters(normalizePosters(data as unknown[]), samplePosters);
}

export async function getPostersByCategory(category: string) {
  const { data, error } = await supabase
    .from("posters")
    .select("id,title,category,section,creator,image_url,created_at")
    .eq("category", category);

  if (error || !data) {
    logUnexpectedSupabaseError(error);
    return samplePosters.filter((poster) => poster.category.toLowerCase() === category.toLowerCase());
  }

  const fallbackPosters = samplePosters.filter(
    (poster) => poster.category.toLowerCase() === category.toLowerCase()
  );

  return mergeWithSamplePosters(normalizePosters(data as unknown[]), fallbackPosters);
}

export async function getPostersByIds(ids: number[]) {
  if (ids.length === 0) {
    return [];
  }

  const { data, error } = await supabase
    .from("posters")
    .select("id,title,category,section,creator,image_url,created_at")
    .in("id", ids);

  if (error || !data) {
    logUnexpectedSupabaseError(error);
    return samplePosters.filter((poster) => ids.includes(poster.id));
  }

  return normalizePosters(data as unknown[]);
}

export async function getPosterById(id: number) {
  const { data, error } = await supabase
    .from("posters")
    .select("id,title,category,section,creator,image_url,created_at")
    .eq("id", id)
    .single();

  if (error || !data) {
    logUnexpectedSupabaseError(error);
    return samplePosters.find((poster) => poster.id === id) ?? null;
  }

  return normalizePosters([data])[0] ?? null;
}
