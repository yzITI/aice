import srpc from '../srpc.js'
import model from '../model.js'
import exec from '../executors/index.js'
import crypto from 'crypto'

const mt = model('task')
srpc.task = {}

srpc.task.getList = async () => {
  return await mt.find({}, { projection: { _id: 1, flow: 1, status: 1, time: 1 }})
} 

srpc.task.get = async _id => {
  return await mt.get({ _id })
}

srpc.task.start = async task => {
  if (!task?.flow || !Number.isInteger(task?.maxCount) || !Number.isInteger(task?.maxTime)) return false
  const _id = crypto.randomBytes(16).toString('base64url')
  setTimeout(() => {
    exec({
      _id,
      flow: String(task.flow),
      step: String(task.step) || 'start',
      time: Date.now(),
      create: Date.now(),
      status: 'running',
      error: '',
      state: (typeof task.state === 'object') ? task.state : {},
      count: 0,
      maxCount: Number(task.maxCount),
      maxTime: Number(task.maxTime),
      endStep: String(task.endStep) || ''
    })
  })
  return _id
}

srpc.task.abort = async _id => {
  return await mt.update({ _id }, { status: 'aborted' })
}
