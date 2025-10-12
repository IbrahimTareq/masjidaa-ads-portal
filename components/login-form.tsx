"use client";

import { createClient } from "@/lib/supabase/client";
import { Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      // Update this route to redirect to an authenticated route. The user already has an active session.
      router.push("/protected");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-xl font-normal mb-4 text-center md:text-left">
        Login
      </h2>

      <form onSubmit={handleLogin} className="flex flex-col">
        {/* Email Input */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Mail className="w-4 h-4" />
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            disabled={isLoading}
            className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white text-black text-sm disabled:bg-gray-100 disabled:text-gray-500"
          />
        </div>

        {/* Password Input + Forgot Password */}
        <div className="flex flex-col gap-1 mt-2">
          <div className="flex justify-end">
            <Link
              href="/auth/forgot-password"
              className="text-sm text-gray-400 hover:text-gray-600 flex items-center gap-1"
            >
              Forgot password?
              {/* Optional icon: <Lock className="w-4 h-4" /> */}
            </Link>
          </div>

          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Mail className="w-4 h-4" />
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              disabled={isLoading}
              className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white text-black text-sm disabled:bg-gray-100 disabled:text-gray-500"
            />
          </div>
        </div>

        {/* Error message */}
        {error && <p className="text-sm text-red-500">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-theme text-white font-medium py-2 rounded-xl shadow hover:brightness-105 cursor-pointer transition disabled:opacity-70 disabled:cursor-not-allowed mt-4"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              Logging in...
            </div>
          ) : (
            "Login"
          )}
        </button>

        {/* Sign Up Link */}
        <p className="mt-4 text-center text-sm">
          Don&apos;t have an account?&nbsp;
          <Link href="/" className="underline underline-offset-4">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
