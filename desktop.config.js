module.exports = {
  electronBuilder: {

    // Chain webpack config for electron renderer process only
    chainWebpackRendererProcess: (config) => {
      config
        .plugin('env')
        .use(require.resolve('webpack/lib/EnvironmentPlugin'), [{'IS_WEB': false, 'IS_DESKTOP': true}]);
    },

    // If you need to use native modules such as fs or sqlite in the renderer process, you can enable nodeIntegration
    nodeIntegration: true,

    // Use this to change the entry point of your app's main process
    mainProcessFile: './desktop/main.js',

    // Options placed here will be merged with default configuration and passed to electron-builder
    builderOptions: {
      mac: {
        icon: "build/icons/app/anilibria.icns",
        category: "public.app-category.video"
      },
      dmg: {
        contents: [
          {x: 130, y: 150, type: "file"},
          {x: 410, y: 150, type: "link", path: "/Applications"}
        ]
      },
      win: {
        icon: "build/icons/app/anilibria.ico",
        target: [
          {target: "nsis", arch: ["x64", "ia32"]},
          {target: "portable", arch: ["x64", "ia32"]}
        ]
      },
      nsis: {
        oneClick: false,
        perMachine: true,
        artifactName: "${productName}-${os}-${version}-setup.${ext}",
        installerSidebar: "build/installer/installerSidebar.bmp",
        deleteAppDataOnUninstall: true,
        allowToChangeInstallationDirectory: true
      },
      appId: "com.anilibria.anilibrix",
      linux: {icon: "build/icons/app"},
      publish: {
        provider: "github",
        releaseType: "release"
      },
      productName: "AniLibrix",
      artifactName: "${productName}-${os}-${arch}-${version}.${ext}"
    }
  }
};
