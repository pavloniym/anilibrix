import {shell} from 'electron'

export const openWindowInterceptor = (details) => {
    if (!details.url.startsWith('resource://')) {
        if (!details.url.startsWith('https://oauth.vk.com/authorize')) {
            shell.openExternal(details.url)
            return {action: 'deny'}
        }
    }

    return {
        action: 'allow',
        overrideBrowserWindowOptions: {
            autoHideMenuBar: true
        }
    }
}
