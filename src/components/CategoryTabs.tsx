import { categories } from '../data/products';
import type { CategoryId } from '../types';

interface CategoryTabsProps {
  activeCategory: CategoryId;
  onCategoryChange: (categoryId: CategoryId) => void;
}

export const CategoryTabs = ({
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) => {
  return (
    <div className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hide">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
            activeCategory === category.id
              ? 'bg-[#e94560] text-white shadow-lg shadow-[#e94560]/30'
              : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
          }`}
        >
          <span>{category.icon}</span>
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  );
};
