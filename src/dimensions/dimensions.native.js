import { Dimensions as RNDimensions } from "react-native"

export const Dimensions = {
  get: (...params) => RNDimensions.get(...param),
  set: (...params) => RNDimensions.set(...param),
  update: (...params) => RNDimensions.update(...param),
  addEventListener: (...params) => RNDimensions.addEventListener(...param),
  removeEventListener: (...params) => RNDimensions.removeEventListener(...param)
}