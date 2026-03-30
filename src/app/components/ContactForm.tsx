"use client";

import React, { useRef } from "react";
import { enqueueSnackbar } from "notistack";

import { formatSubmissionTime } from "@/utils/dateUtils";

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

type ContactFormProps = {
  onSubmitSuccess?: () => void;
  onSubmitError?: (data: ContactFormData) => void;
};

const ContactForm: React.FC<ContactFormProps> = ({
  onSubmitSuccess,
  onSubmitError,
}) => {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) return;

    const formData = new FormData(form.current);
    const submission: ContactFormData = {
      name: String(formData.get("user_name") ?? "").trim(),
      email: String(formData.get("user_email") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submission),
      });

      if (!response.ok) {
        const { message } = await response.json();
        console.error("Server error:", message);
        enqueueSnackbar("Something went wrong. Try again later.", {
          variant: "error",
        });
        onSubmitError?.(submission);
        return;
      }

      enqueueSnackbar("Message sent! I'll get back to you soon", {
        variant: "success",
      });
      form.current.reset();
      onSubmitSuccess?.();
    } catch (error) {
      console.error("Network error:", error);
      enqueueSnackbar("Failed to send message. Try again later.", {
        variant: "error",
      });
      onSubmitError?.(submission);
    }
  };

  return (
    <form
      aria-label="Contact form"
      className="w-full max-w-3xl space-y-6 rounded-3xl border border-theme-border/50 bg-theme-surface/90 p-8 shadow-2xl shadow-theme-contrast/20"
      onSubmit={sendEmail}
      ref={form}
    >
      <div className="space-y-2">
        <label
          htmlFor="user_name"
          className="block text-xs font-semibold uppercase tracking-[0.3em] text-theme-border"
        >
          Full Name
        </label>
        <input
          type="text"
          id="user_name"
          name="user_name"
          required
          autoComplete="name"
          placeholder="Your Full Name"
          className="w-full rounded-2xl border border-theme-border/60 bg-transparent px-4 py-3 text-theme-text placeholder:text-theme-border/60 transition focus:border-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-primary/80"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="user_email"
          className="block text-xs font-semibold uppercase tracking-[0.3em] text-theme-border"
        >
          Email Address
        </label>
        <input
          type="email"
          id="user_email"
          name="user_email"
          required
          autoComplete="email"
          placeholder="name@email.com"
          className="w-full rounded-2xl border border-theme-border/60 bg-transparent px-4 py-3 text-theme-text placeholder:text-theme-border/60 transition focus:border-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-primary/80"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="message"
          className="block text-xs font-semibold uppercase tracking-[0.3em] text-theme-border"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          placeholder="How can I help you? What are you looking to collaborate on?"
          className="w-full resize-none rounded-2xl border border-theme-border/60 bg-transparent px-4 py-3 text-theme-text placeholder:text-theme-border/60 transition focus:border-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-primary/80"
        />
      </div>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-2xl bg-theme-border px-6 py-3 text-base font-semibold text-theme-contrast transition hover:bg-theme-accent focus:outline-none focus:ring-2 focus:ring-theme-border/80 focus:ring-offset-2 focus:ring-offset-theme-surface"
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;
