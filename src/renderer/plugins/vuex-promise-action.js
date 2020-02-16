import promiseIpc from 'electron-promise-ipc'
const DISPATCH = 'promise-action-dispatch';

export default () => (store) => {
  function renderer () {
    return store.dispatchPromise = (type, payload) => promiseIpc.send(DISPATCH, {
      type,
      payload
    })
  }

  function main (store) {
    return promiseIpc.on(DISPATCH, ({ type, payload }) => store.dispatch(type, payload))
  }

  return process.type === 'renderer'
    ? renderer()
    : main(store)
}
