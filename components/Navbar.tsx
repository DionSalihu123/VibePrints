"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import Container from "./Container";
import DarkModeToggle from "./DarkModeToggle";
import AuthWidget from "./AuthWidget";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-black/30 backdrop-blur-md"
    >
      <Container>
        <div className="flex items-center justify-between h-20 gap-4 md:gap-0">

          <div className="flex items-center gap-6">
            <Link href="/" className="text-2xl font-bold tracking-wide">
              VibePrints
            </Link>
            <div className="hidden md:flex items-center gap-8 text-sm text-zinc-300">
              <Link href="/categories/music" className="hover:text-white transition">
                Music
              </Link>
              <Link href="/categories/movies" className="hover:text-white transition">
                Movies
              </Link>
              <Link href="/categories/sports" className="hover:text-white transition">
                Sports
              </Link>
              <Link href="/favorites" className="hover:text-white transition">
                Favorites
              </Link>
              <Link href="/cart" className="hover:text-white transition">
                Cart
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <DarkModeToggle />
            <AuthWidget />
            <Link
              href="/categories"
              className="hidden md:block px-5 py-2 rounded-full bg-white text-black font-medium hover:scale-105 transition"
            >
              Explore
            </Link>
          </div>

        </div>
      </Container>
    </motion.nav>
  );
}
