import HttpsProxyAgent from 'https-proxy-agent'

/**
 * Create https proxy agent instance with provided host port
 *
 * @param host
 * @param port
 * @return {HttpsProxyAgent}
 */
export default ({ host, port }) => {
  return new HttpsProxyAgent({ host, port });
}
