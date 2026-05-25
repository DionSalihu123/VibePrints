import Container from "./Container";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent blur-3xl" />

      <Container>
        <div className="text-center">

          <p className="uppercase tracking-[0.3em] text-sm text-zinc-400 mb-6">
            Modern Poster Marketplace
          </p>

          <h1 className="text-6xl md:text-8xl font-black leading-tight mb-6">
            Discover Your
            <span className="block text-zinc-400">
              Next Vibe
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-zinc-400 text-lg md:text-xl leading-relaxed">
            Explore aesthetic posters inspired by music,
            cinema, and sports culture.
          </p>

          <div className="flex items-center justify-center gap-4 mt-10">

            <button className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition">
              Explore Posters
            </button>

            <button className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/10 transition">
              Trending Now
            </button>

          </div>

        </div>
      </Container>
    </section>
  );
}
