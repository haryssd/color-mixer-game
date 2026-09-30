import { useState } from 'react';
import type { ColorType, MixResult, ReferenceCombo } from '../types';

type MixerGameProps = {
  instructions?: string;
  colors: ColorType[];
  mixingRules: Record<string, MixResult>;
  referenceTitle: string;
  referenceCombos: ReferenceCombo[];
  onCorrectMix: () => void;
};

function MixerGame({
  instructions,
  colors,
  mixingRules,
  referenceTitle,
  referenceCombos,
  onCorrectMix,
}: MixerGameProps) {
  const [dropZone1, setDropZone1] = useState<ColorType | null>(null);
  const [dropZone2, setDropZone2] = useState<ColorType | null>(null);
  const [resultColor, setResultColor] = useState<string | null>(null);
  const [resultText, setResultText] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

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
      setResultText('Pilih 2 warna dahulu!');
      setResultColor(null);
      return;
    }

    const key = `${dropZone1.name}-${dropZone2.name}`;
    const mixture = mixingRules[key];

    if (mixture) {
      setResultColor(mixture.result);
      setResultText(`${dropZone1.emoji} + ${dropZone2.emoji} = ${mixture.emoji} ${mixture.name}!`);
      setShowSuccess(true);
      onCorrectMix();
      setTimeout(() => setShowSuccess(false), 2500);
    } else if (dropZone1.name === dropZone2.name) {
      setResultColor(dropZone1.value);
      setResultText(`${dropZone1.emoji} + ${dropZone2.emoji} = ${dropZone1.emoji} ${dropZone1.name}!`);
    } else {
      setResultText(`Hmm... cuba warna lain!`);
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
    <>
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-10 mb-4 sm:mb-6 border-4 sm:border-8 border-purple-400">
        <div className="bg-gradient-to-r from-yellow-200 to-orange-200 rounded-2xl sm:rounded-3xl p-3 sm:p-6 mb-4 sm:mb-8 border-2 sm:border-4 border-yellow-400 shadow-lg">
          <div className="text-center text-xs sm:text-2xl md:text-3xl font-black text-purple-800 space-y-1 sm:space-y-0">
            <div className="sm:inline">1️⃣ Pilih satu warna</div>
            <div className="sm:inline sm:before:content-['_→_']">2️⃣ Pilih warna lain</div>
            <div className="sm:inline sm:before:content-['_→_']">3️⃣ Tekan CAMPUR!</div>
          </div>
          {instructions && (
            <p className="text-center text-xs sm:text-base font-bold text-purple-700 mt-2 sm:mt-3">
              {instructions}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mb-4 sm:mb-8">
          <div className="text-center w-full sm:w-auto">
            <p className="text-lg sm:text-2xl font-black text-purple-700 mb-2 sm:mb-3">Warna Pertama</p>
            <div
              className="w-36 h-36 sm:w-48 sm:h-48 mx-auto rounded-2xl sm:rounded-3xl border-4 sm:border-8 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 shadow-xl"
              style={{
                backgroundColor: dropZone1 ? dropZone1.value : '#f8f8f8',
                borderColor: dropZone1 ? dropZone1.value : '#ccc',
              }}
            >
              {dropZone1 ? (
                <>
                  <span className="text-5xl sm:text-7xl mb-1 sm:mb-2">{dropZone1.emoji}</span>
                  <span
                    className="text-lg sm:text-2xl font-bold"
                    style={{
                      color: '#fff',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                    }}
                  >
                    {dropZone1.name}
                  </span>
                </>
              ) : (
                <span className="text-6xl sm:text-8xl">❓</span>
              )}
            </div>
          </div>

          <div className="flex items-center">
            <span className="text-5xl sm:text-8xl font-black text-purple-600 animate-pulse">+</span>
          </div>

          <div className="text-center w-full sm:w-auto">
            <p className="text-lg sm:text-2xl font-black text-purple-700 mb-2 sm:mb-3">Warna Kedua</p>
            <div
              className="w-36 h-36 sm:w-48 sm:h-48 mx-auto rounded-2xl sm:rounded-3xl border-4 sm:border-8 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 shadow-xl"
              style={{
                backgroundColor: dropZone2 ? dropZone2.value : '#f8f8f8',
                borderColor: dropZone2 ? dropZone2.value : '#ccc',
              }}
            >
              {dropZone2 ? (
                <>
                  <span className="text-5xl sm:text-7xl mb-1 sm:mb-2">{dropZone2.emoji}</span>
                  <span
                    className="text-lg sm:text-2xl font-bold"
                    style={{
                      color: '#fff',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                    }}
                  >
                    {dropZone2.name}
                  </span>
                </>
              ) : (
                <span className="text-6xl sm:text-8xl">❓</span>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-8 max-w-4xl mx-auto">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => {
                if (!dropZone1) selectColor(color, 1);
                else if (!dropZone2) selectColor(color, 2);
              }}
              className="h-20 sm:h-28 rounded-xl sm:rounded-2xl transition-all hover:scale-110 active:scale-95 shadow-xl font-black text-base sm:text-xl flex flex-col items-center justify-center gap-1 sm:gap-2"
              style={{
                backgroundColor: color.value,
                borderWidth: '4px',
                borderColor: '#333',
                color: '#FFF',
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              }}
            >
              <span className="text-2xl sm:text-4xl">{color.emoji}</span>
              <span className="text-xs sm:text-base">{color.name}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-8">
          <button
            onClick={mixColors}
            className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white px-8 py-4 sm:px-16 sm:py-6 rounded-2xl sm:rounded-3xl text-2xl sm:text-4xl font-black shadow-2xl hover:scale-105 transition-all active:scale-95 w-full"
            style={{ borderWidth: '4px', borderColor: '#166534' }}
          >
            🧪 CAMPUR! 🧪
          </button>
          <button
            onClick={clearAll}
            className="bg-gradient-to-r from-red-400 via-orange-500 to-red-600 text-white px-8 py-4 sm:px-12 sm:py-6 rounded-2xl sm:rounded-3xl text-xl sm:text-3xl font-black shadow-2xl hover:scale-105 transition-all active:scale-95 flex items-center justify-center gap-2 sm:gap-3 w-full"
            style={{ borderWidth: '4px', borderColor: '#991b1b' }}
          >
            🔄 MULA SEMULA
          </button>
        </div>

        {resultColor && (
          <div className="relative">
            {showSuccess && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <span className="text-6xl sm:text-8xl animate-spin">✨</span>
              </div>
            )}
            <div
              className="w-full min-h-32 sm:min-h-48 rounded-2xl sm:rounded-3xl border-4 sm:border-8 border-purple-600 flex items-center justify-center transition-all duration-700 shadow-2xl p-4 sm:p-6"
              style={{ backgroundColor: resultColor }}
            >
              <div className="bg-white bg-opacity-95 px-4 py-3 sm:px-8 sm:py-6 rounded-xl sm:rounded-2xl shadow-lg border-2 sm:border-4 border-purple-400">
                <p className="text-xl sm:text-3xl md:text-4xl font-black text-center text-purple-800">{resultText}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 border-4 sm:border-8 border-pink-400">
        <h2 className="text-2xl sm:text-3xl font-black text-purple-700 mb-4 sm:mb-6 text-center">{referenceTitle}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm sm:text-lg font-bold">
          {referenceCombos.map((combo) => (
            <div
              key={`${combo.left.name}-${combo.right.name}`}
              className="bg-gradient-to-r from-purple-200 to-purple-300 p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 sm:border-4 border-purple-400"
            >
              {combo.left.emoji} {combo.left.name} + {combo.right.emoji} {combo.right.name} = {combo.result.emoji}{' '}
              {combo.result.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MixerGame;
