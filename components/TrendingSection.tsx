"use client";

import { useEffect, useState } from "react";

import Container from "./Container";
import PosterCard from "./PosterCard";

import { getPosters } from "@/services/posterService";
import { Poster } from "@/types/poster";

export default function TrendingSection() {
  const [posters, setPosters] = useState<Poster[]>([]);

  useEffect(() => {
    async function loadPosters() {
      const data = await getPosters();
      setPosters(data);
    }

    loadPosters();
  }, []);

  return (
    <section className="py-32">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

          {posters.map((poster) => (
            <PosterCard
              key={poster.id}
              poster={{
                id: poster.id,
                title: poster.title,
                category: poster.category,
                creator: poster.creator,
                image: poster.image_url,
              }}
            />
          ))}

        </div>

      </Container>
    </section>
  );
}
