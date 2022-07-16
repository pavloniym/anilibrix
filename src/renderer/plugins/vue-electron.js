export default {
  install: function (Vue) {
    Vue.prototype.$electron = require('electron')
    // Vue.prototype.$electron.remote = require('@electron/remote');
  }
}
