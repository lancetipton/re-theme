import { deepMerge, get, isArr, isObj, isStr } from 'jsutils'
import { getCache, addCache, convertToId, createMemoId } from './cache'

/**
 * Checks if the ID is also a style
 * @param {Object} theme - current theme object
 * @param {string} id - Style id to search for
 *
 * @returns {Object} - Found style object
 */
const checkIdForStyle = (theme, id) => isStr(id) && get(theme, id)


/**
 * Merges the styles from the passed in sources
 * <br/> Caches the built style so if can be re-used
 * <br/> Uses the first argument an Id for the cache, or builds the id from the sources
 * @param {*} id
 * @param {*} sources
 *
 * @returns {Object} - built theme styles object
 */
export const getTheme = function (id, ...sources){

  // Check if the id is also a path to styles on the theme
  const styleFromId = checkIdForStyle(this, id)

  // If id is a ref to styles on theme, add them to the sources array
  const sourceStyles = !styleFromId ? sources : [ styleFromId, ...sources ]

  // Get the memo id, or use the sources to build the id
  const memoId = isStr(id) ? id : convertToId(sources)

  // If no memo id can be found, just return
  if(!memoId)
    return console.error(`theme.get requires an ID or array or string sources!`, id, sources) || {}

  // Check if cache exists for the id
  const cache = getCache(memoId)
  if(cache) return cache

  // Build the styles by merging the sources together
  // Check if each source is an id to cache or get the styles from the theme
  const styles = deepMerge(
    ...sourceStyles.map(source => 
      isObj(source)
        ? source
        : getCache(createMemoId(source)) || get(this, source)
    )
  )

  addCache(memoId, styles)

  return styles

}