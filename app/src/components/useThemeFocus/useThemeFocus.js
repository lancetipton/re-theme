import React from 'react'
import { Example } from '../../components'
import { deepMerge } from 'jsutils'
import { useThemeFocus, useTheme } from 're-theme'

const Input = props => {
  const { components: { customInput } } = useTheme()

  const focusInput = deepMerge(customInput.hover, customInput.focus)
  const [ ref, theme ] = useThemeFocus(customInput.default, focusInput)

  return (
    <label htmlFor="focusInput" style={ theme.label }  >
      <input ref={ ref } type="text" id="focusInput" placeholder="&nbsp;" style={ theme.input }  />
      <span style={ theme.spanText } >Label</span>
      <span style={ theme.spanBorder } ></span>
    </label>
  )
}

export const UseThemeFocusExample = ({ isToggled }) => (<Example
  isToggled={ isToggled }
  headerText={ 'useThemeFocus' }
  component={ <Input title={ 'useThemeFocus Input' } ></Input> }
  codeText={`
    import { useThemeFocus, useTheme } from 're-theme'

    export const Input = props => {
      const { components: { customInput } } = useTheme()

      const focusInput = deepMerge(customInput.hover, customInput.focus)
      const [ ref, theme ] = useThemeFocus(customInput.default, focusInput)

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
