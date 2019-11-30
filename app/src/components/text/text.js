import React from 'react'
import { withTheme } from 're-theme'
import { get } from 'jsutils'

export const Text = withTheme(props => {
  const { theme } = props
  
  return (
    <>
      <span style={ get(theme, 'component.text') } >
        { props.children }
      </span>
      <br/>
    </>
  )
})