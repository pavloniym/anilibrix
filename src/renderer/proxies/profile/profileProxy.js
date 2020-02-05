import Proxy from '@proxy'

export default class extends Proxy {
  constructor (parameters = {}) {
    super('https://anilibria.tv/public/login.php', parameters)
  }
}
