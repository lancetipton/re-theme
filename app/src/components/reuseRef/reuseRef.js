import React from 'react'
import { Example } from '../../components'
import { useThemeFocus, useThemeHover, useTheme } from 're-theme'

const Input = props => {
  const { components: { customInput } } = useTheme()

  const [ hoverRef, themeWithHover ] = useThemeHover(customInput.default, customInput.hover)
  const [ ref, theme ] = useThemeFocus(themeWithHover, customInput.focus, { ref: hoverRef })

  return (
    <label htmlFor="reuseInput" style={ theme.label }  >
      <input ref={ ref } type="text" id="reuseInput" placeholder="&nbsp;" style={ theme.input }  />
      <span style={ theme.spanText } >Hover and Focus</span>
      <span style={ theme.spanBorder } ></span>
    </label>
  )
}

export const ReuseRefExample = ({ isToggled }) => (<Example
  isToggled={ isToggled }
  headerText={ 'Reuse Ref' }
  component={ <Input title={ 'useThemeFocus Input' } ></Input> }
  codeText={`
    import { useThemeFocus, useThemeHover, useTheme } from 're-theme'

    const Input = props => {
      const { components: { customInput } } = useTheme()

      const [ hoverRef, themeWithHover ] = useThemeHover(customInput.default, customInput.hover)
      const [ ref, theme ] = useThemeFocus(themeWithHover, customInput.focus, { ref: hoverRef })

      return (
        <label htmlFor="customInput" style={ theme.label }  >
          <input ref={ ref } type="text" id="customInput" placeholder="&nbsp;" style={ theme.input }  />
          <span style={ theme.spanText } >Hover and Focus</span>
          <span style={ theme.spanBorder } ></span>
        </label>
      )
    }
  `}
/>)
