import React from "react";
import Posts from "../components/Posts";

const Page = () => {
  return (
    <section className="flex min-h-screen flex-col items-center gap-10 px-4 py-16 text-theme-text">
      <div className="flex w-full max-w-4xl flex-col gap-8">
        <div className="space-y-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-theme-secondary">
            Dev Notes
          </p>
          <h2 className="text-4xl font-bold text-theme-primary">
            What I&apos;m learning, breaking, fixing and sometimes joking about
          </h2>
          <p className="text-lg leading-relaxed text-theme-text">
            This blog is my playground for thoughts. Expect technical deep
            dives, insights from job interviews and coding lessons.
            {" "}
            <strong className="text-theme-accent">
              I write to teach, to remember, and document.
            </strong>
            {" "}Stick around, you might learn something useful or at least have
            fun learning.
          </p>
        </div>

        <div className="w-full">
          <Posts />
        </div>
      </div>
    </section>
  );
};

export default Page;
