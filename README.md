# aice

Artificial Intelligence Consecutive Engineering

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
