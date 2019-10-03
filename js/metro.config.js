const { getDefaultConfig } = require("metro-config")

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig()

  return {
    serializer: {
      getModulesRunBeforeMainModule: () => [
        require.resolve('react-native/Libraries/Core/InitializeCore')
      ],
      getPolyfills: require('react-native/rn-get-polyfills')
    },
    resolver: {
      sourceExts: ['jsx', 'js', ...defaultConfig.resolver.sourceExts]
    },
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
    },
  }
})()
