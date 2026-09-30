import MixerGame from '../components/MixerGame';
import { primaryColors, secondaryMixingRules, secondaryReferenceCombos } from '../data/colors';

type SekunderPageProps = {
  onCorrectMix: () => void;
};

function SekunderPage({ onCorrectMix }: SekunderPageProps) {
  return (
    <MixerGame
      instructions="Warna Sekunder dibuat dengan mencampur 2 warna primer!"
      colors={primaryColors}
      mixingRules={secondaryMixingRules}
      referenceTitle="🌈 Apa Yang Boleh Kamu Hasilkan? 🌈"
      referenceCombos={secondaryReferenceCombos}
      onCorrectMix={onCorrectMix}
    />
  );
}

export default SekunderPage;
