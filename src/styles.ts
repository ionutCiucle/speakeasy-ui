export const Color = {
  Jonquill: '#ffc914',
  RaisinBlack: '#2e282a',
  RaisinBlackLight: '#908c8d',
  KellyGreen: '#76b041',
  Vetrdgris: '#17bebb',
  Flame: '#e4572e',
  White: '#ffffff',
  Cream: '#ede8df',
  Gold: '#b8963e',
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
