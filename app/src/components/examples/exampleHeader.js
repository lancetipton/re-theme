import React from 'react'
import { H3 } from '../../components'
import { useTheme } from 're-theme'

export const ExampleHeader = props => {
  const theme = useTheme()

  return (
    <div
      style={ theme.join(theme, [
        'flex.display',
        'flex.wrap',
        'padding.vert',
        'example.header',
        'margin.bottom'
      ])}
      onClick={ () => props.setToggled(!props.toggled) }
    >
      <H3>
        { props.children || props.text }
      </H3>
    </div>
  )
}