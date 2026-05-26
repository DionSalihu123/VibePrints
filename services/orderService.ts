import { supabase } from "@/lib/supabase";
import type { PostgrestError } from "@supabase/supabase-js";
import { Order, OrderItem } from "@/types/order";

export async function createOrder(userId: string, items: OrderItem[]) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const { data, error } = (await supabase
    .from("orders")
    .insert([{ user_id: userId, items, total, status: "pending" }])
    .select()
    .single()) as { data: Order | null; error: PostgrestError | null };

  if (error) {
    throw error;
  }

  return data;
}
