"use client";

import React, { useMemo, useState } from "react";

import { SnackbarProvider } from "notistack";
import { FaEnvelope } from "react-icons/fa";
import ContactForm from "../components/ContactForm";

const Contactme = () => {

  const [fallbackEmailData, setFallbackEmailData] = useState<{
    name: string;
    email: string;
    message: string;
  } | null>(null);

  const mailtoHref = useMemo(() => {
    const baseEmail = "antonio.pantoja03130@gmail.com";

    if (!fallbackEmailData) {
      return `mailto:${baseEmail}?subject=${encodeURIComponent(
        "Inquiry"
      )}&body=${encodeURIComponent(
        "Hello, I would like to get in touch. Please let me know how we can work together."
      )}`;
    }

    const subject = `Contact request from ${fallbackEmailData.name || "Portfolio visitor"
      }`;
    const body = `Name: ${fallbackEmailData.name || "Not provided"}
Email: ${fallbackEmailData.email || "Not provided"}

Message:
${fallbackEmailData.message || "No message provided."}`;

    return `mailto:${baseEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }, [fallbackEmailData]);

  return (
    <>
      <SnackbarProvider maxSnack={3} autoHideDuration={4000}>
        <section className="flex min-h-screen flex-col items-center gap-10 px-4 py-16 text-[#c0caf5]">
          <div className="flex w-full max-w-4xl flex-col gap-8 text-center">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#2ac3de]">
                Let&apos;s Talk
              </p>
              <h2 className="text-4xl font-bold text-[#bb9af7]">
                Get in touch with me
              </h2>
              <p className="text-lg leading-relaxed text-[#c0caf5]">
                The contact form below goes straight to my inbox. I can help to
                find the right solutions so share as much detail as you can and
                I can get back to you shortly.{" "}
                <strong className="text-[#9ece6a]">
                  I read every message personally.
                </strong>
              </p>
            </div>

            <div className="flex justify-center">
              <ContactForm
                onSubmitSuccess={() => setFallbackEmailData(null)}
                onSubmitError={(data) => setFallbackEmailData(data)}
              />
            </div>

            <p className="text-lg text-[#c0caf5]">
              Feel free to reach out to me if you&apos;re interested in getting
              in touch. I&apos;m open to conversations, collaborations, or any
              questions you may have.
            </p>

            <div className="rounded-3xl border border-[#7aa2f7]/50 bg-[#1f2335]/70 p-8 text-left shadow-2xl shadow-[#1a1b26]">
              <div className="mb-6 inline-flex rounded-full bg-[#414868] p-4 text-[#7aa2f7]">
                <FaEnvelope className="text-2xl" />
              </div>

              <div className="space-y-4 text-[#c0caf5]">
                <h3 className="text-2xl font-semibold text-[#bb9af7]">
                  Prefer email?
                </h3>
                <p>
                  If you just want to fire off a quick message from your
                  favorite email client, use the button below and I&apos;ll get
                  back to you shortly.
                </p>
                {fallbackEmailData && (
                  <p className="text-sm text-[#7aa2f7]">
                    Your latest draft is pre-filled below so you can send it
                    instantly.
                  </p>
                )}
              </div>

              <a
                href={mailtoHref}
                className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-[#7aa2f7] px-6 py-3 text-base font-semibold text-[#1a1b26] transition hover:bg-[#9ece6a] focus:outline-none focus:ring-2 focus:ring-[#7aa2f7]/80 focus:ring-offset-2 focus:ring-offset-[#1a1b26]"
              >
                Contact by Email
                <FaEnvelope className="text-lg" />
              </a>
            </div>
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-center text-md text-[#7aa2f7]">
            You can also find my <strong>CV</strong> on the{" "}
            <a
              href="/"
              className="text-[#bb9af7] underline-offset-4 hover:underline"
            >
              Home page
            </a>
            , where you&apos;ll also find my phone number for more direct contact.
          </p>
        </section>
      </SnackbarProvider>
    </>
  );
};

export default Contactme;
