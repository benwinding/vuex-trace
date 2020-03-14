# vuex-trace

<!-- [START badges] -->

[![NPM Version](https://img.shields.io/npm/v/vuex-trace.svg)](https://www.npmjs.com/package/vuex-trace)
[![License](https://img.shields.io/npm/l/vuex-trace.svg)](https://github.com/benwinding/vuex-trace/blob/master/LICENSE)
[![Downloads/week](https://img.shields.io/npm/dm/vuex-trace.svg)](https://www.npmjs.com/package/vuex-trace)
[![Github Issues](https://img.shields.io/github/issues/benwinding/vuex-trace.svg)](https://github.com/benwinding/vuex-trace)
![Build](https://github.com/benwinding/vuex-trace/workflows/Build%20and%20Publish/badge.svg)

<!-- [END badges] -->

Log actions & mutations in vuex! 🚀

## Usage

``` js
// Default usage
import { mutationLogger, actionLogger } from 'vuex-trace'

const store = new Vuex.Store({
  state,
  mutations,
  plugins: [mutationLogger(), actionLogger()]
})

```

## Options

Options are based on the options from vuex's [built-in-loggin-plugin](https://vuex.vuejs.org/guide/plugins.html#built-in-logger-plugin)

``` js
// Mutation logger options
mutationLogger({
  // Start with log group open
  collapsed: true,
  // Filter specific types of mutations
  filter: (mutation, stateBefore, stateAfter) => true,
  // Transform state during output
  transformer: state => state,
  // Transform mutation during output
  mutationTransformer: mut => mut,
  // Custom logger implementation
  logger: console
})

// Action logger options
actionLogger({
  // Start with log group open
  collapsed: true,
  // Filter specific types of actions
  filter: (action, stateBefore, stateAfter) => true,
  // Transform state during output
  transformer: state => state,
  // Custom logger implementation
  logger: console
})
```

## Credit

This package was developed from the [vuex](https://github.com/vuejs/vuex) default logger. And this [PR](https://github.com/vuejs/vuex/pull/960).
