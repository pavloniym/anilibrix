// Get chromecast api
import {ipcRenderer as ipc} from "electron";

const ChromecastAPI = require('chromecast-api');

// Create chromecast client
const client = new ChromecastAPI();

// Create store
const store = {
  devices: []
};


// Save found device in storage
client.on('device', device => store.devices.push(device));


// Get found chromecast devices
const getDevices = () => ipc.send('chromecast:devices:items', store.devices);


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
