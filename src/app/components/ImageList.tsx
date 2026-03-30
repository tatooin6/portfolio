"use client";

import { useState } from "react";
import Picture from "./common/Picture";
import ListItem from "./common/ListItem";
import { formatDate } from "@/utils/dateUtils";

interface ImageListProps {
  listItems: any[];
}

const ImageList = ({ listItems }: ImageListProps) => {
  const [selectedProject, setSelectedProject] = useState("A.png");
  const handleHover = (src: string) => {
    setSelectedProject(src);
  };
  return (
    <div className="flex w-full flex-row text-theme-secondary">
      <div className="hidden w-1/2 items-center justify-center p-4 sm:flex">
        <Picture src={`/images/projects/${selectedProject}`} />
      </div>
      <div className="my-4 max-h-[500px] w-full overflow-y-auto rounded-lg bg-theme-panel sm:w-1/2">
        <ul role="list" className="divide-y divide-theme-secondary/30 px-2">
          {listItems.map((project) => (
            <ListItem
              key={project.name}
              onHoverAction={() => handleHover(project.img)}
              topLeftText={project.name}
              topRightText={formatDate(project.date)}
              bottomLeftText={project.tagline}
              bottomRightText={project.technologies.join(",")}
              link={project.link}
              repo={project.repo}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ImageList;
