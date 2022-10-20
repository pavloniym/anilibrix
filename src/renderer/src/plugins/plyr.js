import hls from 'hls.js';
import plyr from 'plyr';

import 'plyr/dist/plyr.css';

export default {
    install: (app) => {
        app.provide('$hls', hls)
        app.provide('$plyr', plyr)
    },
};
