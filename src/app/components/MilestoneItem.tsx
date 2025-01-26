"use client";

import { useState } from "react";
import { Milestone } from "./Timeline";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { titleFormat } from "@/utils/dateUtils";

const MilestoneItem = ({ milestone }: { milestone: Milestone }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div key={milestone.company}>
      <li className="mb-10 ms-4">
        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
        <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
          {titleFormat(milestone.startDate)}
        </time>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {milestone.title}
        </h3>
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
              className="inline-flex items-center py-2 text-sm font-medium text-gray-900 hover:text-blue-700 focus:z-10 focus:outline-none focus:text-blue-700 dark:text-gray-400 dark:hover:text-white"
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
