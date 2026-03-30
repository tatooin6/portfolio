"use client";

import { useState } from "react";
import { Milestone } from "./Timeline";
import { MdExpandMore, MdExpandLess, MdArrowForward } from "react-icons/md";
import { titleFormat } from "@/utils/dateUtils";

interface MilestoneItemProps {
  milestone: Milestone;
  isLast: boolean;
}

const MilestoneItem = ({ milestone, isLast }: MilestoneItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div key={milestone.company}>
      <li className={`${isLast ? "" : "mb-10"} ms-4`}>
        <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-theme-border bg-theme-surface"></div>
        <time className="mb-1 text-sm font-normal leading-none text-theme-border">
          <div className="flex flex-row">
            <span>{titleFormat(milestone.startDate)}</span>
            <div className="px-4">
              <MdArrowForward />
            </div>
            <span>{titleFormat(milestone.endDate)}</span>
          </div>
        </time>
        <div className="flex flex-row">
          <h3 className="pr-4 text-lg font-semibold text-theme-secondary">
            {milestone.title}
          </h3>
          {milestone.company && (
            <div className="flex flex-col items-center justify-center text-theme-muted">
              <h3 className="text-sm font-thin">{milestone.company}</h3>
            </div>
          )}
        </div>
        <p className="mb-4 text-base font-normal text-theme-text">
          {milestone.summary}
        </p>
        {milestone.extendedDescription ? (
          <div>
            {isExpanded && (
              <p className="mb-4 text-base font-normal text-theme-text">
                {milestone.extendedDescription}
              </p>
            )}
            <button
              type="button"
              onClick={() => setIsExpanded((isExp) => !isExp)}
              className="inline-flex items-center py-2 text-sm font-medium text-theme-subtle hover:text-theme-primary focus:z-10 focus:outline-none focus:text-theme-primary"
            >
              {isExpanded ? (
                <>
                  See less
                  <MdExpandLess className="text-xl" />
                </>
              ) : (
                <>
                  See more
                  <MdExpandMore className="text-xl" />
                </>
              )}
            </button>
          </div>
        ) : (
          <></>
        )}
      </li>
    </div>
  );
};

export default MilestoneItem;
