"use client";

import { createClient } from "@/lib/supabase/client";
import { Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
  const supabase = createClient();
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/business/setup`,
        data: {
          first_name: firstName,
          last_name: lastName,
          fullname: `${firstName} ${lastName}`,
        },
      },
    });

    if (error) {
      setError(error.message);
    } else {
      router.push("/auth/sign-up-success");
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <h2 className="text-xl font-medium mb-4 text-center">Sign up</h2>
      <form onSubmit={handleSignUp} className="space-y-4">
        {/* First Name */}
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            required
            className="w-full pl-10 pr-3 py-2 border rounded-xl text-sm"
          />
        </div>

        {/* Last Name */}
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            required
            className="w-full pl-10 pr-3 py-2 border rounded-xl text-sm"
          />
        </div>

        {/* Email */}
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full pl-10 pr-3 py-2 border rounded-xl text-sm"
          />
        </div>

        {/* Password */}
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full pl-10 pr-3 py-2 border rounded-xl text-sm"
          />
        </div>

        {/* Repeat Password */}
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            placeholder="Confirm Password"
            required
            className="w-full pl-10 pr-3 py-2 border rounded-xl text-sm"
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-theme text-white font-medium py-2 rounded-xl"
        >
          {isLoading ? "Creating account..." : "Sign up"}
        </button>

        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
