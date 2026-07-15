"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const LoginForm = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Login Failed");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Something with the Login operation went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md rounded border border-theme-border/30 bg-theme-surface p-6 shadow-xl"
    >
      <h1 className="mb-4 text-2xl font-semibold text-theme-text">Admin Login</h1>
      <label className="mb-2 block text-sm font-semibold text-theme-text" htmlFor="password">
        Password
      </label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        className="w-full rounded border border-theme-border/40 bg-theme-bg px-3 py-2 text-theme-text outline-none transition focus:border-theme-secondary focus:ring-2 focus:ring-theme-secondary/20"
        placeholder="enter admin password"
        required
      />
      {error ? <p className="mt-3 text-sm text-red-500">{error}</p> : null}
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-4 w-full rounded bg-theme-secondary px-4 py-2 font-semibold text-theme-contrast transition hover:bg-theme-primary disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
};

export default LoginForm;
