import { useMemo } from 'react'
import { useTheme } from './useTheme'
import { checkCall, isObj, isEmptyColl } from '@ltipton/jsutils'

/**
 * Create a custom hook for building the styles that are memoized
 * @example
 * const buildStyles = (theme) => {
 *   return {
 *     main: { flexDirection: 'column', ...margin },
 *     button: { main: margin },
 *   }
 * }
 *
 * const styles = useStyles(buildStyles)
 *
 * @param {function} stylesCb - Callback function to build the styles
 * @param {Object} [customStyles={}] - Custom styles to pass to the styles callback
 * @returns { Object } - Current theme
 */
export const useStyles = (stylesCb, customStyles) => {
  // Ensure the custom styles is real styles object
  const styles =
    !customStyles || !isObj(customStyles) || isEmptyColl(customStyles)
      ? false
      : customStyles

  const theme = useTheme()

  // Use the useMemo hoook to memoize the call to the stylesCb
  return useMemo(() => checkCall(stylesCb, theme, styles), [
    theme,
    stylesCb,
    styles,
  ])
}
