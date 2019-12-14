import React from 'react'
import { H4 } from '../../components'
import { useTheme, useThemeHover } from 're-theme'

export const ExampleHeader = props => {
  const theme = useTheme()
  const { example: { header } } = theme

  const [ ref, headerStyle ] = useThemeHover(header.default, header.hover)

  const layoutStyle = theme.join(theme, [
    'flex.display',
    'flex.wrap',
    'padding.vert',
    'margin.bottom'
  ])

  return (
    <div
      ref={ ref }
      style={ theme.join(layoutStyle, headerStyle) }
      onClick={ () => props.setToggled(!props.toggled) }
    >
      <H4 style={{ cursor: 'pointer' }} >
        { props.children || props.text }
      </H4>
    </div>
  )
}