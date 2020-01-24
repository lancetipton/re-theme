import { ReThemeContext, ReThemeProvider } from './context'
import {
  getSize,
  getSizeMap,
  getMergeSizes,
  setSizes,
  useDimensions,
} from './dimensions'
import { Dimensions } from "ReDimensions"

import {
  addThemeEvent,
  fireThemeEvent,
  getDefaultTheme,
  removeThemeEvent,
  setDefaultTheme,
  withTheme,
} from './theme'

import {
  useTheme,
  useThemeActive,
  useThemeFocus,
  useThemeHover,
} from 'ReHooks'

export {

  // Dimensions exports
  Dimensions,
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
  useTheme,
  useThemeActive,
  useThemeFocus,
  useThemeHover,

  // Context Exports
  ReThemeContext,
  ReThemeProvider,

}