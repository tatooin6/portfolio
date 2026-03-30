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
        className="rounded border border-theme-border/70 bg-transparent px-4 py-2 font-semibold text-theme-text shadow transition hover:border-theme-border hover:bg-theme-border hover:text-theme-contrast"
        href={href}
        download={download}
      >
        { text }
      </a>
    </div>
  );
};

export default DownloadFileButton;
