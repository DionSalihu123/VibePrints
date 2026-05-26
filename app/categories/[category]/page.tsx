import Link from "next/link";

import Container from "@/components/Container";
import PosterCard from "@/components/PosterCard";
import { getCategorySections } from "@/lib/categorySections";
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
  const sections = getCategorySections(normalizedCategory);
  const sectionedPosters = sections.map((section) => ({
    title: section,
    posters: posters.filter((poster) => poster.section === section).slice(0, 3),
  }));
  const uncategorizedPosters = posters.filter(
    (poster) => !poster.section || !sections.includes(poster.section)
  );

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
          <div className="rounded-lg border border-white/10 bg-white/5 p-10 text-center text-zinc-300">
            No posters found for {normalizedCategory}.
          </div>
        ) : (
          <div className="space-y-20">
            {sectionedPosters.map((section) => (
              <section key={section.title}>
                <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                      {normalizedCategory}
                    </p>
                    <h2 className="mt-2 text-4xl font-bold">{section.title}</h2>
                  </div>
                  <span className="text-sm text-zinc-500">
                    {section.posters.length} poster{section.posters.length === 1 ? "" : "s"}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
                  {section.posters.map((poster) => (
                    <PosterCard
                      key={poster.id}
                      poster={poster}
                      detailUrl={`/posters/${poster.id}`}
                    />
                  ))}
                </div>
              </section>
            ))}

            {uncategorizedPosters.length > 0 ? (
              <section>
                <div className="mb-8">
                  <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                    {normalizedCategory}
                  </p>
                  <h2 className="mt-2 text-4xl font-bold">More Posters</h2>
                </div>
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
                  {uncategorizedPosters.map((poster) => (
                    <PosterCard
                      key={poster.id}
                      poster={poster}
                      detailUrl={`/posters/${poster.id}`}
                    />
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        )}
      </Container>
    </main>
  );
}
