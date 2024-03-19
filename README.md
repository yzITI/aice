# AICE

Artificial Intelligence Consecutive Engineering

## Motivation

Developing complex systems with large language models (LLMs) often encounters roadblocks in managing countless prompts, parsing intricate responses, and integrating external storage seamlessly. AICE tackles these challenges head-on, offering a framework for artificial intelligence consecutive engineering.

This innovative project visualizes and automates the workflow of consecutive prompting with LLMs, including connections to external storage like MongoDB, enabling long-term memories and reflective abilities in LLM applications.

This project presents a potential solution to bridge the gap between LLMs and traditional programs, opening doors for developers to harness the true potential of modern generative AI.

## Concept

- **Step** is the unit of operation (like instruction), which is designed for specific functions like calling GPT or process strings with Regex.
- **Flow** is a sequence of steps (like program), so that several steps can be executed automatically.
- **Task** is an instance of execution (like process), describing one particular run of some steps in a flow.
  - **State** is the runtime memory of one task.
- **Data** is the persistent storage, so that flows can store and retrive data through particular steps (`store` & `query`).

## Get Started

Create `config.js` at the root level of this repository
```js
export default {
  mongodb: {
    db: 'mongodb://localhost:27017/',
    dbName: 'aice' // optional
  },
  openai: {
    apiKey: 'Your OpenAI apiKey',
    baseURL: 'OpenAI endpoint' // optional
  }
}
```

Run AICE server
```
npm i && node .
```


Run AICE web page (Svelte)
```
cd web && npm i && npm run dev
```

## Development Reference

### Model

```js
step {
  type: 'step type',
  comment: 'step comment',
  next: 'step id',
  ... // other properties depend on type
}

// Following are MongoDB collections
Flow {
  _id: 'flow id',
  name: 'flow name',
  time: Date.now(),
  steps: {
    start: {/* step object */},
    [stepid1]: {/* step object */},
    [stepid2]: {/* step object */},
    ...
  }
}
Data {
  _id: 'data id',
  ... // stored properties
}
Task {
  _id: 'task id',
  flow: 'flow id',
  step: 'step id',
  time: Date.now(), // update time
  start: Date.now(), // start time
  status: 'running'|'done'|'error'|'aborted',
  message: 'termination message (error)',
  state: JSON.stringify({/* runtime state object */}),
  log: JSON.stringify({/* runtime log object */}),
  count: Number,
  maxCount: Number, // default 100
  maxTime: Number, // in ms, default 3600e3
  endStep: 'step id' // optional
}

// Following are StepExecutor related
// @param {Object}: step - step object
// @param {Object}: state - runtime state object
// @param {Object}: log - log object
// @return {Object}: result object
StepExecutor: Function(step, state, log) => result

log {
  // TBD
}

result {
  ok: Boolean,
  next: 'next step id',
  error: 'Error Message'
}
```

### API

Use [SRPC](https://github.com/yzITI/srpc) protocol.

```js
srpc.data.find(filter)
srpc.data.put(_id, data)
srpc.data.update(_id, data)
srpc.data.del(filter)

srpc.flow.getList()
srpc.flow.get(_id)
srpc.flow.put(_id, payload)
srpc.flow.del(_id)

srpc.task.getList(before)
srpc.task.get(_id)
srpc.task.start(task) // don't JSON.stringify
srpc.task.abort(_id)
```
