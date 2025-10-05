import { useState } from 'react';
import { Sparkles, Star } from 'lucide-react';

type ColorType = {
  name: string;
  value: string;
  emoji: string;
};

function App() {
  const [dropZone1, setDropZone1] = useState<ColorType | null>(null);
  const [dropZone2, setDropZone2] = useState<ColorType | null>(null);
  const [resultColor, setResultColor] = useState<string | null>(null);
  const [resultText, setResultText] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState<Array<{id: number, x: number, y: number}>>([]);

  const colors = [
    { name: 'Red', value: '#FF0000', emoji: '🔴' },
    { name: 'Blue', value: '#0000FF', emoji: '🔵' },
    { name: 'Yellow', value: '#FFD700', emoji: '💛' },
    { name: 'White', value: '#FFFFFF', emoji: '⚪' },
    { name: 'Black', value: '#1a1a1a', emoji: '⚫' },
  ];

  const mixingRules: Record<string, {result: string, name: string, emoji: string}> = {
    'Red-Blue': { result: '#9932CC', name: 'Purple', emoji: '💜' },
    'Blue-Red': { result: '#9932CC', name: 'Purple', emoji: '💜' },
    'Red-Yellow': { result: '#FF8C00', name: 'Orange', emoji: '🟠' },
    'Yellow-Red': { result: '#FF8C00', name: 'Orange', emoji: '🟠' },
    'Blue-Yellow': { result: '#32CD32', name: 'Green', emoji: '💚' },
    'Yellow-Blue': { result: '#32CD32', name: 'Green', emoji: '💚' },
    'White-Black': { result: '#808080', name: 'Grey', emoji: '🩶' },
    'Black-White': { result: '#808080', name: 'Grey', emoji: '🩶' },
    'Red-White': { result: '#FFB6C1', name: 'Pink', emoji: '🩷' },
    'White-Red': { result: '#FFB6C1', name: 'Pink', emoji: '🩷' },
    'Blue-White': { result: '#87CEEB', name: 'Light Blue', emoji: '💙' },
    'White-Blue': { result: '#87CEEB', name: 'Light Blue', emoji: '💙' },
    'Yellow-White': { result: '#FFFFE0', name: 'Light Yellow', emoji: '💛' },
    'White-Yellow': { result: '#FFFFE0', name: 'Light Yellow', emoji: '💛' },
    'Black-Red': { result: '#8B0000', name: 'Dark Red', emoji: '❤️' },
    'Red-Black': { result: '#8B0000', name: 'Dark Red', emoji: '❤️' },
    'Black-Blue': { result: '#000080', name: 'Dark Blue', emoji: '💙' },
    'Blue-Black': { result: '#000080', name: 'Dark Blue', emoji: '💙' },
  };

  const createStar = () => {
    const id = Date.now() + Math.random();
    const newStar = {
      id,
      x: Math.random() * 100,
      y: Math.random() * 100
    };
    setStars(prev => [...prev, newStar]);
    setTimeout(() => {
      setStars(prev => prev.filter(star => star.id !== id));
    }, 1000);
  };

  const selectColor = (color: ColorType, zone: number) => {
    if (zone === 1) {
      setDropZone1(color);
    } else {
      setDropZone2(color);
    }
    setShowSuccess(false);
  };

  const mixColors = () => {
    if (!dropZone1 || !dropZone2) {
      setResultText('Pick 2 colors first! 👆');
      setResultColor(null);
      return;
    }

    const key = `${dropZone1.name}-${dropZone2.name}`;
    const mixture = mixingRules[key];

    if (mixture) {
      setResultColor(mixture.result);
      setResultText(`${dropZone1.emoji} + ${dropZone2.emoji} = ${mixture.emoji} ${mixture.name}!`);
      setShowSuccess(true);
      setScore(score + 1);
      
      for (let i = 0; i < 5; i++) {
        setTimeout(() => createStar(), i * 100);
      }
      
      setTimeout(() => setShowSuccess(false), 2500);
    } else if (dropZone1.name === dropZone2.name) {
      setResultColor(dropZone1.value);
      setResultText(`${dropZone1.emoji} + ${dropZone2.emoji} = ${dropZone1.emoji} ${dropZone1.name}!`);
    } else {
      setResultText(`Hmm... try different colors! 🤔`);
      setResultColor('#D3D3D3');
    }
  };

  const clearAll = () => {
    setDropZone1(null);
    setDropZone2(null);
    setResultColor(null);
    setResultText('');
    setShowSuccess(false);
  };

return (
  <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 p-4">
    {/* Score - Fixed top-right corner */}
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-yellow-400 px-8 py-3 rounded-full border-4 border-yellow-600 shadow-lg">
        <div className="flex items-center gap-4">
          <p className="text-3xl font-black text-purple-800">⭐ {score}</p>
          {score > 0 && (
            <button
              onClick={() => setScore(0)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold transition-all hover:scale-110 active:scale-95"
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </div>

    <div className="max-w-5xl mx-auto">
      {stars.map(star => (
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

      <div className="text-center mb-6">
        <h1 className="text-6xl md:text-7xl font-black text-white mb-3 drop-shadow-lg" style={{
          textShadow: '4px 4px 0px #FF1493, 8px 8px 0px #9370DB'
        }}>
          🎨 COLOR MIXER! 🎨
        </h1>
        <p className="text-3xl font-bold text-white drop-shadow-md">Mix colors and make magic! ✨</p>
        <p className="text-xl font-bold text-purple-800 mt-2 bg-white bg-opacity-80 inline-block px-6 py-2 rounded-full">
          by Teacher Nisrina
        </p>
      </div>

        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 mb-6 border-8 border-purple-400">
          <div className="bg-gradient-to-r from-yellow-200 to-orange-200 rounded-3xl p-6 mb-8 border-4 border-yellow-400 shadow-lg">
            <p className="text-center text-2xl md:text-3xl font-black text-purple-800">
              1️⃣ Pick a color → 2️⃣ Pick another color → 3️⃣ Press MIX!
            </p>
          </div>

          <div className="flex flex-row justify-center items-center gap-6 mb-8">
            <div className="text-center">
              <p className="text-2xl font-black text-purple-700 mb-3">First Color 👇</p>
              <div
                className="w-48 h-48 rounded-3xl border-8 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 shadow-xl"
                style={{
                  backgroundColor: dropZone1 ? dropZone1.value : '#f8f8f8',
                  borderColor: dropZone1 ? dropZone1.value : '#ccc'
                }}
              >
                {dropZone1 ? (
                  <>
                    <span className="text-7xl mb-2">{dropZone1.emoji}</span>
                    <span className="text-2xl font-bold" style={{
                      color: dropZone1.name === 'White' ? '#333' : '#fff',
                      textShadow: dropZone1.name === 'White' ? 'none' : '2px 2px 4px rgba(0,0,0,0.5)'
                    }}>{dropZone1.name}</span>
                  </>
                ) : (
                  <span className="text-8xl">❓</span>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <span className="text-8xl font-black text-purple-600 animate-pulse">+</span>
            </div>

            <div className="text-center">
              <p className="text-2xl font-black text-purple-700 mb-3">Second Color 👇</p>
              <div
                className="w-48 h-48 rounded-3xl border-8 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 shadow-xl"
                style={{
                  backgroundColor: dropZone2 ? dropZone2.value : '#f8f8f8',
                  borderColor: dropZone2 ? dropZone2.value : '#ccc'
                }}
              >
                {dropZone2 ? (
                  <>
                    <span className="text-7xl mb-2">{dropZone2.emoji}</span>
                    <span className="text-2xl font-bold" style={{
                      color: dropZone2.name === 'White' ? '#333' : '#fff',
                      textShadow: dropZone2.name === 'White' ? 'none' : '2px 2px 4px rgba(0,0,0,0.5)'
                    }}>{dropZone2.name}</span>
                  </>
                ) : (
                  <span className="text-8xl">❓</span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-8 max-w-4xl mx-auto">
            {colors.map((color) => (
              <button
                key={color.name}
                onClick={() => {
                  if (!dropZone1) selectColor(color, 1);
                  else if (!dropZone2) selectColor(color, 2);
                }}
                className="h-28 rounded-2xl transition-all hover:scale-110 active:scale-95 shadow-xl font-black text-xl flex flex-col items-center justify-center gap-2"
                style={{
                  backgroundColor: color.value,
                  borderWidth: '6px',
                  borderColor: '#333',
                  color: color.name === 'White' ? '#000' : '#FFF',
                  textShadow: color.name === 'White' ? 'none' : '2px 2px 4px rgba(0,0,0,0.8)'
                }}
              >
                <span className="text-4xl">{color.emoji}</span>
                <span>{color.name}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
            <button
              onClick={mixColors}
              className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white px-16 py-6 rounded-3xl text-4xl font-black shadow-2xl hover:scale-110 transition-all active:scale-95"
              style={{ borderWidth: '6px', borderColor: '#166534' }}
            >
              🧪 MIX IT! 🧪
            </button>
            <button
              onClick={clearAll}
              className="bg-gradient-to-r from-red-400 via-orange-500 to-red-600 text-white px-12 py-6 rounded-3xl text-3xl font-black shadow-2xl hover:scale-110 transition-all active:scale-95 flex items-center justify-center gap-3"
              style={{ borderWidth: '6px', borderColor: '#991b1b' }}
            >
              🔄 START OVER
            </button>
          </div>

          {resultColor && (
            <div className="relative">
              {showSuccess && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                  <Sparkles size={120} className="text-yellow-400 animate-spin" />
                </div>
              )}
              <div
                className="w-full min-h-48 rounded-3xl border-8 border-purple-600 flex items-center justify-center transition-all duration-700 shadow-2xl p-6"
                style={{ backgroundColor: resultColor }}
              >
                <div className="bg-white bg-opacity-95 px-8 py-6 rounded-2xl shadow-lg border-4 border-purple-400">
                  <p className="text-3xl md:text-4xl font-black text-center text-purple-800">{resultText}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-6 border-8 border-pink-400">
          <h2 className="text-3xl font-black text-purple-700 mb-6 text-center">
            🌈 What Can You Make? 🌈
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg font-bold">
            <div className="bg-gradient-to-r from-purple-200 to-purple-300 p-4 rounded-2xl border-4 border-purple-400">
              🔴 Red + 🔵 Blue = 💜 Purple
            </div>
            <div className="bg-gradient-to-r from-orange-200 to-orange-300 p-4 rounded-2xl border-4 border-orange-400">
              🔴 Red + 💛 Yellow = 🟠 Orange
            </div>
            <div className="bg-gradient-to-r from-green-200 to-green-300 p-4 rounded-2xl border-4 border-green-400">
              🔵 Blue + 💛 Yellow = 💚 Green
            </div>
            <div className="bg-gradient-to-r from-pink-200 to-pink-300 p-4 rounded-2xl border-4 border-pink-400">
              🔴 Red + ⚪ White = 🩷 Pink
            </div>
            <div className="bg-gradient-to-r from-gray-200 to-gray-300 p-4 rounded-2xl border-4 border-gray-400">
              ⚪ White + ⚫ Black = 🩶 Grey
            </div>
            <div className="bg-gradient-to-r from-blue-200 to-blue-300 p-4 rounded-2xl border-4 border-blue-400">
              🔵 Blue + ⚪ White = 💙 Light Blue
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;