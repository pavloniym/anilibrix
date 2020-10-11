// Bus
import {EventBus} from "@plugins/vue-event-bus";

// Resolvers
import {runOnPlatform} from "@@/utils/resolvers/system/deviceResolver";
import {runInRenderer} from "@@/utils/resolvers/system/processResolver";

// Events
export const ERROR_EMIT = 'error:emit';

export default class ErrorResolver {

  /**
   * Emit error
   *
   * @param error
   */
  static emitError(error) {
    runOnPlatform(
      () => EventBus.$emit(ERROR_EMIT, error),
      () => runInRenderer(() => EventBus.$emit(ERROR_EMIT, error))
    )
  }


  /**
   * Catch error
   *
   * @param callback
   */
  static catchError(callback) {
    runOnPlatform(
      () => EventBus.$on(ERROR_EMIT, callback),
      () => runInRenderer(() => EventBus.$on(ERROR_EMIT, callback))
    )
  }


  /**
   * Unsubscribe error event
   *
   * @param callback
   */
  static unsubscribeError(callback) {
    runOnPlatform(
      () => EventBus.$off(ERROR_EMIT, callback),
      () => runInRenderer(() => EventBus.$off(ERROR_EMIT, callback))
    )
  }

}

