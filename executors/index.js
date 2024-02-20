import model from '../model.js'
const mf = model('flow'), mt = model('task'), md = model('data')

// executor list
import gptExecutor from './gpt.js'
const executors = {
  gpt: gptExecutor
}

// Each call execute only one step, it will call itself to execute next step.
const exec = async _id => {
  try { // try-catch the whole function to ensure stability
    // load task and check status
    const task = await mt.get(_id)
    if (task.status !== 'running') return
    // load flow and step
    const flow = await mf.get(task.flow)
    const step = flow?.steps?.[task.step]
    // check flow and step
    if (!step || !executors[step.type]) {
      await mt.update({ _id }, { status: 'error', time: Date.now(), message: `Invalid flow/step=${task.flow}/${task.step}` })
      return
    }
    // parse state and log object
    const state = JSON.parse(task.state), log = JSON.parse(task.log)
    // execute step
    const result = await executors[step.type](step, state, log)
    // save some common properties
    await mt.update({ _id }, { time: Date.now(), count: task.count + 1, state: JSON.stringify(state), log: JSON.stringify(log) })
    // check step execution failure
    if (!result.ok) {
      await mt.update({ _id }, { status: 'error', message: result.error })
      return
    }
    // check termination
    if (!result.next) {
      await mt.update({ _id }, { status: 'done', message: 'Task terminated by the last step' })
      return
    }
    // check count limit
    if (task.count + 1 >= task.maxCount) {
      await mt.update({ _id }, { status: 'done', message: 'Task terminated by maxCount=' + task.maxCount })
      return
    }
    // check time limit
    if (Date.now() - task.start >= task.maxTime) {
      await mt.update({ _id }, { status: 'done', message: 'Task terminated by maxTime=' + task.maxTime })
      return
    }
    // check endStep
    if (task.step === task.endStep) {
      await mt.update({ _id }, { status: 'done', message: 'Task terminated by endStep=' + task.endStep })
      return
    }
    // execute next step
    await mt.update({ _id }, { step: result.next })
    setTimeout(() => { exec(_id) })
  } catch (e) {
    console.log('> Executor Error:', e.toString())
  }
}

export default exec

