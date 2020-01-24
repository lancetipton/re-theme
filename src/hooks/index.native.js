export * from './useTheme'

const noOp = () => {}
const noHook = (arg1) => { return [ undefined, arg1, noOp ] }

export {
  noHook as useThemeActive,
  noHook as useThemeFocus,
  noHook as useThemeHover,
}