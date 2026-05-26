"use client";

import { useState } from "react";
import Link from "next/link";

import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleRegister = async () => {
    setIsLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          username,
        },
      },
    });

    setIsLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage(
      "Registration successful. Check your inbox for a confirmation link, then sign in after verification."
    );
  };

  return (
    <main className="min-h-screen bg-[#0b0b0f] text-white flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-10 shadow-2xl">
        <div className="mb-10 flex flex-col gap-3">
          <p className="uppercase tracking-[0.3em] text-sm text-zinc-500">Create your account</p>
          <h1 className="text-5xl font-bold">Join VibePrints</h1>
          <p className="max-w-2xl text-zinc-400 text-lg leading-relaxed">
            Register with your name, username, and email to save favorites and personalize your poster experience.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm uppercase tracking-[0.22em] text-zinc-500 mb-2">
              First name
            </label>
            <input
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              type="text"
              placeholder="Jane"
              className="w-full rounded-3xl border border-white/10 bg-black/70 px-4 py-4 text-white outline-none focus:border-white/40"
            />
          </div>

          <div>
            <label className="block text-sm uppercase tracking-[0.22em] text-zinc-500 mb-2">
              Last name
            </label>
            <input
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              type="text"
              placeholder="Doe"
              className="w-full rounded-3xl border border-white/10 bg-black/70 px-4 py-4 text-white outline-none focus:border-white/40"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm uppercase tracking-[0.22em] text-zinc-500 mb-2">
              Username
            </label>
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              type="text"
              placeholder="vibe_lover"
              className="w-full rounded-3xl border border-white/10 bg-black/70 px-4 py-4 text-white outline-none focus:border-white/40"
            />
          </div>

          <div className="md:col-span-2">
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

          <div className="md:col-span-2">
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
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={handleRegister}
            disabled={isLoading}
            className="w-full rounded-full bg-white px-6 py-4 text-sm font-semibold text-black transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            Create account
          </button>
          <Link
            href="/login"
            className="w-full rounded-full border border-white/10 bg-white/5 px-6 py-4 text-center text-sm text-white transition hover:bg-white/10 sm:w-auto"
          >
            Already have an account?
          </Link>
        </div>

        {message ? (
          <p className="mt-6 text-sm text-zinc-300">{message}</p>
        ) : null}
      </div>
    </main>
  );
}
