import Hero from "@/components/Hero";
import CategoriesSection from "@/components/CategoriesSection";
import TrendingSection from "@/components/TrendingSection";

export default function Home() {
  return (
    <main className="bg-white text-black dark:bg-[#0b0b0f] dark:text-white">
      <Hero />
      <TrendingSection />
      <CategoriesSection />
    </main>
  );
}
