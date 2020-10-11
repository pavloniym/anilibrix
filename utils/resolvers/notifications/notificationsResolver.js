// Resolvers
import {runOnPlatform} from "@@/utils/resolvers/system/deviceResolver";
import {runInMain, runInRenderer} from "@@/utils/resolvers/system/processResolver";

// Notifications events
import {EventBus} from "@plugins/vue-event-bus";

// Package
import {meta} from '@package'

// Events
export const NOTIFICATIONS_EMIT = 'notifications:emit';
export const NOTIFICATIONS_NUMBER = 'notifications:number';

export default class NotificationsResolver {

  /**
   * Emit notification
   *
   * @param notification
   */
  static emitNotification({release, episode}) {
    runOnPlatform(
      () => EventBus.$emit(NOTIFICATIONS_EMIT, {release, episode}),
      () => runInRenderer(() => EventBus.$emit(NOTIFICATIONS_EMIT, {release, episode}))
    );
  }


  /**
   * Catch notification
   *
   * @param callback
   */
  static catchNotification(callback) {
    runOnPlatform(
      () => EventBus.$on(NOTIFICATIONS_EMIT, callback),
      () => runInRenderer(() => EventBus.$on(NOTIFICATIONS_EMIT, callback))
    )
  }


  /**
   * Unsubscribe error event
   *
   * @param callback
   */
  static unsubscribeNotification(callback) {
    runOnPlatform(
      () => EventBus.$off(NOTIFICATIONS_EMIT, callback),
      () => runInRenderer(() => EventBus.$off(NOTIFICATIONS_EMIT, callback))
    )
  }


  /**
   * Set app user model id
   *
   * @return {void}
   */
  static setAppUserModelId() {
    runInRenderer(electron => electron.remote.app.setAppUserModelId(meta.name))
  }

  /**
   * Send notifications number
   *
   * @param number
   * @return {void}
   */
  static sendNotificationsNumber(number) {
    runInRenderer(electron => electron.ipcRenderer.send(NOTIFICATIONS_NUMBER, number));
  }


  /**
   * Set app dock number
   * Relevant for mac os
   *
   * @return {void}
   */
  static setDockNumber() {
    runInMain(electron =>
      electron.ipcMain.on(NOTIFICATIONS_NUMBER, (e, number) => {
        if (electron.app.dock) electron.app.dock.setBadge(number && number > 0 ? number.toString() : '');
      })
    );
  }

}
