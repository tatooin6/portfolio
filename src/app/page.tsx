import ProfilePicture from "./components/common/ProfilePicture";
import DownloadFileButton from "./components/DownloadFileButton";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-start p-24">
      <div className="z-10 w-full max-w-5xl flex flex-col items-center justify-center text-sm">
        <div className="pb-6">
          <ProfilePicture />
        </div>
        <h2 className="text-2xl/7 font-bold dark:text-gray-200 sm:truncate sm:text-3xl sm:tracking-tight">
          Tato
        </h2>
        <p className="text-xl lg:static flex w-full justify-start bg-gradient-to-b pb-6 pt-8 backdrop-blur-2xl dark:from-inherit dark:text-gray-200 lg:rounded-xl lg:p-4">
          Full Stack Web Developer & Educator
        </p>
        <p className="flex w-full justify-start lg:p-4 pb-6 pt-8 dark:text-gray-200">
          Experienced professional with a passion for efficient solutions and
          sharing technical expertise.
        </p>
        <div className="pt-4">
          <DownloadFileButton />
        </div>
      </div>
    </main>
  );
}
