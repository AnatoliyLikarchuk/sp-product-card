import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

export const CartPage = () => {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  const totalPrice = getTotalPrice();

  if (items.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <span className="text-6xl mb-4">🛒</span>
        <h2 className="text-xl font-bold text-white mb-2">Корзина пуста</h2>
        <p className="text-white/60 text-center mb-6">
          Свайпните вниз на понравившийся товар, чтобы добавить его в корзину
        </p>
        <Link
          to="/catalog"
          className="px-6 py-3 bg-[#e94560] text-white font-medium rounded-xl hover:bg-[#d13a54] transition-colors"
        >
          Перейти в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <h1 className="text-xl font-bold text-white">Корзина</h1>
        <button
          onClick={clearCart}
          className="text-sm text-[#e94560] hover:text-[#ff6b6b] transition-colors"
        >
          Очистить
        </button>
      </div>

      {/* Items List */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-4">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="flex gap-4 p-3 bg-white/5 rounded-2xl"
            >
              {/* Image */}
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 rounded-xl object-cover"
              />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium text-sm truncate">
                  {product.name}
                </h3>
                <p className="text-white/50 text-xs mt-1">{product.weight}</p>
                <p className="text-[#e94560] font-bold mt-2">
                  {product.price} ₴
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex flex-col items-end justify-between">
                <button
                  onClick={() => removeItem(product.id)}
                  className="text-white/40 hover:text-[#e94560] transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/10 text-white/70 hover:bg-white/20 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-white w-6 text-center">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/10 text-white/70 hover:bg-white/20 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 p-4 bg-[#1a1a2e]/95 backdrop-blur-sm border-t border-white/10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-white/60">Итого:</span>
          <span className="text-2xl font-bold text-white">{totalPrice} ₴</span>
        </div>
        <button className="w-full py-4 bg-gradient-to-r from-[#e94560] to-[#ff6b6b] text-white font-bold rounded-xl shadow-lg shadow-[#e94560]/30 hover:shadow-xl hover:shadow-[#e94560]/40 transition-all">
          Оформить заказ
        </button>
      </div>
    </div>
  );
};
