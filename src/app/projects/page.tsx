import ImageList from "../components/ImageList";

const listItems = [
  {
    name: "Portfolio Website",
    date: new Date("2022-05-15"),
    tagline: "A personal portfolio built with React and TailwindCSS.",
    technologies: ["React", "TailwindCSS", "TypeScript"],
    img: "/images/projects/A.jpeg",
    link: "somethign",
  },
  {
    name: "E-commerce Platform",
    date: new Date("2021-11-01"),
    tagline: "An end-to-end e-commerce solution with payment integration.",
    technologies: ["Node.js", "Express", "MongoDB", "Stripe"],
    img: "/images/projects/B.jpeg",
    link: "some_link",
    repo: "some_repo",
  },
  {
    name: "Chat Application",
    date: new Date("2022-02-10"),
    tagline:
      "A real-time chat app using Socket.io for seamless communications.",
    technologies: ["React", "Node.js", "Socket.io", "TypeScript"],
    img: "/images/projects/C.jpeg",
    link: "",
    repo: "only_repo",
  },
  {
    name: "Machine Learning API",
    date: new Date("2020-08-20"),
    tagline: "A RESTful API to perform machine learning predictions.",
    technologies: ["Python", "TensorFlow", "FastAPI"],
    img: "/images/projects/D.jpeg",
    link: "",
    repo: "",
  },
  {
    name: "Mobile Fitness App",
    date: new Date("2021-03-25"),
    tagline: "An app to track workouts and monitor fitness progress.",
    technologies: ["React Native", "Firebase", "TypeScript"],
    img: "/images/projects/E.jpeg",
    link: "",
    repo: "",
  },
  {
    name: "Weather Dashboard",
    date: new Date("2022-07-05"),
    tagline:
      "A dashboard displaying live weather data with interactive charts.",
    technologies: ["Vue.js", "D3.js", "Node.js"],
    img: "/images/projects/F.jpeg",
    link: "",
    repo: "",
  },
  {
    name: "Task Management Tool",
    date: new Date("2023-01-12"),
    tagline: "A productivity tool to efficiently manage tasks and projects.",
    technologies: ["Angular", "TypeScript", "Bootstrap"],
    img: "/images/projects/A.jpeg",
    link: "",
    repo: "",
  },
];

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen center p-8">
      <p className="text-2xl">Projects</p>
      <ImageList listItems={listItems} />
    </div>
  );
};

export default page;
