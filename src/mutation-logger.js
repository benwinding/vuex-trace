// Credits: borrowed code from vuejs/vuex

import { deepCopy, isDarkMode } from "./util";
import defaultConsole from "./util/default-console";

export default function createLogger({
  collapsed = true,
  filter = (mutation, stateBefore, stateAfter) => true,
  transformer = state => state,
  mutationTransformer = mut => mut,
  logger = new defaultConsole()
} = {}) {
  return store => {
    let prevState = deepCopy(store.state);

    const IS_DARK = isDarkMode();

    store.subscribe((mutation, state) => {
      if (typeof logger === "undefined") {
        return;
      }
      const nextState = deepCopy(state);

      if (filter(mutation, prevState, nextState)) {
        const time = new Date();
        const formattedTime = ` @ ${pad(time.getHours(), 2)}:${pad(
          time.getMinutes(),
          2
        )}:${pad(time.getSeconds(), 2)}.${pad(time.getMilliseconds(), 3)}`;
        const formattedMutation = mutationTransformer(mutation);
        const message = `↻ Mutation ${mutation.type}${formattedTime}`;
        // render
        const messageArgs = [`%c${message}`, "background: #ffb74d;"];
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
        logger.log("%cprev state", groupBaseStyle + "color: #9E9E9E;", {
          prevState: transformer(prevState)
        });
        logger.log("%cmutation", groupBaseStyle + "color: #03A9F4;", {
          formattedMutation: formattedMutation
        });
        logger.log("%cnext state", groupBaseStyle + "color: #4CAF50;", {
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
