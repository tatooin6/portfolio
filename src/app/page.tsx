import ProfilePicture from "./components/common/ProfilePicture";
import DownloadFileButton from "./components/DownloadFileButton";
import fs from "fs";
import path from "path";

export default function Home() {
  const profilesDir = path.join(process.cwd(), "public", "images", "profiles");
  const profiles = fs.existsSync(profilesDir)
    ? fs
      .readdirSync(profilesDir)
      .filter((fileName) =>
        fs.statSync(path.join(profilesDir, fileName)).isFile()
      )
      .map((fileName) => `/images/profiles/${fileName}`)
    : [];

  return (
    <section className="flex min-h-screen flex-col items-center gap-10 px-4 py-16 text-theme-text">
      <div className="z-10 flex w-full max-w-4xl flex-col items-center gap-8">
        <div className="space-y-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-theme-secondary">
            Hi there
          </p>
          <h2 className="text-4xl font-bold text-theme-primary">
            I&apos;m Tato - Fullstack Web Developer
          </h2>
          <div className="flex justify-center">
            <ProfilePicture profiles={profiles} />
          </div>
          <p className="text-lg leading-relaxed text-theme-text">
            Full-stack developer crafting  scalable and
            meaningful web development projects. From backend logic to frontend
            polish,
            {" "}
            <strong className="text-theme-accent">
              I build modern web solutions with clean code, smart architecture, and a creative edge.
            </strong>{" "}
          </p>
          <p className="text-theme-muted">
            Feel free to download my CV below and explore more on this web site about who I am, what I do, and
            how we could work together.
          </p>
        </div>

        <div className="pt-4 flex flex-col lg:flex-row items-center justify-center w-full gap-4 text-center">
          <DownloadFileButton
            text="Download CV ENG"
            download="AntonioPantoja_CV_ENG.pdf"
            href="/CV-AntonioPantoja_ENG.pdf"
          />
          <DownloadFileButton
            text="Descargar CV ESP"
            download="AntonioPantoja_CV_ESP.pdf"
            href="/CV-AntonioPantoja_ESP.pdf"
          />
        </div>
      </div>
    </section>
  );
}
