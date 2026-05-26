import Link from "next/link";

import Container from "@/components/Container";
import CategoryCard from "@/components/CategoryCard";

const categories = [
  {
    slug: "music",
    title: "Music",
    description: "Legendary albums, iconic artists, and aesthetic sound-inspired artwork.",
  },
  {
    slug: "movies",
    title: "Movies",
    description: "Minimal cinematic posters inspired by classics and modern films.",
  },
  {
    slug: "sports",
    title: "Sports",
    description: "Celebrate iconic moments, athletes, and unforgettable victories.",
  },
];

export default function CategoriesPage() {
  return (
    <main className="bg-[#0b0b0f] text-white min-h-screen py-24">
      <Container>
        <div className="max-w-3xl">
          <p className="uppercase tracking-[0.3em] text-sm text-zinc-500 mb-4">Poster categories</p>
          <h1 className="text-6xl font-bold mb-6">Explore by genre</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Choose your favourite world — music, movies, or sports — and discover collections of posters created for your vibe.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link key={category.slug} href={`/categories/${category.slug}`}>
              <CategoryCard title={category.title} description={category.description} />
            </Link>
          ))}
        </div>
      </Container>
    </main>
  );
}
