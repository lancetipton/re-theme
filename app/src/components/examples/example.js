import React, { useState } from 'react'
import { withTheme } from 're-theme'
import { get } from 'jsutils'
import PropTypes from 'prop-types'
import { ExampleHeader, ExampleCode, ExampleComponent } from '../../components'

export const Example = withTheme(props => {
  const { theme, isToggled } = props
  const [ toggled, setToggled ] = useState(isToggled || false)

  const sectionStyle = theme.join(
    get(theme, 'example.section'),
    get(theme, 'margin.bottom'),
    props.style
  )

  const wrapStyle = theme.join(
    get(theme, 'example.wrapper'),
    { maxHeight: (toggled && '700px') || '0px' },
  )
  
  return (
    <section style={ sectionStyle }>
      { props.headerText && (
        <ExampleHeader text={ props.headerText } toggled={toggled} setToggled={setToggled} />
      )}

      <div style={ wrapStyle } >
        { props.codeText && ( <ExampleCode text={ props.codeText } /> )}
        { props.component && ( <ExampleComponent component={ props.component } /> )}
      </div>
    </section>
  )
})

Example.propTypes = {
  theme: PropTypes.object,
  style: PropTypes.object,
  headerText: PropTypes.string,
  codeText: PropTypes.string,
}
