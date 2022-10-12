import {ipcMain, ipcRenderer} from 'electron';
import {allowDisplaySleep, restrictDisplaySleep} from '@main/utils/system/powerSaveBlocker'

export const POWER_SAVE_SLEEP_IS_ALLOWED = 'powerSave:sleep:isAllowed';
export const POWER_SAVE_SLEEP_IS_RESTRICTED = 'powerSave:sleep:isRestricted';


/**
 * Send app system sleep blocker disable event
 *
 * @return {void}
 */
export const sendPowerSaveSleepIsAllowedEvent = () => ipcRenderer.send(POWER_SAVE_SLEEP_IS_ALLOWED);

/**
 * Send app system sleep is disabled event
 *
 * @return {void}
 */
export const sendPowerSaveSleepIsRestrictedEvent = () => ipcRenderer.send(POWER_SAVE_SLEEP_IS_RESTRICTED);


/**
 * Listen app system sleep blocker disable event
 *
 * @return {*}
 */
export const catchPowerSaveSleepIsAllowedEvent = () => ipcMain.on(POWER_SAVE_SLEEP_IS_ALLOWED, _ => allowDisplaySleep());

/**
 * Listen app system sleep blocker enable event
 *
 * @return {*}
 */
export const catchPowerSaveSleepIsRestrictedEvent = () => ipcMain.on(POWER_SAVE_SLEEP_IS_RESTRICTED, _ => restrictDisplaySleep());
