import __get from 'lodash/get'

/**
 * Parse base response model
 *
 * @param response
 * @return {*}
 */
export default (response) => {
  const status = __get(response, 'status', false);
  const data = __get(response, 'data', null);
  const error = __get(response, 'error.message', 'Request error');

  if (status === true) {
    return data;
  } else {
    throw new Error(error);
  }
}
