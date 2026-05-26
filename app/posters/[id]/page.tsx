import Image from "next/image";
import Link from "next/link";

import Container from "@/components/Container";
import { getPosterById } from "@/services/posterService";
import { Poster } from "@/types/poster";

type PosterPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PosterPage({ params }: PosterPageProps) {
  const { id } = await params;
  const posterId = Number(id);
  const poster: Poster | null = await getPosterById(posterId);

  if (!poster) {
    return (
      <main className="min-h-screen bg-[#0b0b0f] text-white flex items-center justify-center px-6 py-24">
        <Container>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-14 text-center">
            <h1 className="text-4xl font-bold mb-4">Poster not found</h1>
            <p className="text-zinc-400 mb-8">
              We could not find that poster. Browse the collections below.
            </p>
            <Link
              href="/categories"
              className="rounded-full border border-white/10 bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Back to categories
            </Link>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0b0f] text-white py-24">
      <Container>
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
                <span className="text-zinc-400 uppercase tracking-[0.3em] text-xs">Created</span>
                <span className="text-white text-sm">
                  {poster.created_at ? new Date(poster.created_at).toLocaleDateString() : "Unknown"}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-zinc-400 uppercase tracking-[0.3em] text-xs">Creator</span>
                <span className="text-white text-sm">{poster.creator}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-zinc-400 uppercase tracking-[0.3em] text-xs">Category</span>
                <span className="text-white text-sm">{poster.category}</span>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/categories"
                className="inline-flex rounded-full border border-white/10 bg-white/5 px-6 py-4 text-sm text-white transition hover:bg-white/10"
              >
                Browse categories
              </Link>
              <Link
                href="/favorites"
                className="inline-flex rounded-full bg-white px-6 py-4 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                View favorites
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
