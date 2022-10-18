import mitt from "mitt";

export default {
    install: (app) => {
        app.provide('$emitter', mitt());
        app.config.globalProperties.emitter = mitt();
    },
};
