import Vue from 'vue'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));

