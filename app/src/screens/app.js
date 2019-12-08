import React from 'react'
import { withTheme } from 're-theme'
import { get } from 'jsutils'
import {
  Grid,
  Row,
  ThemeProviderExample,
  WithThemeExample,
  UseThemeHoverExample,
  UseThemeExample
} from '../components'


export const AppScreen = withTheme(props => {
  
  const { theme } = props

  const appStyle = theme.join(
    get(theme, 'layout.full.height'),
    get(theme, 'layout.full.width')
  )
  
  return (
    <div style={ appStyle } >
      <Grid>
        <Row>
          <ThemeProviderExample />
        </Row>
        <Row>
          <WithThemeExample />
        </Row>
        <Row>
          <UseThemeExample />
        </Row>
        <Row>
          <UseThemeHoverExample isToggled={ true } />
        </Row>
      </Grid>
    </div>
  )

})

