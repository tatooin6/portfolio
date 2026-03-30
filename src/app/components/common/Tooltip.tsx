interface TooltipProps {
  children: React.ReactNode;
  text: string;
}

const Tooltip = ({ children, text }: TooltipProps) => {
  return (
    <div className="relative group">
      {children}
      <div className="absolute bottom-full left-1/2 z-10 mb-1 hidden w-full -translate-x-1/2 whitespace-normal break-words rounded bg-theme-text px-2 py-1 text-xs text-theme-contrast group-hover:block">
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
