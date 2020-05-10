import pac from 'pac-resolver';
import axios from '@plugins/axios';

/**
 * Parse http proxy
 *
 * @param httpProxyString
 * @return {*}
 */
const parseHttpProxy = (httpProxyString) => {

  const results = [];
  const connections = httpProxyString.split(';');

  connections.forEach(connection => {

    // Create data object
    const data = {
      host: null,
      port: null,
      direct: connection.includes('DIRECT')
    };

    // Parse connection string
    connection = connection.replace(' ', '').replace('PROXY', '').split(':');

    // Set host and port
    if (connection && connection.length === 2) {
      data.host = connection[0];
      data.port = parseInt(connection[1]);
    }

    // Push results
    results.push(data);

  });


  return results.length > 0
    ? results[0]
    : null;
};


/**
 * Get http proxy connection parameters
 *
 * @param source
 * @param url
 * @return {Promise}
 */
export default async ({source, url}) => {
  try {

    const response = await axios.get(source, {timeout: 7000});
    const findProxy = pac(response.data);
    const proxyString = await findProxy(url);

    return parseHttpProxy(proxyString);

  } catch {
    throw new Error('Ошибка разборе PAC-скрипта')
  }
}
