import { app } from './app'
import { components } from './components'
import { example } from './example'
import { display } from './display'
import { join } from './join'
import { padding, margin, flex, layout } from './layout'
import { setDefaultTheme } from 're-theme'

export const theme = setDefaultTheme({
  app,
  components,
  display,
  example,
  flex,
  join,
  layout,
  margin,
  padding,
})
