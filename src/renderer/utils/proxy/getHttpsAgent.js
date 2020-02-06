import HttpsProxyAgent from 'https-proxy-agent'

/**
 *
 * @param host
 * @param port
 * @return {module:https-proxy-agent.HttpsProxyAgent}
 */
export default ({host, port}) => {
  return new HttpsProxyAgent({host, port});
}
