import { useState, useMemo } from 'react';
import GalleryCard from './GalleryCard';
import ImageModal from './ImageModal';
import CategoryFilter from './CategoryFilter';
import LoadingSpinner from '../ui/LoadingSpinner';
import { useFirestoreCollection } from '../../hooks/useFirestore';

export default function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [modalIndex, setModalIndex] = useState(null);

  const { documents: images, loading, error } = useFirestoreCollection('gallery', {
    orderByField: 'createdAt',
    orderDirection: 'desc',
  });

  const filteredImages = useMemo(() => {
    if (activeCategory === 'All') return images;
    return images.filter((img) => img.category === activeCategory);
  }, [images, activeCategory]);

  if (loading) {
    return <LoadingSpinner size="lg" className="py-20" />;
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
      <CategoryFilter active={activeCategory} onChange={setActiveCategory} />

      {filteredImages.length === 0 ? (
        <div className="text-center py-20">
          <p className="font-vibes text-gold text-3xl mb-2">Coming Soon</p>
          <p className="text-gray-500">
            {activeCategory === 'All'
              ? 'Gallery images will appear here once uploaded by the artist.'
              : `No ${activeCategory} designs uploaded yet. Check back soon!`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, index) => (
            <GalleryCard
              key={image.id}
              image={image}
              onClick={() => setModalIndex(index)}
            />
          ))}
        </div>
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
