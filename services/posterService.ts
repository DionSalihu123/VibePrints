import { supabase } from "@/lib/supabase";

export async function getPosters() {
  const { data, error } = await supabase
    .from("posters")
    .select("*");

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}
