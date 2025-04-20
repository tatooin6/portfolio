"use client";

import { useState } from "react";
import Picture from "./common/Picture";
import ListItem from "./common/ListItem";
import { formatDate } from "@/utils/dateUtils";

interface ImageListProps {
  listItems: any[];
}

const ImageList = ({ listItems }: ImageListProps) => {
  const [selectedProject, setSelectedProject] = useState(
    "/images/projects/A.jpeg",
  );
  const handleHover = (src: string) => {
    setSelectedProject(src);
  };
  return (
    <div className="flex flex-row text-[#2ac3de] w-full">
      <div className="hidden sm:flex w-1/2 p-4 justify-center items-center">
        <Picture src={selectedProject} />
      </div>
      <div className="bg-[#414868] sm:w-1/2 w-full px-2 my-4 rounded-lg max-h-[500px] overflow-y-auto">
        <ul role="list" className="divide-y divide-[#b4f9f8]">
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
