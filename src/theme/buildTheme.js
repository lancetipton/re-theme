/** @module theme */
'use strict'

import { fireThemeEvent } from './themeEvent'
import { Constants } from '../constants'
import { getMergeSizes, getSize, getSizeMap } from '../dimensions'
import { isObj, deepMerge, reduceObj, isEmpty, get, unset } from 'jsutils'

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

  const printData = !isEmpty(sizedTheme)

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

/**
 * Transverse through the theme to find any size objects matching this size
 * <br/> Adds them to the root size object, and removes from the default paht
 * @function
 * @example:
 * const meetings = { fontSize: 12, small: { fontSize: 10 } }
 * buildSizedTheme({ meetings })
 * # returns => { small: { meetings: { fontSize: 10 }, meetings: { fontSize: 12 } }
 * 
 * @param {Object} themes - each theme module, keys are names and values are the theme rules
 *
 * @returns the sized theme object with sizes moved to root size object
 */
const buildSizedTheme = theme => {

  // Loop over the size map keys
  return getSizeMap().keys.reduce((themeSized, size) => {
    // Transverse through the theme to find any size objects matching this size
    const builtSize = buildSizedThemes(theme, theme[size] || {}, size)
    // If builtSize is not empty, then size data was found, so set it to the themeSized object
    if(!isEmpty(builtSize)) themeSized[size] = builtSize

    return themeSized
  }, theme)

}

/**
 * Checks if the theme is the same as the default theme.
 * <br/> If not then merges the two together
 * @function
 * @param {*} theme - Passed in user there
 * @param {*} defaultTheme - Cached default theme
 *
 * @returns {Object} - Theme object
 */
const mergeWithDefault = (theme, defaultTheme) => {
  // Check if theres a defaultTheme, and it's not equal to the passed in theme
  const mergedTheme = defaultTheme && theme !== defaultTheme 
    ? deepMerge(defaultTheme, theme)
    : theme

  // Build the sizes for the merged theme based on the sizeMap keys
  return buildSizedTheme(mergedTheme, getSizeMap().keys)
}

/**
 * Joins themes from different sizes together based on the index of the sizeKey
 * <br/> It takes the all sizes less then the index of the sizeKey, included in the sizeKey
 * <br/> Then loops over each one and joins them together
 * @function
 * @param {Object} theme - Parent theme object hold the child themes divided by size
 * @param {string} sizeKey - Name of the current window size
 * @param {Object} [extraTheme={}] - Extra theme items to add to the theme, has lowest priority
 *
 * @returns {Object} - Merged theme
 */
const joinThemeSizes = (theme, sizeKey, extraTheme={}) => {
  return deepMerge(
    // Add the extra theme first, so it has lowest priority
    extraTheme,
    // Get the sizes to merge, and map to the theme
    ...getMergeSizes(sizeKey)
      .reduce((themes, key) => {
        // Check if a theme exists for the passed in key
        // And add it to the themes array
        theme[key] && themes.push(theme[key])

        return themes
      }, [])
  )
}

/**
 * Gets the dimensions of the current screen, and pull the theme if it exists
 * @function
 * @param {Object} theme - Current active theme
 * @param {number} width - Current screen width
 * @param {number} height - Current screen height
 * @param {Object} defaultTheme - Initial theme
 *
 * @returns {Object} Subsection of the theme based on current dimensions if it exists
 */
export const buildTheme = (theme, width, height, defaultTheme) => {

  // If theres no theme, or not valid curSize, just return the passed in theme
  if(!isObj(theme)) return theme

  // Pull out the key and the size that matches the width
  const [ key, size ] = getSize(width)
  
  
  const mergedTheme = mergeWithDefault(theme, defaultTheme)

  // Extract the sizes from the theme
  const {
    xsmall,
    small,
    medium,
    large,
    xlarge,
    ...extraTheme
  } = mergedTheme

  const builtTheme = size
    ? joinThemeSizes(theme, key, extraTheme)
    : extraTheme
  
  fireThemeEvent(Constants.BUILD_EVENT, builtTheme)
  
  builtTheme.RTMeta = { key, size, width, height }
  
  return builtTheme
}