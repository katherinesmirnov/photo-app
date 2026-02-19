"use client";

import Image from "next/image";
import type { Photo } from "@prisma/client";
import { getFilename } from './helper'

// Separate component for grid items
interface PhotoGridItemProps {
  photo: Photo;
  onClick: () => void;
}

const PhotoGridItem: React.FC<PhotoGridItemProps> = ({ photo, onClick }) => {
  return (
    <div
      className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden cursor-pointer group hover:shadow-lg transition-shadow"
      data-photo-id={photo.id}
      onClick={() => onClick()}
    >
      <Image
        src={photo.filePath}
        alt={getFilename(photo.filePath)}
        fill
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
      />
      {photo.isFavorite && (
        <div className="absolute top-2 right-2 bg-white/90 rounded-full p-1">
          <svg className="w-5 h-5 text-red-500 fill-current" viewBox="0 0 20 20">
            <path d="M10 3.22l-.61-.6a5.5 5.5 0 0 0-7.78 7.77L10 18.78l8.39-8.4a5.5 5.5 0 0 0-7.78-7.77l-.61.61z"/>
          </svg>
        </div>
      )}
    </div>
  );
};

export default PhotoGridItem;