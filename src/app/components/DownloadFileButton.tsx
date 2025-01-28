"use client";

interface DownloadFileButtonProps {
  href:string
  download:string
  text:string
}

const DownloadFileButton = ({href, download, text}:DownloadFileButtonProps) => {
  return (
    <div className="lg:px-3 py-4">
      <a
        className="bg-transparent hover:bg-gray-100 font-semibold py-2 px-4 border border-gray-400 rounded shadow dark:bg-transparent dark:hover:bg-blue-500 dark:text-white dark:hover:text-white dark:border-white dark:hover:border-transparent"
        href={href}
        download={download}
      >
        { text }
      </a>
    </div>
  );
};

export default DownloadFileButton;
