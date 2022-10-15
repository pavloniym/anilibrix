import {ipcMain} from 'electron'

export const MAKE_HTTP_REQUEST = 'MAKE_HTTP_REQUEST';

export default () => ipcMain.handle(MAKE_HTTP_REQUEST, async (_, config) => {

        console.log(config);

        const axios = require('axios').create();
        const response = await axios.request(config);

        return {
            data: response?.data,
            status: response?.status,
            headers: response?.headers,
        };
    }
);
