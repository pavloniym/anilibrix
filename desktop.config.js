module.exports = {
  electronBuilder: {
    chainWebpackMainProcess: (config) => {


    },
    chainWebpackRendererProcess: (config) => {

      // Chain webpack config for electron renderer process only
      // The following example will set IS_ELECTRON to true in your app
      config.plugin('define').tap((args) => {
        args[0]['IS_WEB'] = false;
        args[0]['IS_DESKTOP'] = true;
        return args
      })
    },

    // Use this to change the entrypoint of your app's main process
    mainProcessFile: './desktop/main.js',

    // options placed here will be merged with default configuration and passed to electron-builder
    builderOptions: {
      appId: "com.anilibria.anilibrix",
      mac: {
        icon: "build/icons/app/anilibria.icns",
        category: "public.app-category.video"
      },
      dmg: {
        contents: [
          {x: 410, y: 150, type: "link", path: "/Applications"},
          {x: 130, y: 150, type: "file"}
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
