import { useState } from "react";
import Link from "next/link";

import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { RiGitRepositoryLine } from "react-icons/ri";

interface ListItemProps {
  topLeftText: string;
  topRightText: string;
  bottomLeftText: string;
  bottomRightText: string;
  onHoverAction: () => void;
  link?: string;
  repo?: string;
}

const ListItem = ({
  onHoverAction,
  topLeftText,
  topRightText,
  bottomLeftText,
  bottomRightText,
  link = "",
  repo = "",
}: ListItemProps) => {
  const [isOnHover, setIsOnHover] = useState(false);
  const handleHover = () => {
    setIsOnHover(true);
    onHoverAction();
  };
  return (
    <li
      className="flex justify-between gap-x-6 py-5"
      key={topLeftText}
      onMouseOver={() => handleHover()}
      onMouseLeave={() => setIsOnHover(false)}
    >
      <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto">
          <p className="text-sm/6 font-semibold">{topLeftText}</p>
          <p className="mt-1 truncate text-xs/5 text-[#7aa2f7]">
            {bottomLeftText}
          </p>
        </div>
      </div>
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <p className="text-sm/6 text-[#73daca]">{topRightText}</p>
        <p className="mt-1 text-xs/5 text-[#7aa2f7]">{bottomRightText}</p>
      </div>
      {isOnHover && (link || repo) && (
        <div className="flex flex-col items-center justify-center content-between gap-4">
          {link && (
            <Link className="cursor-pointer" href={link}>
              <FaArrowUpRightFromSquare />
            </Link>
          )}
          {repo && (
            <Link className="cursor-pointer text-xl" href={repo}>
              <RiGitRepositoryLine />
            </Link>
          )}
        </div>
      )}
    </li>
  );
};

export default ListItem;
