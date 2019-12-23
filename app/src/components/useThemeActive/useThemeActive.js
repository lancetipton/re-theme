import React from 'react'
import { Example } from '../../components'
import { UseThemeActiveButton } from './useThemeActiveButton'

// eslint-disable-next-line import/no-webpack-loader-syntax
import UseThemeActiveButtonTxt from '!!raw-loader!./useThemeActiveButton.js'

const description = (
  <p>
    Use this hook to toggle between two styles based on the <b>active</b> state of the component. This hook should be combined with either the <b>withTheme HOC</b> or <b>useTheme hook</b> to get access to the theme.
  </p>
)

export const UseThemeActiveExample = ({ toggled }) => (<Example
  isToggled={ toggled }
  headerText={ 'useThemeActive' }
  description={ description }
  component={ <UseThemeActiveButton >useThemeActive Button</UseThemeActiveButton> }
  codeText={ UseThemeActiveButtonTxt }
/>)
