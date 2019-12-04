import React, { useState } from 'react'
import { withTheme } from 're-theme'
import { get } from 'jsutils'
import PropTypes from 'prop-types'
import { ExampleHeader, ExampleCode, ExampleComponent } from '../../components'

export const Example = withTheme(props => {
  const [ toggled, setToggled ] = useState(false)
  const { theme } = props
  return (
    <section style={
      theme.join(
        get(theme, 'example.section'),
        get(theme, 'margin.bottom'),
        theme.example.section,
        props.style
      )
    }>
      { props.headerText && (
        <ExampleHeader text={ props.headerText } toggled={toggled} setToggled={setToggled} />
      )}
      { toggled && (
        <div style={ theme.padding(30, [ 'left', 'right', 'bottom' ]) } >
          { props.codeText && ( <ExampleCode text={ props.codeText } /> )}
          { props.component && ( <ExampleComponent component={ props.component } /> )}
        </div>
      )}
    </section>
  )
})

Example.propTypes = {
  theme: PropTypes.object,
  style: PropTypes.object,
  headerText: PropTypes.string,
  codeText: PropTypes.string,
}
