import React from "react";
import Timeline from "../components/Timeline";
import { Milestone } from "../components/Timeline";

const Experience = () => {
  const milestones: Milestone[] = [
    {
      startDate: new Date(2019, 7, 11),
      endDate: new Date(2020, 11, 31),
      title: "Jr Web Developer",
      company: "Exxis",
      summary:
        "Get access to over 20+ pages including a dashboard layout, charts, kanban board, calendar, and pre-order E-commerce & Marketing pages.",
      extendedDescription:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      startDate: new Date(2021, 7, 11),
      endDate: new Date(2024, 9, 31),
      title: "Web Developer",
      company: "Jalasoft",
      summary:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },
  ];

  return (
    <div className="px-4">
      <Timeline milestones={milestones} />
    </div>
  );
};

export default Experience;
