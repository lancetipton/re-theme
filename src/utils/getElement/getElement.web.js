import { findDOMNode } from 'react-dom'
import { getElement as getEl } from './getElement'

export const getElement = ref => {
  try {
    const element = getEl(ref)

    return element
      ? findDOMNode(element)
      : console.error('Could not find element from ref', ref)
  }
  catch (err) {
    return console.error(err.stack, err, ref)
  }

}