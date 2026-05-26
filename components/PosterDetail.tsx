"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Poster } from "@/types/poster";
import useSupabaseAuth from "@/hooks/useSupabaseAuth";
import { addFavorite, getFavoritesByUser, removeFavorite } from "@/services/favoriteService";

type PosterDetailProps = {
  poster: Poster;
};

type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
};

export default function PosterDetail({ poster }: PosterDetailProps) {
  const { user, loading: authLoading } = useSupabaseAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [cartCount, setCartCount] = useState(() => {
    if (typeof window === "undefined") {
      return 0;
    }

    const savedCart = localStorage.getItem("vibeprints-cart");
    if (!savedCart) {
      return 0;
    }

    try {
      const items: CartItem[] = JSON.parse(savedCart);
      return items.reduce((total, item) => total + item.quantity, 0);
    } catch {
      return 0;
    }
  });
  const [status, setStatus] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const displayPrice = poster.price ?? 49;

  useEffect(() => {
    if (!user) {
      return;
    }

    const userId = user.id;

    async function loadFavorites() {
      const favorites = await getFavoritesByUser(userId);
      setIsFavorite(favorites.some((favorite) => favorite.poster_id === poster.id));
    }

    loadFavorites();
  }, [poster.id, user]);

  const handleFavoriteToggle = async () => {
    if (!user) {
      setStatus("Sign in first to save favorites.");
      return;
    }

    setActionLoading(true);
    setStatus(null);

    if (isFavorite) {
      await removeFavorite(user.id, poster.id);
      setIsFavorite(false);
      setStatus("Removed from favorites.");
    } else {
      await addFavorite(user.id, poster.id);
      setIsFavorite(true);
      setStatus("Added to favorites.");
    }

    setActionLoading(false);
  };

  const handleAddToCart = () => {
    const savedCart = typeof window !== "undefined" ? localStorage.getItem("vibeprints-cart") : null;
    const items: CartItem[] = savedCart ? JSON.parse(savedCart) : [];
    const existingItem = items.find((item) => item.id === poster.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      items.push({ id: poster.id, title: poster.title, price: displayPrice, quantity: 1 });
    }

    localStorage.setItem("vibeprints-cart", JSON.stringify(items));
    setCartCount(items.reduce((total, item) => total + item.quantity, 0));
    setStatus("Added to cart.");
  };

  return (
    <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_50px_120px_-80px_rgba(255,255,255,0.1)]">
        <Image
          src={poster.image_url}
          alt={poster.title}
          width={1200}
          height={520}
          unoptimized
          className="h-[520px] w-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-8">
        <div>
          <p className="uppercase tracking-[0.3em] text-sm text-zinc-500 mb-4">
            {poster.category}
          </p>
          <h1 className="text-6xl font-bold mb-6">{poster.title}</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Crafted by {poster.creator}.
            {poster.description
              ? ` ${poster.description}`
              : " Explore the style, mood, and story behind this poster."}
          </p>
        </div>

        <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-8">
          <div className="flex items-center justify-between gap-4">
            <span className="text-zinc-400 uppercase tracking-[0.3em] text-xs">Price</span>
            <span className="text-white text-2xl font-semibold">${displayPrice.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-zinc-400 uppercase tracking-[0.3em] text-xs">Creator</span>
            <span className="text-white text-sm">{poster.creator}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-zinc-400 uppercase tracking-[0.3em] text-xs">Category</span>
            <span className="text-white text-sm">{poster.category}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-zinc-400 uppercase tracking-[0.3em] text-xs">Cart</span>
            <span className="text-white text-sm">{cartCount} item{cartCount === 1 ? "" : "s"}</span>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={handleFavoriteToggle}
            disabled={actionLoading}
            className="inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-4 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {isFavorite ? "Remove from favorites" : "Add to favorites"}
          </button>

          <button
            type="button"
            onClick={handleAddToCart}
            className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-semibold text-black transition hover:bg-white/90 sm:w-auto"
          >
            Add to cart
          </button>
        </div>

        {status ? <p className="text-sm text-zinc-300">{status}</p> : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/categories"
            className="inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-4 text-sm text-white transition hover:bg-white/10 sm:w-auto"
          >
            Browse posters
          </Link>
          <Link
            href="/favorites"
            className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-semibold text-black transition hover:bg-white/90 sm:w-auto"
          >
            View favorites
          </Link>
        </div>

        {authLoading ? (
          <p className="text-sm text-zinc-500">Checking session…</p>
        ) : !user ? (
          <p className="text-sm text-zinc-400">Sign in to save favorites and keep this poster on your board.</p>
        ) : null}
      </div>
    </div>
  );
}
