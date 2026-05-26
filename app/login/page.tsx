"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSignIn = async () => {
    setIsLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    router.push("/");
  };

  return (
    <main className="min-h-screen bg-white text-black dark:bg-[#0b0b0f] dark:text-white flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 p-10 shadow-2xl">
        <div className="mb-10">
          <p className="uppercase tracking-[0.3em] text-sm text-zinc-500">Welcome back</p>
          <h1 className="text-5xl font-bold mb-4">Sign in to VibePrints</h1>
          <p className="text-zinc-400 leading-relaxed">
            Use your email and password to access saved posters, favorites, and category recommendations.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm uppercase tracking-[0.22em] text-zinc-500 mb-2">
              Email
            </label>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              placeholder="hello@example.com"
              className="w-full rounded-3xl border border-white/10 bg-black/70 px-4 py-4 text-white outline-none focus:border-white/40"
            />
          </div>

          <div>
            <label className="block text-sm uppercase tracking-[0.22em] text-zinc-500 mb-2">
              Password
            </label>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              placeholder="••••••••"
              className="w-full rounded-3xl border border-white/10 bg-black/70 px-4 py-4 text-white outline-none focus:border-white/40"
            />
          </div>

          <button
            type="button"
            onClick={handleSignIn}
            disabled={isLoading}
            className="w-full rounded-full bg-white px-6 py-4 text-sm font-semibold text-black transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Sign in
          </button>

          {message ? (
            <p className="text-sm text-zinc-300">{message}</p>
          ) : null}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/register"
            className="w-full rounded-full border border-white/10 bg-white/5 px-6 py-4 text-center text-sm text-white transition hover:bg-white/10 sm:w-auto"
          >
            Create account
          </Link>
          <Link
            href="/"
            className="w-full rounded-full border border-white/10 bg-white/5 px-6 py-4 text-center text-sm text-white transition hover:bg-white/10 sm:w-auto"
          >
            Back home
          </Link>
          <Link
            href="/categories"
            className="w-full rounded-full bg-white px-6 py-4 text-center text-sm font-semibold text-black transition hover:bg-white/90 sm:w-auto"
          >
            Browse posters
          </Link>
        </div>
      </div>
    </main>
  );
}
