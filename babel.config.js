module.exports = {
  presets: [
    "babel-preset-expo", // For Expo projects
    "@babel/preset-react",
  ],
  plugins: [
    [
      "module:react-native-dotenv",
      {
        moduleName: "@env",
        path: ".env",
        blocklist: null,
        allowlist: null,
        safe: false,
        allowUndefined: true,
      },
    ],
  ],
};
