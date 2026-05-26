import Link from "next/link";

import Container from "./Container";
import CategoryCard from "./CategoryCard";

export default function CategoriesSection() {
  return (
    <section className="py-32">
      <Container>

        <div className="mb-16">
          <h2 className="text-5xl font-bold mb-4">
            Browse Categories
          </h2>

          <p className="text-zinc-400 text-lg">
            Discover posters curated around your interests.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <Link href="/categories/music">
            <CategoryCard
              title="Music"
              description="Legendary albums, iconic artists, and aesthetic sound-inspired artwork."
            />
          </Link>

          <Link href="/categories/movies">
            <CategoryCard
              title="Movies"
              description="Minimal cinematic posters inspired by classics and modern films."
            />
          </Link>

          <Link href="/categories/sports">
            <CategoryCard
              title="Sports"
              description="Celebrate iconic moments, athletes, and unforgettable victories."
            />
          </Link>

        </div>

      </Container>
    </section>
  );
}
