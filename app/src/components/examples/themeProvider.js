import React from 'react'
import { Example } from '../../components'

export const ThemeProviderExample =() => (<Example
  headerText={ 'ReThemeProvider' }
  codeText={`
    import { ReThemeProvider } from 're-theme'
    import myTheme from './path/to/theme'

    export const MyApp = () => {
      return (
        <ReThemeProvider theme={ myTheme } >
          <App />
        </ReThemeProvider>
      )
    }
  `}
/>)