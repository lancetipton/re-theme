// useThemeHover

import React from 'react'
import { Example } from '../../components'
import { useThemeHover, useTheme } from 're-theme'

const MyButton = props => {
  const { components: { button } } = useTheme()
  const [ ref, value ] = useThemeHover(button.default, button.hover)

  return (
    <button ref={ ref } style={ value } >
      { props.children }
    </button>
  )
}

export const UseThemeHoverExample = ({ isToggled }) => (<Example
  isToggled={ isToggled }
  headerText={ 'useThemeHover Hook' }
  component={ <MyButton>useThemeHover Button</MyButton> }
  codeText={`
    import { useThemeHover, useTheme } from 're-theme'

    const { components: { button } } = useTheme()
    const [ ref, value ] = useThemeHover(button.default, button.hover)

    return (
      <button ref={ ref } style={ value } >
        { props.children }
      </button>
    )
  `}
/>)