import { useEffect, useCallback, useRef, useState } from 'react';
import { HiX, HiChevronLeft, HiChevronRight, HiDownload, HiZoomIn, HiZoomOut } from 'react-icons/hi';

export default function ImageModal({ images, currentIndex, onClose, onNavigate }) {
  const image = images[currentIndex];
  const [zoom, setZoom] = useState(1);
  const touchStart = useRef(null);
  const touchDelta = useRef(0);

  const resetZoom = () => setZoom(1);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        resetZoom();
        onNavigate(currentIndex - 1);
      }
      if (e.key === 'ArrowRight' && currentIndex < images.length - 1) {
        resetZoom();
        onNavigate(currentIndex + 1);
      }
      if (e.key === '+' || e.key === '=') setZoom((z) => Math.min(z + 0.5, 3));
      if (e.key === '-') setZoom((z) => Math.max(z - 0.5, 1));
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

  // Reset zoom on image change
  useEffect(() => {
    setZoom(1);
  }, [currentIndex]);

  const handleWheel = (e) => {
    e.preventDefault();
    setZoom((z) => {
      const next = z + (e.deltaY > 0 ? -0.2 : 0.2);
      return Math.max(1, Math.min(3, next));
    });
  };

  // Touch swipe handling
  const handleTouchStart = (e) => {
    if (zoom > 1) return;
    touchStart.current = e.touches[0].clientX;
    touchDelta.current = 0;
  };

  const handleTouchMove = (e) => {
    if (!touchStart.current || zoom > 1) return;
    touchDelta.current = e.touches[0].clientX - touchStart.current;
  };

  const handleTouchEnd = () => {
    if (zoom > 1) return;
    const threshold = 60;
    if (touchDelta.current > threshold && currentIndex > 0) {
      onNavigate(currentIndex - 1);
    } else if (touchDelta.current < -threshold && currentIndex < images.length - 1) {
      onNavigate(currentIndex + 1);
    }
    touchStart.current = null;
    touchDelta.current = 0;
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(image.imageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${image.title || 'mehandi-design'}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      window.open(image.imageUrl, '_blank');
    }
  };

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 animate-fade-in"
      onClick={onClose}
    >
      <div className="relative max-w-5xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
        {/* Top toolbar */}
        <div className="absolute -top-12 right-0 flex items-center gap-3">
          <button
            onClick={() => setZoom((z) => Math.min(z + 0.5, 3))}
            className="text-white/60 hover:text-white transition-colors p-1"
            aria-label="Zoom in"
          >
            <HiZoomIn size={22} />
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(z - 0.5, 1))}
            className="text-white/60 hover:text-white transition-colors p-1"
            aria-label="Zoom out"
          >
            <HiZoomOut size={22} />
          </button>
          <button
            onClick={handleDownload}
            className="text-white/60 hover:text-white transition-colors p-1"
            aria-label="Download"
          >
            <HiDownload size={22} />
          </button>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors p-1"
            aria-label="Close"
          >
            <HiX size={24} />
          </button>
        </div>

        {/* Image */}
        <div
          className="relative overflow-hidden rounded-lg cursor-grab active:cursor-grabbing"
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={image.imageUrl}
            alt={image.title}
            className="w-full max-h-[80vh] object-contain transition-transform duration-200 ease-out"
            style={{ transform: `scale(${zoom})` }}
            draggable={false}
          />

          {/* Navigation arrows */}
          {currentIndex > 0 && (
            <button
              onClick={() => { resetZoom(); onNavigate(currentIndex - 1); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-3 bg-black/50 rounded-full text-white hover:bg-black/70 transition-all hover:scale-110"
              aria-label="Previous image"
            >
              <HiChevronLeft size={24} />
            </button>
          )}
          {currentIndex < images.length - 1 && (
            <button
              onClick={() => { resetZoom(); onNavigate(currentIndex + 1); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-black/50 rounded-full text-white hover:bg-black/70 transition-all hover:scale-110"
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
          {/* Progress dots */}
          <div className="flex items-center justify-center gap-1 mt-3">
            {images.length <= 20 ? (
              images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { resetZoom(); onNavigate(i); }}
                  className={`rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? 'w-6 h-2 bg-gold'
                      : 'w-2 h-2 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))
            ) : (
              <p className="text-white/40 text-xs">
                {currentIndex + 1} / {images.length}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
