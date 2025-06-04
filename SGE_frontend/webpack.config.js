const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  output: {
    uniqueName: "sge",
    publicPath: "auto",
  },
  plugins: [
    new ModuleFederationPlugin({
      remotes: {
        CreditosApp: "CreditosApp@http://localhost:4210/remoteEntry.js",
      },
      shared: {
        "@angular/core": { singleton: true, eager: true },
        "@angular/common": { singleton: true, eager: true },
        "@angular/router": { singleton: true, eager: true },
      },
    }),
  ],
};
