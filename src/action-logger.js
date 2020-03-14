// Credits: borrowed code from fcomb/redux-logger

import { deepCopy } from './util'

export default function createLogger ({
  collapsed = true,
  filter = (action, stateBefore, stateAfter) => true,
  transformer = state => state,
  logger = console
} = {}) {
  return store => {
    let prevState = deepCopy(store.state)

    store.subscribeAction(({ type, payload }, state) => {
      if (typeof logger === 'undefined') {
        return
      }
      const nextState = deepCopy(state)

      if (filter(action, prevState, nextState)) {
        const time = new Date()
        const formattedTime = ` @ ${pad(time.getHours(), 2)}:${pad(time.getMinutes(), 2)}:${pad(time.getSeconds(), 2)}.${pad(time.getMilliseconds(), 3)}`
        const message = 'action ' + type + formattedTime
        const startMessage = collapsed
          ? logger.groupCollapsed
          : logger.group

        // render
        try {
          startMessage.call(logger, message)
        } catch (e) {
          console.log(message)
        }

        logger.log('%c payload', 'color: #9E9E9E; font-weight: bold', { payload })
        logger.log('%c state', 'color: #4CAF50; font-weight: bold', transformer(nextState))

        try {
          logger.groupEnd()
        } catch (e) {
          logger.log('—— log end ——')
        }
      }

      prevState = nextState
    })
  }
}

function repeat (str, times) {
  return (new Array(times + 1)).join(str)
}

function pad (num, maxLength) {
  return repeat('0', maxLength - num.toString().length) + num
}
