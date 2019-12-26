import { deepFreeze } from 'jsutils'

export const Constants = deepFreeze({
  BUILD_EVENT: 'build',
  CHANGE_EVENT: 'change',
  RESIZE_EVENT: 'resize',
  ADD_EVENT: 'addEventListener',
  REMOVE_EVENT: 'removeEventListener',
  PLATFORM: {
    NATIVE: 'native',
    WEB: 'web'
  }
})