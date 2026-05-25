"use client";

import { motion } from "framer-motion";

import Container from "./Container";
import DarkModeToggle from "./DarkModeToggle";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-black/30 backdrop-blur-md"
    >
      <Container>
        <div className="flex items-center justify-between h-20">

          <h1 className="text-2xl font-bold tracking-wide">
            VibePrints
          </h1>

          <div className="hidden md:flex items-center gap-8 text-sm text-zinc-300">
            <a href="#">Music</a>
            <a href="#">Movies</a>
            <a href="#">Sports</a>
            <a href="#">Trending</a>
          </div>

          <div className="flex items-center gap-4">
            <DarkModeToggle />

            <button className="hidden md:block px-5 py-2 rounded-full bg-white text-black font-medium hover:scale-105 transition">
              Explore
            </button>
          </div>

        </div>
      </Container>
    </motion.nav>
  );
}
