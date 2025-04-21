import Link from "next/link";
import ImageList from "../components/ImageList";

interface listItemsProps {
  name: string;
  date: Date;
  tagline: string;
  technologies: string[];
  img: string;
  link: string;
  repo: string;
}

// TODO: extract this project lists into a file to be imported
const listItems: listItemsProps[] = [
  {
    name: "ServiDesk",
    date: new Date("2020-09-20"),
    tagline: "A useful desktop support platform for small businesses",
    technologies: ["NodeJS", "Socket.io", "Javascript", "HTML", "CSS"],
    img: "A.png",
    link: "",
    repo: "https://github.com/tatooin6/socket-colas",
  },
  {
    name: "Resume Optimizer",
    date: new Date("2025-02-27"),
    tagline:
      "This project allows to optimize resumes based on a job description using AI.",
    technologies: ["Python", "FastApi", "Typescript", "ReactJS", "GenAI"],
    img: "B.png",
    link: "",
    repo: "https://github.com/tatooin6/resume_optimization",
  },
  {
    name: "Jour Buddy",
    date: new Date("2025-04-08"),
    tagline:
      "Spark Ideas with AI: With a topic instantly get title and discussion angle suggestions to kickstart content.",
    technologies: ["ReactJS", "Node.js", "GenAI", "TypeScript"],
    img: "C.png",
    link: "",
    repo: "https://github.com/tatooin6/content-suggestions",
  },
];

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen center p-8">
      {listItems.length !== 0 ? (
        <>
          <p className="text-2xl">Projects</p>
          <ImageList listItems={listItems} />
        </>
      ) : (
        <>
          <span className="text-[#2ac3de] text-xl">Project loading issue.</span>
          <p>
            Please see the{" "}
            <Link
              href={"https://github.com/tatooin6?tab=repositories"}
              target="_blank"
              className="text-[#bb9af7]"
            >
              GitHub repository.
            </Link>
          </p>
        </>
      )}
    </div>
  );
};

export default page;
