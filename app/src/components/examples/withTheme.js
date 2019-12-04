import React from 'react'
import { Example } from '../../components'
import { withTheme } from 're-theme'

const MyButton = withTheme(props => {
  const { theme } = props
  return (
    <button style={ theme.components.button } >
      { props.children }
    </button>
  )
})

export const WithThemeExample =() => (<Example
  headerText={ 'withTheme HOC' }
  component={ <MyButton>withTheme Button</MyButton> }
  codeText={`
    import { withTheme } from 're-theme'

    export const MyButton = withTheme(props => {
      const { theme } = props
      return (
        <button style={ theme.components.button } >
          { props.children }
        </button>
      )
    })
  `}
/>)