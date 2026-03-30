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
        <section className="flex min-h-screen flex-col items-center gap-10 px-4 py-16 text-theme-text">
          <div className="flex w-full max-w-4xl flex-col gap-8 text-center">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-theme-secondary">
                Let&apos;s Talk
              </p>
              <h2 className="text-4xl font-bold text-theme-primary">
                Get in touch with me
              </h2>
              <p className="text-lg leading-relaxed text-theme-text">
                The contact form below goes straight to my inbox. I can help to
                find the right solutions so share as much detail as you can and
                I can get back to you shortly.{" "}
                <strong className="text-theme-accent">
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

            <p className="text-lg text-theme-text">
              Feel free to reach out to me if you&apos;re interested in getting
              in touch. I&apos;m open to conversations, collaborations, or any
              questions you may have.
            </p>

            <div className="rounded-3xl border border-theme-border/50 bg-theme-surface/90 p-8 text-left shadow-2xl shadow-theme-contrast/20">
              <div className="mb-6 inline-flex rounded-full bg-theme-panel p-4 text-theme-border">
                <FaEnvelope className="text-2xl" />
              </div>

              <div className="space-y-4 text-theme-text">
                <h3 className="text-2xl font-semibold text-theme-primary">
                  Prefer email?
                </h3>
                <p>
                  If you just want to fire off a quick message from your
                  favorite email client, use the button below and I&apos;ll get
                  back to you shortly.
                </p>
                {fallbackEmailData && (
                  <p className="text-sm text-theme-border">
                    Your latest draft is pre-filled below so you can send it
                    instantly.
                  </p>
                )}
              </div>

              <a
                href={mailtoHref}
                className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-theme-border px-6 py-3 text-base font-semibold text-theme-contrast transition hover:bg-theme-accent focus:outline-none focus:ring-2 focus:ring-theme-border/80 focus:ring-offset-2 focus:ring-offset-theme-surface"
              >
                Contact by Email
                <FaEnvelope className="text-lg" />
              </a>
            </div>
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-center text-md text-theme-border">
            You can also find my <strong>CV</strong> on the{" "}
            <a
              href="/"
              className="text-theme-primary underline-offset-4 hover:underline"
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
