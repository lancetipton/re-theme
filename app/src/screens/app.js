import React from 'react'
import { withTheme } from 're-theme'
import { get, isArr } from 'jsutils'
import {
  Grid,
  H2,
  Row,
  ReuseRefExample,
  ThemeProviderExample,
  WithThemeExample,
  UseThemeExample,
  UseThemeActiveExample,
  UseThemeFocusExample,
  UseThemeHoverExample,
} from '../components'

const BuildGrid = ({ children, style, theme, title }) => {
  
  children = children && ((isArr(children) && children) || [ children ])

  return (
    <Grid style={ style } >
      { title && (<H2 style={ get(theme, 'example.grid.title') } >{ title }</H2>) }
      { children && children.map((child, index) => (
        <Row key={ index } >
          { child }
        </Row>
      )) }
    </Grid>
  )
}

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
      <BuildGrid style={ gridStyle } title={ 'Provider' } theme={ theme } >
        <ThemeProviderExample />
      </BuildGrid>
      <BuildGrid style={ gridStyle } title={ 'HOC' } theme={ theme } >
        <WithThemeExample />
      </BuildGrid>
      <BuildGrid style={ gridStyle } title={ 'Hooks' } theme={ theme } >
        <UseThemeExample />
      </BuildGrid>
      <BuildGrid style={ gridStyle }>
        <UseThemeHoverExample />
      </BuildGrid>
      <BuildGrid style={ gridStyle }>
        <UseThemeActiveExample />
      </BuildGrid>
      <BuildGrid style={ gridStyle }>
        <UseThemeFocusExample />
      </BuildGrid>
      <BuildGrid style={ gridStyle }>
        <ReuseRefExample />
      </BuildGrid>
    </div>
  )

})

