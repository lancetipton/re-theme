import React from 'react'
import { withTheme } from 're-theme'
import { get } from 'jsutils'
import {
  ReuseRefExample,
  Section,
  ThemeProviderExample,
  WithThemeExample,
  UseThemeExample,
  UseThemeActiveExample,
  UseThemeFocusExample,
  UseThemeHoverExample,
} from '../components'

export const AppScreen = withTheme(props => {
  
  const { theme } = props

  const appStyle = theme.join(
    get(theme, 'layout.full.height'),
    get(theme, 'layout.full.width')
  )

  const gridStyle = theme.join(
    get(theme, 'margin.bottom')
  )

  return (
    <div style={ appStyle } >

      <Section style={ gridStyle } title={ 'Provider' } theme={ theme } >
        <ThemeProviderExample />
      </Section>

      <Section style={ gridStyle } title={ 'HOC' } theme={ theme } >
        <WithThemeExample />
      </Section>

      <Section style={ gridStyle } title={ 'Hooks' } theme={ theme } >
        <UseThemeExample />
        <UseThemeHoverExample />
        <UseThemeActiveExample />
        <UseThemeFocusExample />
        <ReuseRefExample />
      </Section>

    </div>
  )

})

