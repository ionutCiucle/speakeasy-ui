export const Color = {
  Jonquill: '#ffc914',
  RaisinBlack: '#2e282a',
  RaisinBlackLight: '#908c8d',
  KellyGreen: '#76b041',
  Vetrdgris: '#17bebb',
  Flame: '#e4572e',
  Black: '#000000',
  White: '#ffffff',
  // Speakeasy brand palette
  Cream: '#F5F0E8',
  Gold: '#C9A84C',
  Espresso: '#2D2416',
  WarmBrown: '#8B7355',
  Ivory: '#FDFAF5',
  Sand: '#D4C9B0',
};

export const flex = (
  flexDirection: 'row' | 'column',
  justifyContent:
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'center',
  alignItems: 'flex-start' | 'flex-end' | 'stretch' | 'center',
) => ({
  flexDirection,
  justifyContent,
  alignItems,
});
