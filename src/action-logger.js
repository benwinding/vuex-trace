// Credits: borrowed code from vuejs/vuex

import { deepCopy, isDarkMode } from "./util";
import defaultConsole from "./util/default-console";

export default function createLogger({
  collapsed = true,
  filter = (action, stateBefore, stateAfter) => true,
  transformer = state => state,
  logger = new defaultConsole()
} = {}) {
  return store => {
    let prevState = deepCopy(store.state);

    const IS_DARK = isDarkMode();

    store.subscribeAction(({ type, payload }, state) => {
      if (typeof logger === "undefined") {
        return;
      }
      const nextState = deepCopy(state);

      if (filter(type, prevState, nextState)) {
        const time = new Date();
        const formattedTime = ` @ ${pad(time.getHours(), 2)}:${pad(
          time.getMinutes(),
          2
        )}:${pad(time.getSeconds(), 2)}.${pad(time.getMilliseconds(), 3)}`;
        const message = `→ Action ${type}${formattedTime}`;

        // render
        const messageArgs = [`%c${message}`, "background: #aed581;"];
        try {
          if (collapsed) {
            logger.groupCollapsed(...messageArgs);
          } else {
            logger.group(...messageArgs);
          }
        } catch (e) {
          console.log(...messageArgs);
        }

        const bgColor = IS_DARK ? '#222' : '#ddd'
        const groupBaseStyle = `font-size:10pt; padding:1px 8px; background: ${bgColor};`;
        logger.log("%cpayload", groupBaseStyle + "color: #333;", {
          payload
        });
        logger.log("%cstate", groupBaseStyle + "color: #4CAF50;", {
          nextState: transformer(nextState)
        });

        try {
          logger.groupEnd();
        } catch (e) {
          logger.log("—— log end ——");
        }
      }

      prevState = nextState;
    });
  };
}

function repeat(str, times) {
  return new Array(times + 1).join(str);
}

function pad(num, maxLength) {
  return repeat("0", maxLength - num.toString().length) + num;
}
