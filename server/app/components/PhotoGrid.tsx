"use client";

import { useState } from "react";
import type { Photo } from "@/app/types/photo";
import PhotoGridItem from "./PhotoGridItem";
import PhotoModal from "./PhotoModal";

export interface PhotoGridProps {
  photos: Photo[];
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Clone incoming array so we can locally modify it
  const [photoArray, setPhotoArray] = useState<Photo[]>(photos);

  const handlePhotoClick = (index: number): void => {
    setSelectedIndex(index);
  };

  const handleCloseModal = (): void => {
    // Capture index to scroll to after closing
    const id = selectedIndex;
    // Close modal immediately
    setSelectedIndex(null);


    requestAnimationFrame(() => requestAnimationFrame(() => {
      const el = document.querySelector<HTMLElement>(`[data-photo-id="${id}"]`);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const elementMiddle = window.scrollY + rect.top + rect.height / 2;
      let target = elementMiddle - viewportHeight / 2;
      // Clamp within document bounds
      const max = Math.max(document.body.scrollHeight - viewportHeight, 0);
      if (target < 0) target = 0;
      if (target > max) target = max;
      window.scrollTo({ top: target, behavior: 'smooth' });
    }));
  };

  const handlePrev = (): void => {
    if (selectedIndex === 0) {
      handleCloseModal();
      return;
    }
    setSelectedIndex(selectedIndex! - 1);
  };

  const handleNext = (): void => {
    if (selectedIndex === photoArray.length - 1) {
      handleCloseModal();
      return;
    }
    setSelectedIndex(selectedIndex! + 1);
  };

  const handleFavorite = (idx: number) => {
    setPhotoArray(photoArray.map((p, i) => {
      if (i === idx) {
        return { ...p, isFavorite: !p.isFavorite }
      } else {
        // The rest haven't changed
        return p;
      }
    }));
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">My Photos</h1>
          <p className="text-sm text-gray-600 mt-1">{photos.length} photos</p>
        </div>
      </div>

      {/* Photo Grid */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {photoArray.map((photo: Photo, idx: number) => (
            <PhotoGridItem
              key={photo.id}
              photo={photo}
              onClick={() => handlePhotoClick(idx)}
            />
          ))}
        </div>
      </div>

      {/* Photo Detail Modal */}
      {selectedIndex !== null && (
        <PhotoModal
          photo={photoArray[selectedIndex]}
          onClose={handleCloseModal}
          onPrev={handlePrev}
          onNext={handleNext}
          onFavoritem={() => handleFavorite(selectedIndex)}
        />
      )}
    </div>
  );
};

export default PhotoGrid;