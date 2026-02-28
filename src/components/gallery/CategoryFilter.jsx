import { CATEGORIES } from '../../utils/constants';

export default function CategoryFilter({ active, onChange }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            active === cat
              ? 'bg-gold text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-gold/10 hover:text-gold border border-gray-200'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
