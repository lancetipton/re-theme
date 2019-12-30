/** @module theme */
'use strict'

import { getSizeMap } from '../dimensions'
import { Constants } from '../constants'
import { RePlatform, Platform } from 'RePlatform'
import { checkValueUnits } from './unitRules'
import { isObj, deepMerge, reduceObj, isEmpty, unset } from 'jsutils'

/**
 * Searches the theme object for keys that match the passed in size
 * <br/> Maps any found size key objects to the sizedTheme object
 * @function
 * @param {Object} theme - Contains theme style rules
 * @param {Object} sizedTheme - Holds the theme styles for the current size
 * @param {string} size - Current size to search the theme for
 *
 * @returns {Object} theme with the sizes moved to the root level
 */
const buildSizedThemes = (theme, sizedTheme, size) => {

  return reduceObj(theme, (name, value, sizedTheme) => {

    // If value is not an object, just return the sizedTheme
    if(!isObj(value)) return sizedTheme
    
    // If we find the size in the theme, join it with the current sizedTheme
    if(name === size){
      // Merge the current sizedTheme, with the value for this size
      const mergedSize = deepMerge(sizedTheme, value)

      // Remove the size from the theme
      // Because it gets moved to the size theme section
      unset(theme, [ size ])

      // Return the merged size
      return mergedSize
    }

    // Call buildSizedThemes for the values object to look for  sizes in child objects
    const subSized = buildSizedThemes(value, sizedTheme[name] || {}, size)

    // If the subSized contains keys, then it has size data
    // So set it to the name for this size
    if(!isEmpty(subSized)) sizedTheme[name] = subSized

    // Return the updated sized theme
    return sizedTheme

  }, sizedTheme)

}


const mergePlatformOS = (key, theme) => {
  
  // Get the rules for all platforms and os
  const allTheme = theme[Constants.PLATFORM.ALL]

  // Get the rules for the RePlatform ( web || native )
  const platformTheme = theme[ RePlatform ]

  // Get the rules for the OS platform ( web || ios || android )
  const osTheme = theme[ '$'+Platform.OS ]

  // If any of the custom theme object exist, then merge them together
  // Otherwise just return the passed in theme object
  return allTheme || osTheme || platformTheme
    ? deepMerge(
        {},
        allTheme,
        platformTheme,
        osTheme
      )
    : theme

}

/**
 * Transverse through the theme to find any keys matching the current platform
 * <br/> Once a platform key is found, any sub-keys of that object are not searched
 * @function
 * @example:
 * # If platform is web
 * const theme = { font: { web: { size: 12, native: {} }, native: { size: 10 } } }
 * const platformTheme = getPlatformTheme(theme)
 * # returns { font: { size: 12, native: {} }}
 * 
 * @param {Object} themes - each theme module, keys are names and values are the theme rules
 *
 * @returns {Object} - Update theme object with platform keys updated
 */
const getPlatformTheme = theme => {
  if(!theme) return theme

  return reduceObj(theme, (key, value, platformTheme) => {
    // Check if the value is an object
    // If it is make call to merge platform specific styles, and recusivly call self
    // Otherwise check the values units
    platformTheme[key] = isObj(value)
      ? getPlatformTheme( mergePlatformOS(key, value) )
      : checkValueUnits(key, value)

    // Return the update platformTheme object
    return platformTheme

  // Use the theme as the original platformTheme to return
  }, theme)

}

/**
 * Transverse through the theme to find any size objects matching this size
 * <br/> Adds them to the root size object, and removes from the default paht
 * @function
 * @example:
 * const meetings = { fontSize: 12, small: { fontSize: 10 } }
 * restructureTheme({ meetings })
 * # returns => { small: { meetings: { fontSize: 10 }, meetings: { fontSize: 12 } }
 * 
 * @param {Object} themes - each theme module, keys are names and values are the theme rules
 *
 * @returns {Object} - sized theme object with sizes moved to root size object
 */
export const restructureTheme = theme => {
  // Use the theme based on the platform if it exists
  // Pass in the response after the sizes are set
    // Loop over the size map hash keys
  return Object.keys(getSizeMap().hash)
    .reduce((updatedTheme, size) => {

      // Transverse through the theme to find any size objects matching this size
      const builtSize = buildSizedThemes(theme, theme[size] || {}, size)

      // If builtSize is not empty, then size data was found, so set it to the updatedTheme object
      if(!isEmpty(builtSize)) updatedTheme[size] = builtSize

      return updatedTheme
    }, getPlatformTheme(theme))
}