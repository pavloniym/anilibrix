import __set from 'lodash/set'

export default {

  /**
   * Set value with provided key to store object
   *
   * @param s
   * @param k
   * @param v
   * @return {*}
   */
  set: (s, {k, v}) => __set(s, k, v),


  /**
   * Push value to array in store with provided key
   *
   * @param s
   * @param k
   * @param v
   * @return {*}
   */
  push: (s, {k, v}) => s[k].push(v)

}
