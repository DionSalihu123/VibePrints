"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import Container from "@/components/Container";
import useSupabaseAuth from "@/hooks/useSupabaseAuth";
import { createOrder } from "@/services/orderService";
import { OrderItem } from "@/types/order";

type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [status, setStatus] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const { user, loading: authLoading } = useSupabaseAuth();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const savedCart = localStorage.getItem("vibeprints-cart");
    if (!savedCart) {
      return;
    }

    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCartItems(JSON.parse(savedCart));
    } catch {
      // ignore invalid cart data
    }
  }, []);

  const updateCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem("vibeprints-cart", JSON.stringify(items));
  };

  const handleRemove = (id: number) => {
    updateCart(cartItems.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id: number, delta: number) => {
    const updated = cartItems
      .map((item) => {
        if (item.id !== id) return item;

        return {
          ...item,
          quantity: Math.max(1, Math.min(5, item.quantity + delta)),
        };
      })
      .filter((item) => item.quantity > 0);

    updateCart(updated);
  };

  const handleSaveOrder = async () => {
    if (!user) {
      setStatus("Sign in to save an order record.");
      return;
    }

    if (cartItems.length === 0) {
      setStatus("Your cart is empty.");
      return;
    }

    setActionLoading(true);
    setStatus(null);

    const orderItems: OrderItem[] = cartItems.map((item) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
    }));

    try {
      await createOrder(user.id, orderItems);
      localStorage.removeItem("vibeprints-cart");
      setCartItems([]);
      setStatus("Order record saved. You can track it later in your account.");
    } catch (error) {
      console.error(error);
      setStatus("Unable to save order right now. Please try again later.");
    }

    setActionLoading(false);
  };

  const total = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  return (
    <main className="min-h-screen bg-white text-black dark:bg-[#0b0b0f] dark:text-white py-24">
      <Container>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <p className="uppercase tracking-[0.3em] text-sm text-zinc-500 mb-2">Cart</p>
            <h1 className="text-5xl font-bold">Your shopping cart</h1>
          </div>
          <Link
            href="/categories"
            className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-white transition hover:bg-white/10"
          >
            Continue browsing
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-zinc-300">
            <p className="text-xl font-semibold mb-3">Your cart is empty.</p>
            <p className="text-zinc-400 mb-5">Add posters to the cart from the detail page and they will appear here.</p>
            <Link
              href="/categories"
              className="inline-flex rounded-full border border-white/10 bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Browse posters
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold mb-1">{item.title}</h2>
                      <p className="text-sm text-zinc-400">Quantity: {item.quantity}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemove(item.id)}
                      className="text-sm text-rose-300 hover:text-rose-100"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-4 mt-6">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="rounded-full border border-white/10 px-3 py-2 text-white hover:bg-white/10"
                      >
                        −
                      </button>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(item.id, 1)}
                        disabled={item.quantity >= 5}
                        className="rounded-full border border-white/10 px-3 py-2 text-white hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-sm text-zinc-400">${item.price.toFixed(2)} each</span>
                    <span className="text-lg font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-zinc-400 uppercase tracking-[0.3em] text-xs">Subtotal</span>
                <span className="text-3xl font-bold">${total.toFixed(2)}</span>
              </div>
              <p className="text-zinc-400 leading-relaxed mb-8">
                Save a simple order record now and track purchases later without adding a full checkout API.
              </p>
              <button
                type="button"
                disabled={actionLoading || cartItems.length === 0 || !user}
                onClick={handleSaveOrder}
                className="w-full rounded-full bg-white px-6 py-4 text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {actionLoading ? "Saving order…" : user ? "Save order record" : "Sign in to save order"}
              </button>
              {status ? <p className="mt-4 text-sm text-zinc-300">{status}</p> : null}
              {authLoading ? (
                <p className="mt-4 text-sm text-zinc-500">Checking session…</p>
              ) : !user ? (
                <p className="mt-4 text-sm text-zinc-400">Sign in to link this order record to your account.</p>
              ) : null}
            </div>
          </div>
        )}
      </Container>
    </main>
  );
}
