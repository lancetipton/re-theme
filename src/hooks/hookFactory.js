import { useRef, useState, useCallback } from 'react';
import { isFunc, isObj, isColl, deepMerge } from 'jsutils'
import { Constants } from '../constants'

/**
 * Updates a listener on an element ( add || remove )
 * @param {Object} element - Node to update the event listener on
 * @param {string} type - Type of update to make ( add || remove )
 * @param {Object} events - Events listener names
 * @param {Object} methods - Functions that run when the event is fired
 *
 * @returns {void}
 */
const updateListeners = (element, type, events, methods) => {
  // Just return if no element or event type
  if(!isObj(element) || !isFunc(element[type])) return null

  // Set the methods to the event
  element[type](events.on, methods.on)
  element[type](events.off, methods.off)
}

/**
 * Works the same as an inline ref function, but adds event listeners to the element
 * <br/> Uses useCallback so that event listeners get changed when the element changes
 * @param {React Ref|Object} ref - React Ref object or regular object
 * @param {Object} events - Events listener names
 * @param {Object} methods - Functions that run when the event is fired
 *
 * @returns {React Callback Ref} - Reference to the callback method
 */
const createCBRef = (ref, events, methods) => {
  // This keeps track of the ref, and the event listeners on the element
  return useCallback(element => {

    // Remove any old events if they exist
    ref.current && updateListeners(ref.current, Constants.REMOVE_EVENT, events, methods)

    // Set the new element to the ref.current
    // Because this ref is internal, we have to update current manually
    ref.current = element

    // Add the new listeners to the updated element
    ref.current && updateListeners(ref.current, Constants.ADD_EVENT, events, methods)

    // If no ref, then call the clean up method
    !ref.current && methods.cleanup()

  // Want to update the callback when the methods changes
  // If the values change, then the method will also change
  // So this will fire when the values change
  }, [ methods.on, methods.off ])
}

/**
 * Creates the on and off methods for the hook
 * Wrap them in useCallback so we can use as dependencies in the Main callback ref
 * @param {*} onValue - Value to set when hook is active
 * @param {*} offValue - Value to set when hook is not active
 *
 * @returns {Object} - Contains the hooks to update to values on and off
 */
const createMethods = (onValue, offValue, setValue, noJoin) => {
  // These methods get called from createCBRef returned function
  // An event listener is added to the ref.current element
  // And when the event happens, Then either the on || off method is called!
  // When called, it calls the setValue function which updates the state with the passed in value
  let methods = {
    // Pass in the onValue / offValue to ensure it updates when the value changes
    // This will also cause the useCallback create from createCBRef to fire
    off: useCallback(() => setValue(offValue), [ offValue ]),
    on: useCallback(() => {

      // If no join is set, or the onValue or the offValue is not a collection
      // Set the value to onValue, otherwise join the objects together
      noJoin || !isColl(onValue) || !isColl(offValue)
        ? setValue(onValue)
        : setValue(deepMerge(offValue, onValue))

    // Watch both the onValue and noJoin value
    }, [ onValue, noJoin ]),

    // Clean up helper to avoid memory leaks
    cleanup: () => {
      methods.on(undefined)
      methods.off(undefined)
      onValue = undefined
      offValue = undefined
      setValue = undefined
      methods = undefined
    }
  }

  return methods
}

/**
 * Creates a hook that will switch between the passed in values
 * <br/> It switches between values based on the passed in events it's listening to
 * @param {Object} events - Events listener names to listen too
 *
 * @returns {function} - Hook function
 */
export const hookFactory = events => (
  /**
  * Hook function called from within a react component
  * 
  * @param {Any} offValue - Value to set when not active
  * @param {Any} onValue - Value to set when active
  * @param {boolean} noJoin - 
  *
  * @returns {Array} - Contains the ref to be added to an element, and the current value
  */
  (offValue, onValue, noJoin) => {

    // Set the default value as off
    const [ value, setValue ] = useState(offValue)

    // Create the callback ref ( i.e. function ref )
    // Which gets the node the ref is attached to as an argument
    const elementRef = createCBRef(
      // Create an internal ref, that keeps track of the current element
      // This way we can remove event listeners when the element changes
      useRef(),
      // Names of events to listen to
      events,
      // Create the methods to update the value using the setValue method
      // These methods call the setValue method, which updates the state
      createMethods(onValue, offValue, setValue, noJoin)
    )

    // Return the ref.current and value to the component
    return [ elementRef, value ]

  }
)