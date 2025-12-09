"use client";

import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
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

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) return;

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    const formData = new FormData(form.current);
    const submission: ContactFormData = {
      name: String(formData.get("user_name") ?? "").trim(),
      email: String(formData.get("user_email") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    if (!serviceId || !templateId || !publicKey) {
      console.error("Missing EmailJS configuration.");
      enqueueSnackbar(
        "Message service is misconfigured. Please use the email option instead.",
        { variant: "error" }
      );
      onSubmitError?.(submission);
      return;
    }

    const templateParams = {
      name: submission.name,
      time: formatSubmissionTime(),
      message: submission.message,
      title: submission.name,
      email: submission.email,
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then(() => {
        enqueueSnackbar("Message delivered! I will reply as soon as I can.", {
          variant: "success",
        });
        form.current?.reset();
        onSubmitSuccess?.();
      })
      .catch((err: unknown) => {
        console.error("FAILED:", err);
        enqueueSnackbar(
          "Something went wrong. Use the email option below to reach me.",
          {
            variant: "error",
          }
        );
        form.current?.reset();
        onSubmitError?.(submission);
      });
  };

  return (
    <form
      aria-label="Contact form"
      className="w-full max-w-3xl space-y-6 rounded-3xl border border-[#7aa2f7]/50 bg-[#1f2335]/80 p-8 shadow-2xl shadow-[#1a1b26]"
      onSubmit={sendEmail}
      ref={form}
    >
      <div className="space-y-2">
        <label
          htmlFor="user_name"
          className="block text-xs font-semibold uppercase tracking-[0.3em] text-[#7aa2f7]"
        >
          Full Name
        </label>
        <input
          type="text"
          id="user_name"
          name="user_name"
          required
          autoComplete="name"
          placeholder="John Doe"
          className="w-full rounded-2xl border border-[#7aa2f7]/60 bg-transparent px-4 py-3 text-[#c0caf5] placeholder:text-[#7aa2f7]/60 focus:border-[#bb9af7] focus:outline-none focus:ring-2 focus:ring-[#bb9af7]/80 transition"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="user_email"
          className="block text-xs font-semibold uppercase tracking-[0.3em] text-[#7aa2f7]"
        >
          Email Address
        </label>
        <input
          type="email"
          id="user_email"
          name="user_email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className="w-full rounded-2xl border border-[#7aa2f7]/60 bg-transparent px-4 py-3 text-[#c0caf5] placeholder:text-[#7aa2f7]/60 focus:border-[#bb9af7] focus:outline-none focus:ring-2 focus:ring-[#bb9af7]/80 transition"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="message"
          className="block text-xs font-semibold uppercase tracking-[0.3em] text-[#7aa2f7]"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          placeholder="How can I help you?"
          className="w-full resize-none rounded-2xl border border-[#7aa2f7]/60 bg-transparent px-4 py-3 text-[#c0caf5] placeholder:text-[#7aa2f7]/60 focus:border-[#bb9af7] focus:outline-none focus:ring-2 focus:ring-[#bb9af7]/80 transition"
        />
      </div>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-2xl bg-[#7aa2f7] px-6 py-3 text-base font-semibold text-[#1a1b26] transition hover:bg-[#9ece6a] focus:outline-none focus:ring-2 focus:ring-[#7aa2f7]/80 focus:ring-offset-2 focus:ring-offset-[#1a1b26]"
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;
