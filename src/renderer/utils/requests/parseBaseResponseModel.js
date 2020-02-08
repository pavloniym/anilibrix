import __get from 'lodash/get'

/**
 * Parse base response model
 *
 * @param response
 * @return {*}
 */
export default (response) => {
  const payload = __get(response, 'data', null);
  const status = __get(payload, 'status', false);
  const data = __get(payload, 'data', null);
  const error = __get(payload, 'error.message', 'Request error');

  if (status === true) {
    return data;
  } else {
    throw new Error(error);
  }
}
