import { CATEGORIES } from '../../utils/constants';

export default function CategoryFilter({ active, onChange, images = [] }) {
  const getCount = (cat) => {
    if (cat === 'All') return images.length;
    return images.filter((img) => img.category === cat).length;
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {CATEGORIES.map((cat) => {
        const count = getCount(cat);
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-1.5 ${
              active === cat
                ? 'bg-gold text-white shadow-md'
                : 'bg-white dark:bg-dark-surface text-gray-600 dark:text-gray-300 hover:bg-gold/10 hover:text-gold border border-gray-200 dark:border-gray-600'
            }`}
          >
            {cat}
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full min-w-[20px] text-center ${
                active === cat
                  ? 'bg-white/25 text-white'
                  : 'bg-gray-100 dark:bg-dark-card text-gray-500 dark:text-gray-400'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
