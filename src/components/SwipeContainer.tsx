import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import type { Product } from '../types';
import { ProductCard } from './ProductCard';
import { useCartStore } from '../store/cartStore';

interface SwipeContainerProps {
  products: Product[];
  onAllSwiped?: () => void;
}

export const SwipeContainer = ({ products, onAllSwiped }: SwipeContainerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitX, setExitX] = useState(0);
  const [exitY, setExitY] = useState(0);
  const addItem = useCartStore((state) => state.addItem);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);

  const currentProduct = products[currentIndex];
  const nextProduct = products[currentIndex + 1];

  const handleDragEnd = (_: any, info: PanInfo) => {
    const swipeThreshold = 100;
    const velocityThreshold = 500;

    const swipedRight = info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold;
    const swipedLeft = info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold;
    const swipedDown = info.offset.y > swipeThreshold || info.velocity.y > velocityThreshold;

    if (swipedDown) {
      // Add to cart
      setExitX(0);
      setExitY(1000);
      addItem(currentProduct);
      goToNext();
    } else if (swipedRight) {
      // Skip (next)
      setExitX(1000);
      setExitY(0);
      goToNext();
    } else if (swipedLeft) {
      // Go back (previous) or skip
      setExitX(-1000);
      setExitY(0);
      goToNext();
    }
  };

  const goToNext = () => {
    setTimeout(() => {
      if (currentIndex < products.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setExitX(0);
        setExitY(0);
      } else {
        setCurrentIndex(products.length);
        if (onAllSwiped) onAllSwiped();
      }
    }, 200);
  };

  const swipe = (direction: 'left' | 'right' | 'down') => {
    if (currentIndex >= products.length) return;

    if (direction === 'down') {
      setExitX(0);
      setExitY(1000);
      addItem(currentProduct);
    } else if (direction === 'right') {
      setExitX(1000);
      setExitY(0);
    } else {
      setExitX(-1000);
      setExitY(0);
    }
    goToNext();
  };

  const canSwipe = currentIndex < products.length;

  return (
    <div className="flex flex-col flex-1">
      {/* Card Stack */}
      <div className="relative flex-1 flex items-center justify-center px-4">
        <div className="relative w-full max-w-sm aspect-[3/4]">
          {/* Next card (background) */}
          {nextProduct && (
            <div className="absolute inset-0 scale-95 opacity-50">
              <ProductCard product={nextProduct} />
            </div>
          )}

          {/* Current card */}
          {currentProduct && (
            <motion.div
              key={currentProduct.id}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
              style={{ x, y, rotate, opacity }}
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={1}
              onDragEnd={handleDragEnd}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
              exit={{ x: exitX, y: exitY, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <ProductCard product={currentProduct} />
            </motion.div>
          )}

          {/* Empty State */}
          {currentIndex >= products.length && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <span className="text-6xl mb-4">🎉</span>
              <h3 className="text-xl font-bold text-white mb-2">
                Все товары просмотрены!
              </h3>
              <p className="text-white/60 text-sm">
                Выберите другую категорию или перейдите в корзину
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Counter */}
      {canSwipe && (
        <div className="text-center text-white/40 text-sm mb-2">
          {currentIndex + 1} / {products.length}
        </div>
      )}

      {/* Control Buttons */}
      <div className="flex items-center justify-center gap-6 py-6">
        <button
          onClick={() => swipe('left')}
          disabled={!canSwipe}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={() => swipe('down')}
          disabled={!canSwipe}
          className="flex items-center justify-center w-16 h-16 rounded-full bg-[#e94560] text-white shadow-lg shadow-[#e94560]/30 hover:bg-[#d13a54] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </button>

        <button
          onClick={() => swipe('right')}
          disabled={!canSwipe}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};
