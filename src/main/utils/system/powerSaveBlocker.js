const { powerSaveBlocker } = require('electron')

let powerSaveBlockId = 0

/**
 * Block the system from entering low-power (sleep) mode or turning off the display.
 * Stop the previous power saver block, if one exists.
 *
 * @return {void}
 */
const restrictDisplaySleep = () => {
  allowDisplaySleep();
  powerSaveBlockId = powerSaveBlocker.start('prevent-display-sleep');
}

/**
 * Stop blocking the system from entering low-power mode.
 *
 * @return {void}
 */
const allowDisplaySleep = () => {
  if (powerSaveBlocker.isStarted(powerSaveBlockId) === true) {
    powerSaveBlocker.stop(powerSaveBlockId)
  }
}

export {
  allowDisplaySleep,
  restrictDisplaySleep
}
