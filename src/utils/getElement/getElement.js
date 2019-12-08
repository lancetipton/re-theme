import { isFunc } from 'jsutils'

/**
 * Sets the element value from the passed in prop value if it exists
 * @param {Object} element - Object to check for the prop
 * @param {string} prop - Prop to set the element to
 *
 * @returns {Any} - Value of the prop within the element, or the element
 */
const setFromProp = (data, prop) => (data = (data && data[prop] || data)

/**
 * Gets the element from the passed in ref object
 * @param {React Ref|Object} ref - React Ref object or and Object
 *
 * @returns {Node} - React native element
 */
export const getElement = ref => {
  if(!ref) return console.error(`ref is required when calling the getNode method!`)
  
  try {
    let element = setFromProp(ref, 'current')

    if(!element) return console.error('Could not find element from ref', ref)

    isFunc(element.getNode) && (element = element.getNode())
    setFromProp(element, '_touchableNode')
    setFromProp(element, '_element')

    return element
  }
  catch (err) {
    return console.error(err.stack, err, ref)
  }
}