import { supabase } from "@/lib/supabase";
import { Poster } from "@/types/poster";

export async function getPosters() {
  const { data, error } = await supabase
    .from("posters")
    .select("id,title,category,creator,image_url,created_at");

  if (error) {
    console.error(error);
    return [];
  }

  return (data as Poster[]) ?? [];
}

export async function getPostersByCategory(category: string) {
  const { data, error } = await supabase
    .from("posters")
    .select("id,title,category,creator,image_url,created_at")
    .eq("category", category);

  if (error) {
    console.error(error);
    return [];
  }

  return (data as Poster[]) ?? [];
}

export async function getPostersByIds(ids: number[]) {
  if (ids.length === 0) {
    return [];
  }

  const { data, error } = await supabase
    .from("posters")
    .select("id,title,category,creator,image_url,created_at")
    .in("id", ids);

  if (error) {
    console.error(error);
    return [];
  }

  return (data as Poster[]) ?? [];
}

export async function getPosterById(id: number) {
  const { data, error } = await supabase
    .from("posters")
    .select("id,title,category,creator,image_url,created_at")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return (data as Poster) ?? null;
}
