import React from 'react'
import { H5 } from '../../components'

export const ExampleComponent = (props) => {
  return (
    <>
    <H5>Example Component</H5>
    { props.component }
    <br/>
    </>
  )
}