"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('%isSubmitting', 'color:magenta');
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Login Failed");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Something with the Login operation went wrong.")
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <main>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-white/10 p-6 shadow-xl"
      >
        <h1 className="mb-4 text-2xl font-semibold">Admin Login</h1>
        <label
          className="mb-2 block text-sm"
          htmlFor="password"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border px-3 py-2"
          placeholder="enter admin password"
          required
        />
        {error ? <p className="mt-3 text-sm text-red-500">{error}</p> : null}
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-4 w-full rounded-lg bg-indigo-600 px-4 py-2 text-white"
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  )
}

export default LoginPage 
