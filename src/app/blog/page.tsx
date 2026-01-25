import React from "react";
import Posts from "../components/Posts";

const Page = () => {
  return (
    <section className="flex min-h-screen flex-col items-center gap-10 px-4 py-16 text-[#c0caf5]">
      <div className="w-full max-w-4xl flex flex-col gap-8">
        <div className="space-y-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#2ac3de]">
            Dev Notes
          </p>
          <h2 className="text-4xl font-bold text-[#bb9af7]">
            What I&apos;m learning, breaking, fixing and sometimes joking about
          </h2>
          <p className="text-lg leading-relaxed text-[#c0caf5]">
            This blog is my playground for thoughts. Expect technical deep
            dives, insights from job interviews, coding lessons, and maybe a
            stand-up-worthy joke or two.{" "}
            <strong className="text-[#9ece6a]">
              I write to teach, to remember, and document.
            </strong>
            {" "}Stick around, you might learn something useful or at least have
            a laugh.
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
