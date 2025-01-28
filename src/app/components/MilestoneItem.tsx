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
        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-gray-700 dark:border-white dark:bg-gray-700"></div>
        <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
          <div className="flex flex-row">
            <span>{titleFormat(milestone.startDate)}</span>
            <div className="px-4">
              <MdArrowForward />
            </div>
            <span>{titleFormat(milestone.endDate)}</span>
          </div>
        </time>
        <div className="flex flex-row">
          <h3 className="text-lg font-semibold dark:text-white pr-4">
            {milestone.title}
          </h3>
          {milestone.company && (
            <div className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
              <h3 className="text-sm font-thin">{milestone.company}</h3>
            </div>
          )}
        </div>
        <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
          {milestone.summary}
        </p>
        {milestone.extendedDescription ? (
          <div>
            {isExpanded && (
              <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                {milestone.extendedDescription}
              </p>
            )}
            <button
              onClick={() => setIsExpanded((isExp) => !isExp)}
              className="inline-flex items-center py-2 text-sm font-medium text-gray-400 hover:text-blue-700 focus:z-10 focus:outline-none focus:text-blue-700 dark:text-gray-400 dark:hover:text-white"
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
