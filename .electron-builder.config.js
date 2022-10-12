module.exports = {
    mac: {
        //icon: 'build/icons/app/anilibria.icns',
        category: 'public.app-category.video',
    },
    win: {
        //icon: 'build/icons/app/anilibria.ico',
        target: [
            {
                target: 'nsis',
                arch: ['x64', 'ia32', 'arm64'],
            },
            {
                target: 'portable',
                arch: ['x64', 'ia32', 'arm64'],
            },
        ],
    },
    snap: {
        publish: [
            {
                provider: 'github',
                releaseType: 'release',
            },
            {
                repo: 'anilibrix',
                channels: ['stable'],
                provider: 'snapStore',
                publishAutoUpdate: false,
            },
        ],
    },
    nsis: {
        oneClick: false,
        perMachine: true,
        artifactName: '${productName}-${os}-${version}-setup.${ext}',
        installerSidebar: 'build/installer/installerSidebar.bmp',
        deleteAppDataOnUninstall: true,
        allowToChangeInstallationDirectory: true,
    },
    appId: 'com.anilibria.anilibrix',
    files: ['packages/**/dist/**'],
    linux: {
        icon: 'build/icons/app',
        category: 'Video',
        target: [
            {
                target: 'AppImage',
                arch: ['x64', 'ia32', 'arm64'],
            },
            {
                target: 'snap',
                arch: ['x64'],
            },
        ],
    },
    publish: {
        provider: 'github',
        releaseType: 'release',
    },
    productName: 'AniLibrix',
    directories: {
        output: 'dist',
        buildResources: 'buildResources',
    },
    artifactName: '${productName}-${os}-${arch}-${version}.${ext}',
};
