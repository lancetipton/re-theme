import { setRNDimensions } from './dimensions/webDimensions'
import { ReThemeContext, ReThemeProvider } from './context'
import { setRNPlatform } from './context/platform'
import { helpers } from './helpers'
import {
  getSize,
  getSizeMap,
  getMergeSizes,
  setSizes,
  useDimensions,
} from './dimensions'

import {
  addThemeEvent,
  fireThemeEvent,
  getDefaultTheme,
  removeThemeEvent,
  setDefaultTheme,
  withTheme,
} from './theme'

import {
  useStyles,
  useTheme,
  useThemeActive,
  useThemeFocus,
  useThemeHover,
} from 'ReHooks'

export {
  // Dimensions exports
  setRNDimensions,
  setRNPlatform,
  getSize,
  getSizeMap,
  getMergeSizes,
  setSizes,
  useDimensions,
  // Theme exports
  addThemeEvent,
  fireThemeEvent,
  getDefaultTheme,
  removeThemeEvent,
  setDefaultTheme,
  withTheme,
  // Theme hooks
  useStyles,
  useTheme,
  useThemeActive,
  useThemeFocus,
  useThemeHover,
  // Context Exports
  ReThemeContext,
  ReThemeProvider,
  // Style Helpers
  helpers,
}