import {shell} from 'electron'

export const openWindowInterceptor = ({url}) => {

    if (!url.startsWith('resource://')) {
        if (!url.startsWith('https://oauth.vk.com/authorize')) {
            shell.openExternal(url)
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
