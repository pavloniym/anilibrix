import plyr from 'plyr';
import 'plyr/dist/plyr.css';

export default {
    install: (app) => app.provide('$plyr', plyr),
};
