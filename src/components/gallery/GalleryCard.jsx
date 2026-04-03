import { FaHeart, FaRegHeart } from 'react-icons/fa';
import BlurImage from '../ui/BlurImage';

export default function GalleryCard({ image, onClick, index = 0, isLiked, onToggleLike }) {
  const handleLike = (e) => {
    e.stopPropagation();
    onToggleLike?.(image.id);
  };

  return (
    <div
      onClick={onClick}
      className="scroll-reveal-scale group cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-dark-card break-inside-avoid mb-6"
      style={{ transitionDelay: `${(index % 6) * 0.1}s` }}
    >
      <div className="relative overflow-hidden">
        <BlurImage
          src={image.imageUrl}
          alt={image.title}
          className="w-full aspect-auto min-h-[250px] group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-maroon/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Heart / Save button */}
        <button
          onClick={handleLike}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-300 z-10 ${
            isLiked
              ? 'bg-red-500/90 text-white scale-100'
              : 'bg-black/30 text-white/80 opacity-0 group-hover:opacity-100 hover:bg-red-500/90 hover:text-white'
          } hover:scale-110 active:scale-95`}
          aria-label={isLiked ? 'Unlike' : 'Like'}
        >
          {isLiked ? <FaHeart size={14} /> : <FaRegHeart size={14} />}
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="font-playfair text-white font-semibold text-lg">{image.title}</h3>
          <p className="text-gold-light text-sm">{image.category}</p>
        </div>
      </div>
    </div>
  );
}
