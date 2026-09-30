export type ColorType = {
  name: string;
  value: string;
  emoji: string;
};

export type MixResult = {
  result: string;
  name: string;
  emoji: string;
};

export type ReferenceCombo = {
  left: ColorType;
  right: ColorType;
  result: MixResult;
};
