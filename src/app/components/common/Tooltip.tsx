interface TooltipProps {
  children: React.ReactNode;
  text: string;
}

const Tooltip = ({ children, text }: TooltipProps) => {
  return (
    <div className="relative group">
      {children}
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 z-10 w-5/6 whitespace-normal break-words">
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
