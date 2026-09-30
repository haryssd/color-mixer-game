import type { ColorType, MixResult, ReferenceCombo } from '../types';

export const primaryColors: ColorType[] = [
  { name: 'Merah', value: '#FF0000', emoji: '🔴' },
  { name: 'Biru', value: '#0000FF', emoji: '🔵' },
  { name: 'Kuning', value: '#FFD700', emoji: '💛' },
];

export const secondaryColors: ColorType[] = [
  { name: 'Ungu', value: '#9932CC', emoji: '💜' },
  { name: 'Jingga', value: '#FF8C00', emoji: '🟠' },
  { name: 'Hijau', value: '#32CD32', emoji: '💚' },
];

export const secondaryMixingRules: Record<string, MixResult> = {
  'Merah-Biru': { result: '#9932CC', name: 'Ungu', emoji: '💜' },
  'Biru-Merah': { result: '#9932CC', name: 'Ungu', emoji: '💜' },
  'Merah-Kuning': { result: '#FF8C00', name: 'Jingga', emoji: '🟠' },
  'Kuning-Merah': { result: '#FF8C00', name: 'Jingga', emoji: '🟠' },
  'Biru-Kuning': { result: '#32CD32', name: 'Hijau', emoji: '💚' },
  'Kuning-Biru': { result: '#32CD32', name: 'Hijau', emoji: '💚' },
};

export const secondaryReferenceCombos: ReferenceCombo[] = [
  { left: primaryColors[0], right: primaryColors[1], result: secondaryMixingRules['Merah-Biru'] },
  { left: primaryColors[0], right: primaryColors[2], result: secondaryMixingRules['Merah-Kuning'] },
  { left: primaryColors[1], right: primaryColors[2], result: secondaryMixingRules['Biru-Kuning'] },
];

export const tertiaryColors: ColorType[] = [...primaryColors, ...secondaryColors];

export const tertiaryMixingRules: Record<string, MixResult> = {
  'Merah-Jingga': { result: '#FF4500', name: 'Merah-Jingga', emoji: '🔶' },
  'Jingga-Merah': { result: '#FF4500', name: 'Merah-Jingga', emoji: '🔶' },
  'Kuning-Jingga': { result: '#FFAE42', name: 'Kuning-Jingga', emoji: '🧡' },
  'Jingga-Kuning': { result: '#FFAE42', name: 'Kuning-Jingga', emoji: '🧡' },
  'Kuning-Hijau': { result: '#9ACD32', name: 'Kuning-Hijau', emoji: '🍏' },
  'Hijau-Kuning': { result: '#9ACD32', name: 'Kuning-Hijau', emoji: '🍏' },
  'Biru-Hijau': { result: '#008080', name: 'Biru-Hijau', emoji: '🌊' },
  'Hijau-Biru': { result: '#008080', name: 'Biru-Hijau', emoji: '🌊' },
  'Biru-Ungu': { result: '#6A5ACD', name: 'Biru-Ungu', emoji: '🔮' },
  'Ungu-Biru': { result: '#6A5ACD', name: 'Biru-Ungu', emoji: '🔮' },
  'Merah-Ungu': { result: '#C71585', name: 'Merah-Ungu', emoji: '🌺' },
  'Ungu-Merah': { result: '#C71585', name: 'Merah-Ungu', emoji: '🌺' },
};

export const tertiaryReferenceCombos: ReferenceCombo[] = [
  { left: primaryColors[0], right: secondaryColors[1], result: tertiaryMixingRules['Merah-Jingga'] },
  { left: primaryColors[2], right: secondaryColors[1], result: tertiaryMixingRules['Kuning-Jingga'] },
  { left: primaryColors[2], right: secondaryColors[2], result: tertiaryMixingRules['Kuning-Hijau'] },
  { left: primaryColors[1], right: secondaryColors[2], result: tertiaryMixingRules['Biru-Hijau'] },
  { left: primaryColors[1], right: secondaryColors[0], result: tertiaryMixingRules['Biru-Ungu'] },
  { left: primaryColors[0], right: secondaryColors[0], result: tertiaryMixingRules['Merah-Ungu'] },
];
