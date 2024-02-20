# AICE

Artificial Intelligence Consecutive Engineering

## Motivation

Developing complex systems with large language models (LLMs) often encounters roadblocks in managing countless prompts, parsing intricate responses, and integrating external storage seamlessly. AICE tackles these challenges head-on, offering a framework for artificial intelligence consecutive engineering.

This innovative project visualizes and automates the workflow of consecutive prompting with LLMs, including connections to external storage like MongoDB, enabling long-term memories and reflective abilities in LLM applications.

This project presents a potential solution to bridge the gap between LLMs and traditional programs, opening doors for developers to harness the true potential of modern generative AI.

## Get Started

### Install Dependence

```
npm i
```

### Config File

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

## Development

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
  create: Date.now(), // create time
  status: 'running'|'done'|'error'|'aborted',
  error: 'error message', // optional
  state: {/* runtime state object */},
  count: Number,
  maxCount: Number, 
  maxTime: Number, // in ms
  endStep: 'step id' // optional
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

srpc.task.getList()
srpc.task.get(_id)
srpc.task.start(task)
srpc.task.abort(_id)
```

### Step Execution

```js
// @param {Object}: step - step object
// @param {Object}: state - runtime state object
// @param {Object}: control - control object
// @return {Object}: result object
StepExecutor: Function(step, state, control) => result

control {
  // TBD
}

result {
  ok: Boolean,
  next: 'next step id',
  error: 'Error Message'
}
```

