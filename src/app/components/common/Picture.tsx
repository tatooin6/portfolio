"use client";
import Image from "next/image";

interface PictureProps {
  src: string;
  alt?: string;
}

const Picture = ({ src, alt = "" }: PictureProps) => {
  return (
    <Image
      src={src}
      width={500}
      height={500}
      alt={alt}
      className="object-cover w-full h-full max-h-[500px] min-h-[500px] rounded-lg"
    />
  );
};

export default Picture;
