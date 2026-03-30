import React from "react";
import Timeline from "../components/Timeline";
import { Milestone } from "../components/Timeline";
import experienceData from "@/app/content/experience.json";

const Experience = () => {
  const milestones: Milestone[] = experienceData.map((item) => ({
    ...item,
    startDate: new Date(item.startDate),
    endDate: new Date(item.endDate),
  }));

  return (
    <section className="flex min-h-screen flex-col items-center gap-10 px-4 py-16 text-theme-text">
      <div className="flex w-full max-w-4xl flex-col gap-8">
        <div className="space-y-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-theme-secondary">
            Where I&apos;ve been
          </p>
          <h2 className="text-4xl font-bold text-theme-primary">
            A developer&apos;s timeline
          </h2>
          <p className="text-lg leading-relaxed text-theme-text">
            Here&apos;s a glimpse of my professional journey. I&apos;ve taught,
            built, shipped, and scaled projects across diverse teams and
            domains.{" "}
            <strong className="text-theme-accent">
              Each experience has sharpened my skills and deepened my passion for tech.
            </strong>{" "}
            Dive into the roles that shaped me.
          </p>
        </div>

        <div className="w-full">
          <Timeline milestones={milestones} />
        </div>
      </div>
    </section>
  );
};

export default Experience;
