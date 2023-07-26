module.exports = function(api) {
  const path = require('path');
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset','babel-preset-expo'],
    plugins: ['transform-inline-environment-variables'],
    // reanimated must be last
    plugins: 
    [
      ["module:react-native-dotenv", {
                    "envName": "LS_ENV",
                    "moduleName": "@env",
                    "path": ".env",
                    "blocklist": null,
                    "allowlist": null,
                    "blacklist": null, // DEPRECATED
                    "whitelist": null, // DEPRECATED
                    "safe": false,
                    "allowUndefined": true,
                    "verbose": false
                  }],      
      [ "module-resolver",
        {
            root: ["."],
            resolvePath(sourcePath, currentFile) {
              if (
                sourcePath === "react-native" &&
                !(
                  (
                    currentFile.includes("node_modules/react-native/") || // macos/linux paths
                    currentFile.includes("node_modules\\react-native\\")
                  ) // windows path
                ) &&
                !(
                  currentFile.includes("resolver/react-native/") ||
                  currentFile.includes("resolver\\react-native\\")
                )
              ) {
                return path.resolve(__dirname, "resolver/react-native");
              }
              return undefined;
            },
          }, 
        ],
      'react-native-reanimated/plugin'
      ],
      
  };
};
