import React, { useState } from 'react'
import { withTheme } from 're-theme'
import { get } from 'jsutils'
import PropTypes from 'prop-types'
import { ExampleCode, ExampleComponent, ExampleHeader, Slider } from '../../components'

export const Example = withTheme(props => {

  const { theme, isToggled, headerText } = props
  const [ toggled, setToggled ] = useState(isToggled || false)

  const sectionStyle = theme.join(
    get(theme, 'app.section'),
    get(theme, 'margin.bottom'),
    props.style
  )

  return (
    <section style={ sectionStyle }>
      { props.headerText && (
        <ExampleHeader text={ headerText } toggled={toggled} setToggled={setToggled} />
      )}
      <Slider style={ get(theme, 'app.wrapper') } toggled={ toggled } >
        <div style={ get(theme, 'padding.bottom') } >
          { props.codeText && ( <ExampleCode text={ props.codeText } /> )}
          { props.component && ( <ExampleComponent component={ props.component } /> )}
        </div>
      </Slider>
    </section>
  )

})

Example.propTypes = {
  theme: PropTypes.object,
  style: PropTypes.object,
  headerText: PropTypes.string,
  codeText: PropTypes.string,
}
