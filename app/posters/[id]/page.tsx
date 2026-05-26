import Link from "next/link";

import Container from "@/components/Container";
import PosterDetail from "@/components/PosterDetail";
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
        <PosterDetail poster={poster} />
      </Container>
    </main>
  );
}
