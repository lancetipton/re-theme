import React from 'react'
import { Example } from '../../components'
import { UseThemeActiveButton } from './useThemeActiveButton'

// eslint-disable-next-line import/no-webpack-loader-syntax
import UseThemeActiveButtonTxt from '!!raw-loader!./useThemeActiveButton.js'

export const UseThemeActiveExample = ({ isToggled }) => (<Example
  isToggled={ isToggled }
  headerText={ 'useThemeActive' }
  component={ <UseThemeActiveButton >useThemeActive Button</UseThemeActiveButton> }
  codeText={ UseThemeActiveButtonTxt }
/>)
