import __get from "lodash/get";

/**
 * Handle response from v1 API
 *
 * @param response
 * @return {*}
 */
export const handleResponseFromV1Api = response => {

  // Get response data object
  const response_data = __get(response, 'data');

  const data = __get(response_data, 'data', null);
  const status = __get(response_data, 'status', false);
  const message = __get(response_data, 'error.message', 'Ошибка при запросе на сервер');

  // If status is true -> return response data
  // Otherwise -> throw error with response error message
  if (status === true) {
    return data;

  } else throw new Error(message);

};
