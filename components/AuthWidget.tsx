"use client";

import Link from "next/link";

import { supabase } from "@/lib/supabase";
import useSupabaseAuth from "@/hooks/useSupabaseAuth";

export default function AuthWidget() {
  const { session } = useSupabaseAuth();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="relative flex items-center gap-2">
      {session?.user ? (
        <>
          <span className="hidden sm:inline text-sm text-zinc-200 truncate max-w-[140px]">
            {session.user.email}
          </span>
          <button
            onClick={handleSignOut}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
          >
            Sign out
          </button>
        </>
      ) : (
        <>
          <Link
            href="/login"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
          >
            Register
          </Link>
        </>
      )}
    </div>
  );
}
