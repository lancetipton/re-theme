export * from './useTheme'
export * from './useStyles'

import { nativeThemeHook } from './nativeThemeHook'

export {
  nativeThemeHook as useThemeActive,
  nativeThemeHook as useThemeFocus,
  nativeThemeHook as useThemeHover,
}
