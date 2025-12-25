import { Link, useLocation } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

export const Header = () => {
  const location = useLocation();
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <header className="sticky top-0 z-50 bg-[#1a1a2e]/95 backdrop-blur-sm border-b border-white/10">
      <div className="flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🍣</span>
          <span className="text-lg font-bold text-white">SushiSwipe</span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            to="/catalog"
            className={`text-sm font-medium transition-colors ${
              location.pathname === '/catalog'
                ? 'text-[#e94560]'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Каталог
          </Link>

          <Link
            to="/cart"
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[#e94560] rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};
