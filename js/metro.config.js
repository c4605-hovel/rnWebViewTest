const path = require('path')
const { getDefaultConfig } = require("metro-config")

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig()

  return {
    resolver: {
      sourceExts: ['jsx', 'js', ...defaultConfig.resolver.sourceExts]
    },
  }
})()
