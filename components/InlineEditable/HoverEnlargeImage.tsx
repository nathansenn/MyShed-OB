"use client";

import { useState } from "react";

interface HoverEnlargeImageProps {
  src: string;
  alt: string;
  thumbnailClassName?: string;
  enlargedSize?: number;
}

export function HoverEnlargeImage({
  src,
  alt,
  thumbnailClassName = "w-16 h-16",
  enlargedSize = 300,
}: HoverEnlargeImageProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setImageSrc(
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Crect fill='%23f3f4f6' width='64' height='64'/%3E%3Ctext fill='%239ca3af' font-family='sans-serif' font-size='10' text-anchor='middle' x='32' y='32'%3EImage%3C/text%3E%3C/svg%3E"
    );
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail */}
      <img
        src={imageSrc}
        alt={alt}
        className={`object-cover rounded border border-gray-200 cursor-zoom-in transition-opacity ${thumbnailClassName}`}
        onError={handleError}
      />

      {/* Enlarged version on hover */}
      {isHovered && (
        <div
          className="absolute left-full top-0 ml-2 z-50 pointer-events-none animate-in fade-in zoom-in-95 duration-150"
          style={{
            width: `${enlargedSize}px`,
            height: `${enlargedSize}px`,
          }}
        >
          <img
            src={imageSrc}
            alt={`${alt} - Enlarged`}
            className="w-full h-full object-cover rounded-lg border-2 border-gray-300 shadow-2xl bg-white"
          />
        </div>
      )}
    </div>
  );
}
