import React from 'react'
import { Pre, Code, H5 } from '../../components'

export const ExampleCode = props => {
  return (
    <>
      <H5>Example Code</H5>
      <Pre>
        <Code>
          { props.children || props.text }
        </Code>
      </Pre>
    </>
  )
}