import React from 'react'
import { Example } from '../../components'
import { UseThemeFocusInput } from './useThemeFocusInput'

// eslint-disable-next-line import/no-webpack-loader-syntax
import UseThemeFocusInputTxt from '!!raw-loader!./useThemeFocusInput.js'


export const UseThemeFocusExample = ({ isToggled }) => (<Example
  isToggled={ isToggled }
  headerText={ 'useThemeFocus' }
  component={ <UseThemeFocusInput title={ 'useThemeFocus Input' } /> }
  codeText={UseThemeFocusInputTxt}
/>)
