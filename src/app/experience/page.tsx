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
    <div className="px-4">
      <Timeline milestones={milestones} />
    </div>
  );
};

export default Experience;
