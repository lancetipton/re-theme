import { Dimensions as RNDimensions } from "react-native"

export const Dimensions = {
  get: (...params) => RNDimensions.get(...params),
  set: (...params) => RNDimensions.set(...params),
  update: (...params) => RNDimensions.update(...params),
  addEventListener: (...params) => RNDimensions.addEventListener(...params),
  removeEventListener: (...params) => RNDimensions.removeEventListener(...params)
}