"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Container from "@/components/Container";
import PosterCard from "@/components/PosterCard";
import useSupabaseAuth from "@/hooks/useSupabaseAuth";
import { getFavoritesByUser, removeFavorite } from "@/services/favoriteService";
import { getPostersByIds } from "@/services/posterService";
import { Poster } from "@/types/poster";

export default function FavoritesPage() {
  const { user, loading: authLoading } = useSupabaseAuth();
  const [favoritePosters, setFavoritePosters] = useState<Poster[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFavorites() {
      if (!user) {
        setFavoritePosters([]);
        setLoading(false);
        return;
      }

      const favorites = await getFavoritesByUser(user.id);
      const posterIds = favorites.map((favorite) => favorite.poster_id);
      const posters = await getPostersByIds(posterIds);
      setFavoritePosters(posters);
      setLoading(false);
    }

    loadFavorites();
  }, [user]);

  const handleRemoveFavorite = async (posterId: number) => {
    if (!user) return;
    await removeFavorite(user.id, posterId);
    setFavoritePosters((current) => current.filter((poster) => poster.id !== posterId));
  };

  return (
    <main className="min-h-screen bg-[#0b0b0f] text-white py-24">
      <Container>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <p className="uppercase tracking-[0.3em] text-sm text-zinc-500 mb-2">Favorites</p>
            <h1 className="text-5xl font-bold">Your saved posters</h1>
          </div>
          <Link
            href="/categories"
            className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-white transition hover:bg-white/10"
          >
            Browse categories
          </Link>
        </div>

        {authLoading ? (
          <div className="text-zinc-400">Checking your session…</div>
        ) : !user ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-zinc-300">
            <p className="text-xl font-semibold mb-3">Sign in to see your favorites.</p>
            <Link
              href="/login"
              className="inline-flex rounded-full border border-white/10 bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Login now
            </Link>
          </div>
        ) : loading ? (
          <div className="text-zinc-400">Loading favorites...</div>
        ) : favoritePosters.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-zinc-300">
            <p className="text-xl font-semibold mb-3">No favorites yet.</p>
            <p className="text-zinc-400 mb-5">Add posters to your favorites to keep them here.</p>
            <Link
              href="/categories"
              className="inline-flex rounded-full border border-white/10 bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Discover posters
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {favoritePosters.map((poster) => (
              <PosterCard
                key={poster.id}
                poster={poster}
                detailUrl={`/posters/${poster.id}`}
                isFavorite
                onToggleFavorite={() => handleRemoveFavorite(poster.id)}
              />
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}
