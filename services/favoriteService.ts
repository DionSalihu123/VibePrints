import { supabase } from "@/lib/supabase";

export type Favorite = {
  id: number;
  user_id: string;
  poster_id: number;
  created_at: string;
};

export async function getFavoritesByUser(userId: string) {
  const { data, error } = await supabase
    .from("favorites")
    .select("poster_id")
    .eq("user_id", userId);

  if (error) {
    console.error(error);
    return [];
  }

  return (data as Favorite[]) ?? [];
}

export async function addFavorite(userId: string, posterId: number) {
  const { data, error } = await supabase
    .from("favorites")
    .insert({ user_id: userId, poster_id: posterId })
    .select();

  if (error) {
    console.error(error);
    return null;
  }

  return (data as Favorite[])?.[0] ?? null;
}

export async function removeFavorite(userId: string, posterId: number) {
  const { data, error } = await supabase
    .from("favorites")
    .delete()
    .match({ user_id: userId, poster_id: posterId })
    .select();

  if (error) {
    console.error(error);
    return null;
  }

  return (data as Favorite[])?.[0] ?? null;
}
