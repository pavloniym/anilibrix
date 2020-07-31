import Vue from 'vue'

// Create and export event bus
export const EventBus = new Vue();

// Add bus to vue prototype
Vue.prototype.$bus = EventBus;
