module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          assets: './src/assets',
          components: './src/components',
          context: './src/context',
          core: './src/core',
          helpers: './src/helpers',
          hooks: './src/hooks',
          navigation: './src/navigation',
          screens: './src/screens',
          services: './src/services',
          store: './src/store',
          styles: './src/styles',
          config: './src/config',
        },
      },
    ],
    [
      'react-native-reanimated/plugin',
      {
        globals: ['__example_plugin_swift', '__example_plugin'],
      },
    ],
  ],
};
