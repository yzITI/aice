# AICE

Artificial Intelligence Consecutive Engineering

## Motivation

Developing complex systems with large language models (LLMs) often encounters roadblocks in managing countless prompts, parsing intricate responses, and integrating external storage seamlessly. AICE tackles these challenges head-on, offering a framework for artificial intelligence consecutive engineering.

This innovative project visualizes and automates the workflow of consecutive prompting with LLMs, including connections to external storage like MongoDB, enabling long-term memories and reflective abilities in LLM applications.

This project presents a potential solution to bridge the gap between LLMs and traditional programs, opening doors for developers to harness the true potential of modern generative AI.

## Model

```js
step {
  type: 'step type',
  comment: 'step comment',
  next: 'step id',
  ... // other properties depend on type
}
```

### Database Collections

```js
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
  time: Date.now(),
  ... // stored properties
}
Task {
  _id: 'task id'
  flow: 'flow id',
  time: Date.now(),
  status: 'running'|'done'|'error',
  error: 'error message',
  state: {/* runtime state object */}
}
```

## API

Use [SRPC](https://github.com/yzITI/srpc) protocol.
