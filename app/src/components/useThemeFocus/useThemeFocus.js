import React from 'react'
import { Example } from '../../components'
import { useThemeFocus, useThemeHover, useTheme } from 're-theme'

const Input = props => {
  const { components: { customInput } } = useTheme()
  
  // const [ ref, theme ] = useThemeHover(customInput.default, customInput.hover)
  const [ hoverRef, themeWithHover ] = useThemeHover(customInput.default, customInput.hover)
  const [ ref, theme ] = useThemeFocus(themeWithHover, customInput.focus, { ref: hoverRef })

  return (
    <label htmlFor="customInput" style={ theme.label }  >
      <input ref={ ref } type="text" id="customInput" placeholder="&nbsp;" style={ theme.input }  />
      <span style={ theme.spanText } >Label</span>
      <span style={ theme.spanBorder } ></span>
    </label>
  )
}

export const UseThemeFocusExample = ({ isToggled }) => (<Example
  isToggled={ isToggled }
  headerText={ 'useThemeFocus Hook' }
  component={ <Input title={ 'useThemeFocus Input' } ></Input> }
  codeText={`
    import { useThemeFocus, useTheme } from 're-theme'

    export const Input = props => {
      const { components: { input } } = useTheme()
      const [ ref, theme ] = useThemeFocus(input.default, input.hover)

      return (
        <button ref={ ref } style={ theme } >
          { props.children }
        </button>
      )
    }
  `}
/>)
