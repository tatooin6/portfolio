import Link from "next/link";
import ImageList from "../components/ImageList";
import projectData from "@/app/content/projects.json";

interface listItemsProps {
  name: string;
  date: Date;
  tagline: string;
  technologies: string[];
  img: string;
  link: string;
  repo: string;
}

const listItems: listItemsProps[] = projectData.map((item) => ({
  ...item,
  date: new Date(item.date),
}));

const page = () => {
  return (
    <section className="flex min-h-screen flex-col items-center gap-10 px-4 py-16 text-theme-text">
      <div className="flex w-full max-w-4xl flex-col gap-8">
        <div className="space-y-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-theme-secondary">
            What I&apos;ve built
          </p>
          <h2 className="text-4xl font-bold text-theme-primary">
            Projects that solve problems (and some that scratch itches)
          </h2>
          <p className="text-lg leading-relaxed text-theme-text">
            Check out the solutions I&apos;ve developed some for fun, others for
            real-world impact. {" "}
            <strong className="text-theme-accent">
              Each project in this list challenged me, taught me, and sometimes
              frustrated me
            </strong>{" "}
            (in the best way). I also invite you to visit my repository where
            you can find a more extensive list of my projects.
          </p>
        </div>

        {listItems.length !== 0 ? (
          <div className="w-full">
            <ImageList listItems={listItems} />
          </div>
        ) : (
          <div className="text-center space-y-2">
            <span className="text-xl text-theme-secondary">
              Project loading issue.
            </span>
            <p>
              Please see the{" "}
              <Link
                href={"https://github.com/tatooin6?tab=repositories"}
                target="_blank"
                className="text-theme-primary"
              >
                GitHub repository.
              </Link>
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default page;
