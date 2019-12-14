import React from 'react'
import { Example } from '../../components'
import { useTheme } from 're-theme'

const MyButton = props => {
  const theme = useTheme()
  return (
    <button style={ theme.components.button.default } >
      { props.children }
    </button>
  )
}

export const UseThemeExample = ({ isToggled }) => (<Example
  isToggled={ isToggled }
  headerText={ 'useTheme' }
  component={ <MyButton>useTheme Button</MyButton> }
  codeText={`
    import { useTheme } from 're-theme'

    export const MyButton = props => {
      const theme = useTheme()
      return (
        <button style={ theme.components.button.default } >
          { props.children }
        </button>
      )
    }
  `}
/>)