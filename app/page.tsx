import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoriesSection from "@/components/CategoriesSection";
import TrendingSection from "@/components/TrendingSection";

export default function Home() {
  return (
    <main className="bg-[#0b0b0f] text-white">
      <Navbar />
      <Hero />
      <TrendingSection />
      <CategoriesSection />
    </main>
  );
}
