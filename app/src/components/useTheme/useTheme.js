import React from 'react'
import { Example } from '../../components'
import { UseThemeButton } from './useThemeButton'

// eslint-disable-next-line import/no-webpack-loader-syntax
import UseThemeButtonTxt from '!!raw-loader!./useThemeButton.js'

export const UseThemeExample = ({ isToggled }) => (<Example
  isToggled={ isToggled }
  headerText={ 'useTheme' }
  component={ <UseThemeButton>useTheme Button</UseThemeButton> }
  codeText={ UseThemeButtonTxt }
/>)