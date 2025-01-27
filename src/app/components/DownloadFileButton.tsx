"use client";

const DownloadFileButton = () => {
  return (
    <a
      className="bg-transparent hover:bg-gray-100 font-semibold py-2 px-4 border border-gray-400 rounded shadow dark:bg-transparent dark:hover:bg-blue-500 dark:text-white dark:hover:text-white dark:border-white dark:hover:border-transparent"
      href="/AntonioPantoja_CV.pdf"
      download="AntonioPantoja_CV.pdf"
    >
      Download CV
    </a>
  );
};

export default DownloadFileButton;
