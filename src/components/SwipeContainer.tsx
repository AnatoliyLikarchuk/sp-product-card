import { useState, useCallback } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
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
  const [isDragging, setIsDragging] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Плавное вращение при горизонтальном свайпе
  const rotate = useTransform(x, [-300, 0, 300], [-15, 0, 15]);

  // Масштаб следующей карточки зависит от движения текущей
  const nextCardScale = useTransform(
    x,
    [-300, 0, 300],
    [1, 0.92, 1]
  );
  const nextCardOpacity = useTransform(
    x,
    [-300, 0, 300],
    [1, 0.5, 1]
  );

  // Индикаторы свайпа
  const skipIndicatorOpacity = useTransform(x, [0, 100], [0, 1]);
  const backIndicatorOpacity = useTransform(x, [-100, 0], [1, 0]);
  const cartIndicatorOpacity = useTransform(y, [0, 100], [0, 1]);

  const currentProduct = products[currentIndex];
  const nextProduct = products[currentIndex + 1];

  const goToNext = useCallback(() => {
    if (currentIndex < products.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(products.length);
      if (onAllSwiped) onAllSwiped();
    }
  }, [currentIndex, products.length, onAllSwiped]);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    setIsDragging(false);

    const swipeThreshold = 80;
    const velocityThreshold = 400;

    const swipedRight = info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold;
    const swipedLeft = info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold;
    const swipedDown = info.offset.y > swipeThreshold || info.velocity.y > velocityThreshold;

    if (swipedDown) {
      // В корзину — вылет вниз
      addItem(currentProduct);
      animate(y, 800, {
        type: 'spring',
        stiffness: 400,
        damping: 30,
        onComplete: () => {
          goToNext();
          x.set(0);
          y.set(0);
        }
      });
    } else if (swipedRight) {
      // Пропустить — вылет вправо
      animate(x, 500, {
        type: 'spring',
        stiffness: 400,
        damping: 30,
        onComplete: () => {
          goToNext();
          x.set(0);
          y.set(0);
        }
      });
    } else if (swipedLeft) {
      // Назад — вылет влево
      animate(x, -500, {
        type: 'spring',
        stiffness: 400,
        damping: 30,
        onComplete: () => {
          goToNext();
          x.set(0);
          y.set(0);
        }
      });
    } else {
      // Вернуть на место
      animate(x, 0, { type: 'spring', stiffness: 500, damping: 30 });
      animate(y, 0, { type: 'spring', stiffness: 500, damping: 30 });
    }
  };

  const swipe = (direction: 'left' | 'right' | 'down') => {
    if (currentIndex >= products.length) return;

    if (direction === 'down') {
      addItem(currentProduct);
      animate(y, 800, {
        type: 'spring',
        stiffness: 400,
        damping: 30,
        onComplete: () => {
          goToNext();
          x.set(0);
          y.set(0);
        }
      });
    } else if (direction === 'right') {
      animate(x, 500, {
        type: 'spring',
        stiffness: 400,
        damping: 30,
        onComplete: () => {
          goToNext();
          x.set(0);
          y.set(0);
        }
      });
    } else {
      animate(x, -500, {
        type: 'spring',
        stiffness: 400,
        damping: 30,
        onComplete: () => {
          goToNext();
          x.set(0);
          y.set(0);
        }
      });
    }
  };

  const canSwipe = currentIndex < products.length;

  return (
    <div className="flex flex-col flex-1">
      {/* Card Stack */}
      <div className="relative flex-1 flex items-center justify-center px-4">
        <div className="relative w-full max-w-sm aspect-[3/4]">
          {/* Next card (background) - реагирует на движение текущей */}
          {nextProduct && (
            <motion.div
              className="absolute inset-0"
              style={{ scale: nextCardScale, opacity: nextCardOpacity }}
            >
              <ProductCard product={nextProduct} />
            </motion.div>
          )}

          {/* Current card */}
          {currentProduct && (
            <motion.div
              key={currentProduct.id}
              className="absolute inset-0 cursor-grab active:cursor-grabbing touch-none"
              style={{ x, y, rotate }}
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.9}
              dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              {/* Swipe Indicators - появляются при свайпе */}
              {isDragging && (
                <>
                  {/* Skip indicator (right) */}
                  <motion.div
                    className="absolute top-6 right-6 z-10 bg-blue-500/90 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg"
                    style={{ opacity: skipIndicatorOpacity }}
                  >
                    ПРОПУСТИТЬ →
                  </motion.div>

                  {/* Back indicator (left) */}
                  <motion.div
                    className="absolute top-6 left-6 z-10 bg-gray-500/90 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg"
                    style={{ opacity: backIndicatorOpacity }}
                  >
                    ← НАЗАД
                  </motion.div>

                  {/* Cart indicator (down) */}
                  <motion.div
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 bg-[#e94560]/90 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-2"
                    style={{ opacity: cartIndicatorOpacity }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    В КОРЗИНУ
                  </motion.div>
                </>
              )}

              <ProductCard product={currentProduct} />
            </motion.div>
          )}

          {/* Empty State */}
          {currentIndex >= products.length && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <span className="text-6xl mb-4">🎉</span>
              <h3 className="text-xl font-bold text-white mb-2">
                Все товары просмотрены!
              </h3>
              <p className="text-white/60 text-sm">
                Выберите другую категорию или перейдите в корзину
              </p>
            </motion.div>
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
