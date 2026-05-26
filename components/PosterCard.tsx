"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { Poster } from "@/types/poster";
type PosterCardProps = {
  poster: Poster;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  detailUrl?: string;
};

export default function PosterCard({
  poster,
  isFavorite = false,
  onToggleFavorite,
  detailUrl,
}: PosterCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-sm transition hover:-translate-y-1 hover:border-white/20"
    >
      <div className="relative overflow-hidden rounded-3xl">
        <Image
          src={poster.image_url}
          alt={poster.title}
          width={500}
          height={700}
          className="h-[500px] w-full object-cover transition duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        <button
          type="button"
          onClick={onToggleFavorite}
          disabled={!onToggleFavorite}
          className={
            "absolute top-4 right-4 inline-flex items-center justify-center rounded-full p-3 border border-white/10 bg-black/50 backdrop-blur-md text-lg transition " +
            (isFavorite ? "text-rose-400" : "text-white hover:text-rose-300") +
            (!onToggleFavorite ? " cursor-not-allowed opacity-60" : " opacity-0 group-hover:opacity-100")
          }
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>

      <div className="p-6">
        <p className="text-sm text-zinc-500 uppercase tracking-[0.35em] mb-2">
          {poster.category}
        </p>

        <h3 className="text-3xl font-bold mb-3 text-white">{poster.title}</h3>

        <p className="text-zinc-400 mb-6">{poster.creator}</p>

        <div className="flex items-center justify-between gap-4">
          {detailUrl ? (
            <Link
              href={detailUrl}
              className="rounded-full border border-white/10 bg-white/10 px-4 py-3 text-sm text-white transition hover:bg-white/20"
            >
              View details
            </Link>
          ) : null}

          <span className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            {poster.created_at ? new Date(poster.created_at).toLocaleDateString() : "New"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
