import { Link } from 'react-router-dom';
import { categories } from '../data/products';

export const HomePage = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <span className="text-7xl mb-6 block">🍣</span>
        <h1 className="text-4xl font-bold text-white mb-4">
          SushiSwipe
        </h1>
        <p className="text-white/60 text-lg max-w-xs mx-auto">
          Свайпай и выбирай лучшие продукты для приготовления суши дома
        </p>
      </div>

      {/* How it works */}
      <div className="w-full max-w-sm mb-10">
        <h2 className="text-lg font-semibold text-white mb-4 text-center">
          Как это работает
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-white/5 rounded-2xl">
            <span className="text-2xl block mb-2">←</span>
            <span className="text-white/60 text-xs">Назад</span>
          </div>
          <div className="text-center p-3 bg-[#e94560]/20 rounded-2xl border border-[#e94560]/30">
            <span className="text-2xl block mb-2">↓</span>
            <span className="text-[#e94560] text-xs font-medium">В корзину</span>
          </div>
          <div className="text-center p-3 bg-white/5 rounded-2xl">
            <span className="text-2xl block mb-2">→</span>
            <span className="text-white/60 text-xs">Далее</span>
          </div>
        </div>
      </div>

      {/* Categories Preview */}
      <div className="w-full max-w-sm mb-10">
        <h2 className="text-lg font-semibold text-white mb-4 text-center">
          Категории
        </h2>
        <div className="flex justify-center gap-3">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex flex-col items-center gap-2 p-4 bg-white/5 rounded-2xl"
            >
              <span className="text-3xl">{cat.icon}</span>
              <span className="text-white/70 text-sm">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <Link
        to="/catalog"
        className="w-full max-w-sm py-4 px-8 bg-gradient-to-r from-[#e94560] to-[#ff6b6b] text-white text-lg font-bold rounded-2xl shadow-lg shadow-[#e94560]/30 hover:shadow-xl hover:shadow-[#e94560]/40 transition-all text-center"
      >
        Начать выбор
      </Link>
    </div>
  );
};
