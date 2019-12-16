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

const buildGridHeader = (title, gridStyle, iconStyle) => {
  return (
    <H2 style={ gridStyle } >
      { title }
    </H2>
  )
}


const BuildGrid = ({ children, style, theme, title }) => {
  
  children = children && ((isArr(children) && children) || [ children ])
  const titleStyle = get(theme, 'example.grid.title')
  const iconStyle = get(theme, 'app.icons.header.grid')

  return (
    <Grid style={ style } >
      { title && buildGridHeader(title, titleStyle, iconStyle) }
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

