import __throttle from 'lodash/throttle';

/**
 * Get item from persisted storage
 *
 * @param storage
 * @return {function(*=): *}
 */
export const getItem = (storage) => (key) => storage.get(key);

/**
 * Set value for provided key to persisted storage
 *
 * @param storage
 * @return {*}
 */
export const setItem = (storage) => __throttle((key, value) => {
  try {
    storage.set(key, value);
  } catch {
    //
  }
}, 2500);

/**
 * Remove value from storage
 *
 * @param storage
 * @return {*}
 */
export const removeItem = (storage) => __throttle((key) => {
  try {
    storage.delete(key);
  } catch {
    //
  }
}, 2500);
