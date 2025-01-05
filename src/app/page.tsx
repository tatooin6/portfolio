export default function Home() {
  return (
    <main className="flex flex-col items-center justify-start p-24">
      <div className="z-10 w-full max-w-5xl flex flex-col items-center justify-center font-mono text-sm">
        <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Tato</h2>
        <p className="text-xl lg:static flex w-full justify-start bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:bg-zinc-800/30 dark:from-inherit lg:rounded-xl lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Full Stack Web Developer & Educator
        </p> 
        <p className="pb-4">Experienced professional with a passion for efficient 
          solutions and sharing technical expertise.</p>
      </div>
    </main>
  );
}