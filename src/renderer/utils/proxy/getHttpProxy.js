import axios from '@plugins/axios';
import pac from 'pac-resolver';

/**
 * Parse http proxy
 *
 * @param httpProxyString
 * @return {*}
 */
const parseHttProxy = (httpProxyString) => {
  const proxyConnections = [];
  const regex = /(?:PROXY )(?:(\S+):([0-9]+))/gm;

  let match;

  while ((match = regex.exec(httpProxyString)) !== null) {
    if (match.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    const host = match[1];
    const port = match[2];

    if (host && host.length > 0 && port > 0) {
      proxyConnections.push({host, port});
    }
  }

  if (proxyConnections.length > 0) {
    return proxyConnections[0];
  }

  throw new Error('Can\'t parse http proxy');
};

/**
 * Get http proxy connection parameters
 *
 * @param pacUrl
 * @param targetUrl
 * @return {Promise}
 */
export default (pacUrl, targetUrl) => new Promise((resolve, reject) => {
  axios.get(pacUrl)
    .then(response => pac(response.data))
    .then(findHttpProxy => findHttpProxy(targetUrl))
    .then(httpProxy => parseHttProxy(httpProxy))
    .then(httpProxyConnection => resolve(httpProxyConnection))
    .catch(error => reject(error));
})
