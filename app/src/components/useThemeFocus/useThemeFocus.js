import React from 'react'
import { Example } from '../../components'
import { UseThemeFocusInput } from './useThemeFocusInput'

// eslint-disable-next-line import/no-webpack-loader-syntax
import UseThemeFocusInputTxt from '!!raw-loader!./useThemeFocusInput.js'

const description = (
  <p>
    Use this hook to toggle between two styles based on the <b>focus</b> state of the component. This hook should be combined with either the <b>withTheme HOC</b> or <b>useTheme hook</b> to get access to the theme.
  </p>
)


export const UseThemeFocusExample = ({ toggled }) => (<Example
  isToggled={ toggled }
  headerText={ 'useThemeFocus' }
  description={ description }
  component={ <UseThemeFocusInput title={ 'useThemeFocus Input' } /> }
  codeText={UseThemeFocusInputTxt}
/>)
