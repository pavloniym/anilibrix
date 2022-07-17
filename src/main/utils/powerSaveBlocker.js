const { powerSaveBlocker } = require('electron')

let powerSaveBlockId = 0

/**
 * Block the system from entering low-power (sleep) mode or turning off the
 * display.
 */
function start () {
  stop() // Stop the previous power saver block, if one exists.
  powerSaveBlockId = powerSaveBlocker.start('prevent-display-sleep')
  console.log(`powerSaveBlocker.start: ${powerSaveBlockId}`)
}

/**
 * Stop blocking the system from entering low-power mode.
 */
function stop () {
  if (!powerSaveBlocker.isStarted(powerSaveBlockId)) {
    return
  }
  powerSaveBlocker.stop(powerSaveBlockId)
  console.log(`powerSaveBlocker.stop: ${powerSaveBlockId}`)
}

export { start, stop }
