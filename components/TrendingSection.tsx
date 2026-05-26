"use client";

import { useEffect, useState } from "react";

import Container from "./Container";
import PosterCard from "./PosterCard";

import { getPosters } from "@/services/posterService";
import { getFavoritesByUser, addFavorite, removeFavorite } from "@/services/favoriteService";
import useSupabaseAuth from "@/hooks/useSupabaseAuth";
import { Poster } from "@/types/poster";

export default function TrendingSection() {
  const { user, loading: authLoading } = useSupabaseAuth();
  const [posters, setPosters] = useState<Poster[]>([]);
  const [loading, setLoading] = useState(true);
  const [favoritePosterIds, setFavoritePosterIds] = useState<number[]>([]);

  useEffect(() => {
    async function loadPosters() {
      const data = await getPosters();
      setPosters(data);
      setLoading(false);
    }

    loadPosters();
  }, []);

  useEffect(() => {
    async function loadFavorites() {
      if (!user) {
        setFavoritePosterIds([]);
        return;
      }

      const favorites = await getFavoritesByUser(user.id);
      setFavoritePosterIds(favorites.map((favorite) => favorite.poster_id));
    }

    loadFavorites();
  }, [user]);

  const toggleFavorite = async (posterId: number, isFavorite: boolean) => {
    if (!user) {
      return;
    }

    if (isFavorite) {
      await removeFavorite(user.id, posterId);
      setFavoritePosterIds((current) => current.filter((id) => id !== posterId));
    } else {
      await addFavorite(user.id, posterId);
      setFavoritePosterIds((current) => [...current, posterId]);
    }
  };

  return (
    <section id="trending" className="py-32">
      <Container>

        <div className="flex items-end justify-between mb-16">

          <div>
            <p className="text-zinc-500 uppercase tracking-[0.3em] text-sm mb-4">
              Trending
            </p>

            <h2 className="text-5xl font-bold">
              Popular Right Now
            </h2>
          </div>

        </div>

        {!authLoading && !user ? (
          <div className="mb-8 text-zinc-400">
            Sign in to save your favorite posters.
          </div>
        ) : null}

        {loading ? (
          <div className="text-center text-zinc-400">Loading posters...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posters.map((poster) => {
              const isFavorite = favoritePosterIds.includes(poster.id);

              return (
                <PosterCard
                  key={poster.id}
                  poster={poster}
                  isFavorite={isFavorite}
                  onToggleFavorite={() => toggleFavorite(poster.id, isFavorite)}
                />
              );
            })}
          </div>
        )}

      </Container>
    </section>
  );
}
