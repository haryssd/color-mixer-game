import { primaryColors } from '../data/colors';

const descriptions: Record<string, string> = {
  Merah: 'Warna dasar yang cerah dan hangat!',
  Biru: 'Warna dasar yang sejuk seperti langit dan laut!',
  Kuning: 'Warna dasar yang ceria seperti matahari!',
};

function PrimerPage() {
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-10 border-4 sm:border-8 border-purple-400">
      <div className="bg-gradient-to-r from-yellow-200 to-orange-200 rounded-2xl sm:rounded-3xl p-3 sm:p-6 mb-4 sm:mb-8 border-2 sm:border-4 border-yellow-400 shadow-lg">
        <p className="text-center text-sm sm:text-xl md:text-2xl font-black text-purple-800">
          Warna Primer adalah warna dasar yang tidak boleh dihasilkan daripada campuran warna lain. Ada 3 warna primer: Merah,
          Biru, dan Kuning! 🎨
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
        {primaryColors.map((color) => (
          <div
            key={color.name}
            className="rounded-2xl sm:rounded-3xl border-4 sm:border-8 shadow-xl p-4 sm:p-6 flex flex-col items-center text-center transition-all hover:scale-105"
            style={{ backgroundColor: color.value, borderColor: '#333' }}
          >
            <span className="text-6xl sm:text-8xl mb-2 sm:mb-3">{color.emoji}</span>
            <span
              className="text-xl sm:text-2xl font-black mb-1 sm:mb-2"
              style={{ color: '#fff', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
            >
              {color.name}
            </span>
            <span
              className="text-sm sm:text-base font-bold"
              style={{ color: '#fff', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
            >
              {descriptions[color.name]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PrimerPage;
