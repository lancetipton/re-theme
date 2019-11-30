import React from 'react'
import { withTheme } from 're-theme'
import { get } from 'jsutils'
import { Container, Text } from '../components'

const UseReTheme = () => {
  return (
    <>
      <Text>
        Wrap your app with the ReThemeProvider
      </Text>
      <Text>
        <code>
          { "<ReThemeProvider value={ this.state.theme } ><App /></ReThemeProvider>" }
        </code>
      </Text>
    </>
  )
}


export const AppScreen = withTheme(props => {
  
  const { theme } = props

  const appStyle = theme.join(
    get(theme, 'layout.full.height'),
    get(theme, 'layout.full.width')
  )
  
  return (
    <div style={ appStyle } >
      <Container>
        <UseReTheme />
      </Container>
    </div>
  )

})

