/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
function find(list, f) {
  return list.filter(f)[0]
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
function deepCopy(obj, cache) {
  if (cache === void 0) cache = []

  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  let hit = find(cache, function(c) {
    return c.original === obj
  })
  if (hit) {
    return hit.copy
  }

  let copy = Array.isArray(obj) ? [] : {}
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy: copy
  })

  Object.keys(obj).forEach(function(key) {
    copy[key] = deepCopy(obj[key], cache)
  })

  return copy
}

// Credits: borrowed code from fcomb/redux-logger

function createLogger(ref) {
  if (ref === void 0) ref = {}
  let collapsed = ref.collapsed
  if (collapsed === void 0) collapsed = true
  let filter = ref.filter
  if (filter === void 0)
    filter = function(mutation, stateBefore, stateAfter) {
      return true
    }
  let transformer = ref.transformer
  if (transformer === void 0)
    transformer = function(state) {
      return state
    }
  let mutationTransformer = ref.mutationTransformer
  if (mutationTransformer === void 0)
    mutationTransformer = function(mut) {
      return mut
    }
  let logger = ref.logger
  if (logger === void 0) logger = console

  return function(store) {
    let prevState = deepCopy(store.state)

    store.subscribeAction(function({ type, payload }, state) {
      if (typeof logger === 'undefined') {
        return
      }
      let nextState = deepCopy(state)

      let time = new Date()
      let formattedTime =
        ' @ ' +
        pad(time.getHours(), 2) +
        ':' +
        pad(time.getMinutes(), 2) +
        ':' +
        pad(time.getSeconds(), 2) +
        '.' +
        pad(time.getMilliseconds(), 3)
      let message = 'action ' + type + formattedTime
      let startMessage = collapsed ? logger.groupCollapsed : logger.group

      // render
      try {
        startMessage.call(logger, message)
      } catch (e) {
        console.log(message)
      }

      logger.log('%c payload', 'color: #9E9E9E; font-weight: bold', { payload })
      logger.log('%c state', 'color: #4CAF50; font-weight: bold', { state })

      try {
        logger.groupEnd()
      } catch (e) {
        logger.log('—— log end ——')
      }

      prevState = nextState
    })
  }
}

function repeat(str, times) {
  return new Array(times + 1).join(str)
}

function pad(num, maxLength) {
  return repeat('0', maxLength - num.toString().length) + num
}

export default createLogger
