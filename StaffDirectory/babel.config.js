module.exports = function(api) {
    api.cache(true);
    return {
      presets: ['babel-preset-expo'],
      plugins: [
        ["module:react-native-dotenv", { // load environment variables using import statements
          "moduleName": "@env",
          "path": ".env",
          "blacklist": null,
          "whitelist": null,
          "safe": false,
          "allowUndefined": true
        }]
      ]
    };
  };

  /* refs:
  https://docs.expo.dev/versions/latest/config/babel/
  https://babeljs.io/docs/configuration
  https://www.npmjs.com/package/react-native-dotenv
  https://www.npmjs.com/package/react-native-dotenv/v/3.3.1
  babel: JS compiler, makes react apps backwards compatible w old browsers
  
  */