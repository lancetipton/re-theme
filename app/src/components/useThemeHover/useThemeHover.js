import React from 'react'
import { Example } from '../../components'
import { UseThemeHoverButton } from './useThemeHoverButton'

// eslint-disable-next-line import/no-webpack-loader-syntax
import UseThemeHoverButtonTxt from '!!raw-loader!./useThemeHoverButton.js'

const description = (
  <p>
    Use this hook to toggle between two styles based on the <b>hover</b> state of the component. This hook should be combined with either the <b>withTheme HOC</b> or <b>useTheme hook</b> to get access to the theme.
  </p>
)


export const UseThemeHoverExample = ({ toggled }) => (<Example
  isToggled={ toggled }
  headerText={ 'useThemeHover' }
  description={ description }
  component={ <UseThemeHoverButton>useThemeHover Button</UseThemeHoverButton> }
  codeText={ UseThemeHoverButtonTxt }
/>)