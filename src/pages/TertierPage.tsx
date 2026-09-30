import MixerGame from '../components/MixerGame';
import { tertiaryColors, tertiaryMixingRules, tertiaryReferenceCombos } from '../data/colors';

type TertierPageProps = {
  onCorrectMix: () => void;
};

function TertierPage({ onCorrectMix }: TertierPageProps) {
  return (
    <MixerGame
      instructions="Warna Tertier dibuat dengan mencampur warna primer dan warna sekunder yang bersebelahan!"
      colors={tertiaryColors}
      mixingRules={tertiaryMixingRules}
      referenceTitle="🌈 Apa Yang Boleh Kamu Hasilkan? 🌈"
      referenceCombos={tertiaryReferenceCombos}
      onCorrectMix={onCorrectMix}
    />
  );
}

export default TertierPage;
