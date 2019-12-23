import React, { useState, useLayoutEffect, useRef } from 'react'
import { get } from 'jsutils'
import { useTheme } from 're-theme'

const getHeight = (height, toggled) => {
  return toggled
    ? height
    : height && !toggled
      ? 0
      : null
}

export const Slider = props => {
  
  const theme = useTheme()

  const slideRef = useRef(null)

  const [ height, setHeight ] = useState(null)

  useLayoutEffect(() => {
    const curHeight = get(slideRef, 'current.offsetHeight')
    if(curHeight === 0) return

    height !== curHeight && setHeight(curHeight)
  }, [ height ])

  const sliderStyle = theme.join(
    get(theme, 'transition.height'),
    get(theme, 'layout.full.width'),
    get(props, 'style'),
    { maxHeight: getHeight(height, props.toggled) },
  )

  return (
    <div ref={ slideRef } style={ sliderStyle } slider-wrapper='true' >
      { props.children }
    </div>
  )
}