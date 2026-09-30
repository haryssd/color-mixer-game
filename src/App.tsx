import { useState } from 'react';
import { Star } from 'lucide-react';
import PrimerPage from './pages/PrimerPage';
import SekunderPage from './pages/SekunderPage';
import TertierPage from './pages/TertierPage';

type Page = 'primer' | 'sekunder' | 'tertier';

const tabs: { id: Page; label: string }[] = [
  { id: 'primer', label: '🔴 Warna Primer' },
  { id: 'sekunder', label: '🟣 Warna Sekunder' },
  { id: 'tertier', label: '🌈 Warna Tertier' },
];

function App() {
  const [page, setPage] = useState<Page>('primer');
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const createStar = () => {
    const id = Date.now() + Math.random();
    const newStar = {
      id,
      x: Math.random() * 100,
      y: Math.random() * 100,
    };
    setStars((prev) => [...prev, newStar]);
    setTimeout(() => {
      setStars((prev) => prev.filter((star) => star.id !== id));
    }, 1000);
  };

  const handleCorrectMix = () => {
    setScore((s) => s + 1);
    for (let i = 0; i < 5; i++) {
      setTimeout(() => createStar(), i * 100);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 p-2 sm:p-4">
      {/* Score - Fixed top-right corner */}
      <div className="fixed top-2 right-2 sm:top-4 sm:right-4 z-50">
        <div className="bg-yellow-400 px-4 py-2 sm:px-8 sm:py-3 rounded-full border-2 sm:border-4 border-yellow-600 shadow-lg">
          <div className="flex items-center gap-2 sm:gap-4">
            <p className="text-xl sm:text-3xl font-black text-purple-800">⭐ {score}</p>
            {score > 0 && (
              <button
                onClick={() => setScore(0)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-all hover:scale-110 active:scale-95"
              >
                Set Semula
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        {stars.map((star) => (
          <div
            key={star.id}
            className="fixed pointer-events-none animate-ping"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
            }}
          >
            <Star className="text-yellow-400" size={40} fill="currentColor" />
          </div>
        ))}

        <div className="text-center mb-4 sm:mb-6 pt-16 sm:pt-4">
          <h1
            className="text-4xl sm:text-6xl md:text-7xl font-black text-white mb-2 sm:mb-3 drop-shadow-lg"
            style={{
              textShadow: '3px 3px 0px #FF1493, 6px 6px 0px #9370DB',
            }}
          >
            🎨 RONAMIX! 🎨
          </h1>
          <p className="text-sm sm:text-xl font-bold text-purple-800 mt-2 bg-white bg-opacity-80 inline-block px-4 py-1 sm:px-6 sm:py-2 rounded-full">
            oleh Cikgu Nisrina
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setPage(tab.id)}
              className={`px-4 py-3 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-xl font-black shadow-xl transition-all hover:scale-105 active:scale-95 border-2 sm:border-4 ${
                page === tab.id
                  ? 'bg-white text-purple-800 border-purple-600'
                  : 'bg-purple-800 bg-opacity-40 text-white border-white border-opacity-60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {page === 'primer' && <PrimerPage />}
        {page === 'sekunder' && <SekunderPage onCorrectMix={handleCorrectMix} />}
        {page === 'tertier' && <TertierPage onCorrectMix={handleCorrectMix} />}
      </div>
    </div>
  );
}

export default App;
