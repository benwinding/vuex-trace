# vuex-trace

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

``` js
// Mutation logger options
mutationLogger({
  collapsed = true,
  filter = (mutation, stateBefore, stateAfter) => true,
  transformer = state => state,
  mutationTransformer = mut => mut,
  logger = console
})

// Action logger options
actionLogger({
  collapsed = true,
  filter = (action, stateBefore, stateAfter) => true,
  transformer = state => state,
  logger = console
})

```

## Credit

This package was developed from the [vuex](https://github.com/vuejs/vuex) default logger. And this [PR](https://github.com/vuejs/vuex/pull/960).
