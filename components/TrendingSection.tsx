import Container from "./Container";
import PosterCard from "./PosterCard";

import { posters } from "@/lib/posters";

export default function TrendingSection() {
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

          <button className="hidden md:block text-zinc-400 hover:text-white transition">
            View All
          </button>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

          {posters.map((poster) => (
            <PosterCard
              key={poster.id}
              poster={poster}
            />
          ))}

        </div>

      </Container>
    </section>
  );
}
