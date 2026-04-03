import { useState, useMemo } from 'react';
import GalleryCard from './GalleryCard';
import ImageModal from './ImageModal';
import CategoryFilter from './CategoryFilter';
import LoadingSpinner from '../ui/LoadingSpinner';
import { useFirestoreCollection } from '../../hooks/useFirestore';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { useLikedImages } from '../../hooks/useLikedImages';

export default function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [modalIndex, setModalIndex] = useState(null);

  const { documents: images, loading, error } = useFirestoreCollection('gallery', {
    orderByField: 'createdAt',
    orderDirection: 'desc',
  });

  const { isLiked, toggleLike } = useLikedImages();

  const filteredImages = useMemo(() => {
    if (activeCategory === 'All') return images;
    return images.filter((img) => img.category === activeCategory);
  }, [images, activeCategory]);

  const { visibleItems, hasMore, loaderRef } = useInfiniteScroll(filteredImages, 12);

  if (loading) {
    return (
      <div className="py-20">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="break-inside-avoid mb-6 rounded-xl overflow-hidden bg-gray-200 dark:bg-dark-surface animate-pulse"
              style={{ height: `${250 + (i % 3) * 80}px` }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500">Failed to load gallery. Please try again later.</p>
      </div>
    );
  }

  return (
    <>
      <CategoryFilter active={activeCategory} onChange={setActiveCategory} images={images} />

      {filteredImages.length === 0 ? (
        <div className="text-center py-20">
          <p className="font-vibes text-gold text-3xl mb-2">Coming Soon</p>
          <p className="text-gray-500 dark:text-gray-400">
            {activeCategory === 'All'
              ? 'Gallery images will appear here once uploaded by the artist.'
              : `No ${activeCategory} designs uploaded yet. Check back soon!`}
          </p>
        </div>
      ) : (
        <>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
            {visibleItems.map((image, index) => (
              <GalleryCard
                key={image.id}
                image={image}
                index={index}
                onClick={() => setModalIndex(filteredImages.indexOf(image))}
                isLiked={isLiked(image.id)}
                onToggleLike={toggleLike}
              />
            ))}
          </div>

          {hasMore && (
            <div ref={loaderRef} className="flex justify-center py-8">
              <LoadingSpinner size="md" />
            </div>
          )}
        </>
      )}

      {modalIndex !== null && (
        <ImageModal
          images={filteredImages}
          currentIndex={modalIndex}
          onClose={() => setModalIndex(null)}
          onNavigate={setModalIndex}
        />
      )}
    </>
  );
}
