import Link from "next/link";

import Container from "@/components/Container";
import PosterCard from "@/components/PosterCard";
import { getPostersByCategory } from "@/services/posterService";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const normalizedCategory =
    resolvedParams.category.charAt(0).toUpperCase() +
    resolvedParams.category.slice(1).toLowerCase();

  const posters = await getPostersByCategory(normalizedCategory);

  return (
    <main className="bg-white text-black dark:bg-[#0b0b0f] dark:text-white min-h-screen py-24">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-14">
          <div>
            <p className="uppercase tracking-[0.3em] text-sm text-zinc-500 mb-4">
              {normalizedCategory}
            </p>
            <h1 className="text-6xl font-bold">{normalizedCategory} Posters</h1>
          </div>
          <Link
            href="/categories"
            className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-white transition hover:bg-white/10"
          >
            Back to categories
          </Link>
        </div>

        {posters.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-zinc-300">
            No posters found for {normalizedCategory}.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posters.map((poster) => (
              <PosterCard key={poster.id} poster={poster} detailUrl={`/posters/${poster.id}`} />
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}
