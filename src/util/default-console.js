import { isDarkMode } from "./index";

const isDark = isDarkMode();
const defaultBg = isDark ? '#ddd' : '#777';
const defaultText = '#000';
const defaultStyle = `color: ${defaultText}; background: ${defaultBg};font-size:12pt;font-weight:normal;padding:2px 10px;border-radius:5px;`;

export default class defaultLogger {
  constructor() {}

  // get log() {
  //   const boundLogFn = console.log.bind(console, "%c %s", defaultStyle);
  //   return boundLogFn;
  // }
  log(...args) {
    const argsSafe = args || [];
    const firstArg = argsSafe.shift();
    const secondArg = argsSafe.shift();
    let style = defaultStyle;
    if (
      typeof firstArg === "string" &&
      typeof secondArg === "string" &&
      firstArg.includes("%c")
    ) {
      style = style + secondArg;
      console.log(firstArg, style, ...args);
    } else {
      console.log("%c%s", style, firstArg, secondArg, ...argsSafe);
    }
  }

  groupCollapsed(...args) {
    const argsSafe = args || [];
    const firstArg = argsSafe.shift();
    const secondArg = argsSafe.shift();
    let style = defaultStyle;
    if (
      typeof firstArg === "string" &&
      typeof secondArg === "string" &&
      firstArg.includes("%c")
    ) {
      style = style + secondArg;
      console.groupCollapsed(firstArg, style, ...args);
    } else {
      console.groupCollapsed("%c%s", style, firstArg, secondArg, ...argsSafe);
    }
  }
  get group() {
    const boundLogFn = console.group.bind(console);
    return boundLogFn;
  }
  get groupEnd() {
    const boundLogFn = console.groupEnd.bind(console);
    return boundLogFn;
  }
}
