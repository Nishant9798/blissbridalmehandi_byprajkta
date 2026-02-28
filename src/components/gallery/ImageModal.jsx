import { useEffect, useCallback } from 'react';
import { HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi';

export default function ImageModal({ images, currentIndex, onClose, onNavigate }) {
  const image = images[currentIndex];

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && currentIndex > 0) onNavigate(currentIndex - 1);
      if (e.key === 'ArrowRight' && currentIndex < images.length - 1) onNavigate(currentIndex + 1);
    },
    [currentIndex, images.length, onClose, onNavigate]
  );

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  if (!image) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90" onClick={onClose}>
      <div className="relative max-w-5xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors"
          aria-label="Close"
        >
          <HiX size={28} />
        </button>

        {/* Image */}
        <div className="relative">
          <img
            src={image.imageUrl}
            alt={image.title}
            className="w-full max-h-[80vh] object-contain rounded-lg"
          />

          {/* Navigation arrows */}
          {currentIndex > 0 && (
            <button
              onClick={() => onNavigate(currentIndex - 1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
              aria-label="Previous image"
            >
              <HiChevronLeft size={24} />
            </button>
          )}
          {currentIndex < images.length - 1 && (
            <button
              onClick={() => onNavigate(currentIndex + 1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
              aria-label="Next image"
            >
              <HiChevronRight size={24} />
            </button>
          )}
        </div>

        {/* Caption */}
        <div className="text-center mt-4">
          <h3 className="font-playfair text-white text-xl font-semibold">{image.title}</h3>
          <p className="text-gold-light text-sm mt-1">{image.category}</p>
          {image.description && (
            <p className="text-white/60 text-sm mt-1">{image.description}</p>
          )}
          <p className="text-white/40 text-xs mt-2">
            {currentIndex + 1} / {images.length}
          </p>
        </div>
      </div>
    </div>
  );
}
