import { useState, useMemo } from 'react';
import { CategoryTabs } from '../components/CategoryTabs';
import { SwipeContainer } from '../components/SwipeContainer';
import { getProductsByCategory } from '../data/products';
import type { CategoryId } from '../types';

export const CatalogPage = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('seaweed');

  const products = useMemo(
    () => getProductsByCategory(activeCategory),
    [activeCategory]
  );

  return (
    <div className="flex-1 flex flex-col">
      {/* Category Tabs */}
      <CategoryTabs
        activeCategory={activeCategory}
        onCategoryChange={(id) => setActiveCategory(id)}
      />

      {/* Swipe Cards */}
      <SwipeContainer
        key={activeCategory}
        products={products}
      />
    </div>
  );
};
