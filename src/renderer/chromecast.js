// CHROMECAST
// Get chromecast api

import sentry from './../main/utils/sentry'
import {getStore} from "@store/index";
import {ipcRenderer as ipc} from "electron";

// Create chromecast api client
const ChromecastAPI = require('chromecast-api');

// Enable Sentry.io electron handler
sentry({store: getStore(), source: 'chromecast'});

// Create chromecast client
const client = new ChromecastAPI();

// Create store
const store = {
  devices: []
};


// Save found device in storage
client.on('device', device => store.devices.push(device));


/**
 * Get found chromecast devices
 *
 */
const getDevices = () => ipc.send('chromecast:devices:items', store.devices);


/**
 * Play on device
 *
 * @param device
 * @param src
 * @param options
 */
const playOnDevice = ({device, src, options = null} = {}) => {

  // Search for device from local store
  device = store.devices.find(d => d.name === device.name);

  // If device is found
  if (device && src) {
    device.play(src, options, e => console.log(e));
  }

};

ipc.on('chromecast:devices:request', () => getDevices()); // make request for devices items to chromecast server,
ipc.on('chromecast:play', (e, payload) => playOnDevice(payload)); // play on device
