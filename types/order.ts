export type OrderItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
};

export type Order = {
  id: number;
  user_id: string;
  items: OrderItem[];
  total: number;
  status: string;
  created_at: string;
};
