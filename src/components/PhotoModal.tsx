import Image from "next/image";
import { getFilePath } from './helper'
import type { Photo } from "@/generated/prisma/client";
import { useEffect, useRef } from 'react';

// Separate component for modal
interface PhotoModalProps {
  photo: Photo;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onFavorite: () => void;
}

const PhotoModal: React.FC<PhotoModalProps> = ({ photo, onClose, onPrev, onNext, onFavorite }) => {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleBackgroundClick = (): void => {
    onClose();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    document.addEventListener('keydown', onKey);
    // Focus close button for accessibility
    closeButtonRef.current?.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose, onPrev, onNext]);

  // Prevent body from scrolling while modal is open and compensate for scrollbar
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, []);

  const takenDate = photo.takenDate ? new Date(photo.takenDate).toLocaleDateString() : 'Unknown';
  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/90" onClick={handleBackgroundClick} />

      {/* Next/Prev/Close Buttons */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous photo"
        className="fixed left-4 top-1/2 -translate-y-1/2 text-white bg-black/40 rounded-full p-2 hover:bg-black/60 z-60 cursor-pointer"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next photo"
        className="fixed right-4 top-1/2 -translate-y-1/2 text-white bg-black/40 rounded-full p-2 hover:bg-black/60 z-60 cursor-pointer"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <button
        ref={closeButtonRef}
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="fixed top-4 right-4 text-white hover:text-gray-300 transition-colors bg-black/40 rounded-full p-2 z-60 cursor-pointer"
        aria-label="Close modal"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="relative max-w-5xl w-full mx-auto h-screen overflow-auto hide-scrollbar">
        <div style={{ position: 'fixed', inset: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          <Image
            src={getFilePath(photo.filePath)}
            alt={getFilePath(photo.filePath, false)}
            fill
            className="rounded-lg"
            style={{ maxWidth: 'calc(100vw - 20px)', maxHeight: 'calc(100vh - 20px)', objectFit: 'contain', display: 'block'}}
          />
        </div>

        {/* Info box */}
        <div style={{ position: 'relative', zIndex: 100, paddingTop: '100vh' }}>
          <div className="mt-4 bg-white rounded-lg p-4 mx-4 shadow-top relative">
            <h2 className="text-lg font-semibold text-gray-900">{getFilePath(photo.filePath, false)}</h2>
            <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-gray-600">
              <div>
                <span className="font-medium">Date:</span> {takenDate}
              </div>
            </div>

              <button
                onClick={(e) => { e.stopPropagation(); onFavorite(); }}
                aria-label={photo.isFavorite ? "Unfavorite photo" : "Favorite photo"}
                className="absolute top-3 right-3 text-gray-700 hover:text-gray-900 transition-colors bg-white/90 rounded-full p-2 z-10 cursor-pointer"
              >
                {photo.isFavorite ? (
                  <svg className="w-6 h-6 text-red-500" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 3.22l-.61-.6a5.5 5.5 0 0 0-7.78 7.77L10 18.78l8.39-8.4a5.5 5.5 0 0 0-7.78-7.77l-.61.61z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                )}
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoModal;