import { Constants } from '../constants'
import { isObj } from 'jsutils'
const RePlatform = Constants.PLATFORM.WEB

const Platform = {
  OS: 'web',
  select: obj => (isObj(obj) && obj.web),
  Version: 'ReTheme'
}

export {
  RePlatform,
  Platform
}