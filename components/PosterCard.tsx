"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { Poster } from "@/types/poster";

type PosterCardProps = {
  poster: Poster;
};

export default function PosterCard({
  poster,
}: PosterCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group cursor-pointer"
    >

      <div className="relative overflow-hidden rounded-3xl">

        <Image
          src={poster.image}
          alt={poster.title}
          width={500}
          height={700}
          className="h-[500px] w-full object-cover transition duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

        <button className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition bg-black/50 backdrop-blur-md rounded-full p-3 border border-white/10">
          ♡
        </button>

      </div>

      <div className="mt-5">

        <p className="text-sm text-zinc-500 uppercase tracking-widest mb-2">
          {poster.category}
        </p>

        <h3 className="text-2xl font-bold">
          {poster.title}
        </h3>

        <p className="text-zinc-400 mt-1">
          {poster.creator}
        </p>

      </div>

    </motion.div>
  );
}
