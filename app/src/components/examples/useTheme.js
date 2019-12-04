import React from 'react'
import { Example } from '../../components'
import { useTheme } from 're-theme'

const MyButton = props => {
  const theme = useTheme()
  return (
    <button style={ theme.components.button } >
      { props.children }
    </button>
  )
}

export const UseThemeExample = () => (<Example
  headerText={ 'useTheme Hook' }
  component={ <MyButton>useTheme Button</MyButton> }
  codeText={`
    import { useTheme } from 're-theme'

    export const MyButton = props => {
      const theme = useTheme()
      return (
        <button style={ theme.components.button } >
          { props.children }
        </button>
      )
    }
  `}
/>)