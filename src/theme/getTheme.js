import { deepMerge, get, isArr, isObj, isStr } from 'jsutils'
import { getCache, addCache } from '../join/joinCache'

export const getTheme = function (id, ...sources){
  if(!isStr(id))
    return console.error(`theme.get requires an ID as the first argument!`, id) || {}

  const cache = getCache(id)
  if(cache) return cache

  const styles = deepMerge(
    ...sources.map(source => 
      isObj(source)
        ? source
        : isArr(source) || isStr(source)
          ? get(this, source)
          : {}
    )
  )

  addCache(id, styles)

  return styles

}