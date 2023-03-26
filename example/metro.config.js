// /**
//  * Metro configuration for React Native
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */
// const path = require('path');

// module.exports = {
//   projectRoot: __dirname,

//   resolver: {
//     nodeModulesPaths: ['/Users/atharvadeolalikar/Projects/bottom-sheet'],
//     //   extraNodeModules: {
//     //     'react-native-animated-bottom-drawer':
//     //       ',
//     //   },
//   },
//   transformer: {
//     getTransformOptions: async () => ({
//       transform: {
//         experimentalImportSupport: false,
//         inlineRequires: true,
//       },
//     }),
//   },
// };

const path = require('path');
const extraNodeModules = {
  common: path.resolve(__dirname + '/../'),
};
const watchFolders = [path.resolve(__dirname + '/../')];
module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    extraNodeModules: new Proxy(extraNodeModules, {
      get: (target, name) =>
        //redirects dependencies referenced from common/ to local node_modules
        name in target
          ? target[name]
          : path.join(process.cwd(), `node_modules/${name}`),
    }),
  },
  watchFolders,
};

// "react": "18.2.0",
// "react-native": "0.71.2",
