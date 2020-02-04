import __set from 'lodash/set';

export default {

  /**
   * Set value with provided key to store object
   *
   * @param s
   * @param k
   * @param v
   * @return {*}
   */
  set: (s, { k, v }) => __set(s, k, v),

};
