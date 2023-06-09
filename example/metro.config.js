// /**
//  * Metro configuration for React Native
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

const path = require('path');
const extraNodeModules = {
  'react-native-animated-bottom-drawer': path.resolve(__dirname + '/../'),
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
      get: (target, name) => {
        //redirects dependencies referenced from common/ to local node_modules
        //console.log(target, name);
        return name in target
          ? target[name]
          : path.join(process.cwd(), `node_modules/${name}`);
      },
    }),
  },
  watchFolders,
};

// "react": "18.2.0",
// "react-native": "0.71.2",
