import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="relative w-full h-full bg-gradient-to-b from-[#2a2a4a] to-[#1a1a2e] rounded-3xl overflow-hidden shadow-2xl">
      {/* Product Image */}
      <div className="relative h-[55%] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-transparent to-transparent" />

        {/* Price Badge */}
        <div className="absolute top-4 right-4 px-4 py-2 bg-[#e94560] rounded-full shadow-lg">
          <span className="text-white font-bold text-lg">
            {product.price} ₴
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h2 className="text-2xl font-bold text-white mb-2">{product.name}</h2>
        <p className="text-white/60 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center gap-2 text-white/50 text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
          </svg>
          <span>{product.weight}</span>
        </div>

        {/* Swipe Hints */}
        <div className="flex justify-center gap-8 mt-6 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2 text-white/40 text-xs">
            <span>←</span>
            <span>Назад</span>
          </div>
          <div className="flex items-center gap-2 text-[#e94560] text-xs font-medium">
            <span>↓</span>
            <span>В корзину</span>
          </div>
          <div className="flex items-center gap-2 text-white/40 text-xs">
            <span>Далее</span>
            <span>→</span>
          </div>
        </div>
      </div>
    </div>
  );
};
