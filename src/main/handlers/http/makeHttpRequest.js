import {ipcMain} from 'electron'

export const MAKE_HTTP_REQUEST = 'MAKE_HTTP_REQUEST';

export default () => ipcMain.handle(
    MAKE_HTTP_REQUEST,
    async (_, {url, method, data, params, headers, timeout}) => {

        const axios = require('axios').create();
        const response = await axios.request({url, data, params, method, headers, timeout});

        return {
            data: response?.data,
            status: response?.status,
            headers: response?.headers,
        };
    }
);
