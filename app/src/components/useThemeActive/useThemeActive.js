import React from 'react'
import { Example } from '../../components'
import { deepMerge } from 'jsutils'
import { useThemeActive, useTheme } from 're-theme'

const Input = props => {
  const { components: { customInput } } = useTheme()

  const focusInput = deepMerge(customInput.hover, customInput.focus)
  const [ ref, theme ] = useThemeActive(customInput.default, focusInput)

  return (
    <label htmlFor="customInput" style={ theme.label }  >
      <input ref={ ref } type="text" id="customInput" placeholder="&nbsp;" style={ theme.input }  />
      <span style={ theme.spanText } >Label</span>
      <span style={ theme.spanBorder } ></span>
    </label>
  )
}

export const UseThemeActiveExample = ({ isToggled }) => (<Example
  isToggled={ isToggled }
  headerText={ 'useThemeActive' }
  component={ <Input title={ 'useThemeActive Input' } ></Input> }
  codeText={`
    import { useThemeActive, useTheme } from 're-theme'

    export const Input = props => {
      const { components: { customInput } } = useTheme()

      const focusInput = deepMerge(customInput.hover, customInput.focus)
      const [ ref, theme ] = useThemeActive(customInput.default, focusInput)

      return (
        <label htmlFor="customInput" style={ theme.label }  >
          <input ref={ ref } type="text" id="customInput" placeholder="&nbsp;" style={ theme.input }  />
          <span style={ theme.spanText } >Label</span>
          <span style={ theme.spanBorder } ></span>
        </label>
      )
    }
  `}
/>)
