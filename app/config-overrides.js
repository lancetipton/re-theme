module.exports = function override(config, env) {

  // allow importing the .web extension
  // Make sure it's at the start of the extensions array
  config.resolve.extensions.unshift('.web.js')

  console.log(`---------- config.resolve.extensions ----------`)
  console.log(config.resolve.extensions)

  return config
}