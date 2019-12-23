import React from 'react'
import { Example } from '../../components'
import { UseThemeHoverButton } from './useThemeHoverButton'

// eslint-disable-next-line import/no-webpack-loader-syntax
import UseThemeHoverButtonTxt from '!!raw-loader!./useThemeHoverButton.js'

export const UseThemeHoverExample = ({ isToggled }) => (<Example
  isToggled={ isToggled }
  headerText={ 'useThemeHover' }
  component={ <UseThemeHoverButton>useThemeHover Button</UseThemeHoverButton> }
  codeText={ UseThemeHoverButtonTxt }
/>)