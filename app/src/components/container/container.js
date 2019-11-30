import React from 'react'
import { withTheme } from 're-theme'
import { get } from 'jsutils'

export const Container = withTheme(props => {
  const { theme } = props

  const containerStyle = theme.join(
    get(theme, 'display.content.center'),
    get(theme, 'padding.all')
  )
  const contentStyle = theme.join(
    get(theme, 'layout.grid'),
    get(theme, 'padding.vert')
  )

  return (
    <div style={ containerStyle }>
      <div style={ contentStyle } >
        { props.children }
      </div>
    </div>
  )

})
