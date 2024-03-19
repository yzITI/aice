import srpc from '../srpc.js'
import model from '../model.js'
import exec from '../executors/index.js'
import crypto from 'crypto'

const mt = model('task'), mf = model('flow')
srpc.task = {}

srpc.task.getList = async before => {
  if (!before) before = Date.now()
  return await mt.find({ time: { $lte: before } }, {
    sort: { time: -1 },
    limit: 1000,
    projection: { _id: 1, flow: 1, status: 1, time: 1 }
  })
} 

srpc.task.get = async _id => {
  return await mt.get({ _id })
}

srpc.task.start = async task => {
  if (!task?.flow) return false
  const _id = crypto.randomBytes(16).toString('base64url')
  const t = { // standard task object
    _id,
    flow: String(task.flow),
    step: String(task.step) || 'start',
    time: Date.now(),
    start: Date.now(),
    status: 'running',
    message: '',
    state: (typeof task.state === 'object') ? JSON.stringify(task.state) : '{}',
    log: '{}',
    count: 0,
    maxCount: Number(task.maxCount) || 100,
    maxTime: Number(task.maxTime) || 3600e3,
    endStep: String(task.endStep) || ''
  }
  // check existence of flow and step
  const f = await mf.get(t.flow)
  if (!f?.steps?.[t.step]) return false 
  // write task into db
  await mt.put({ _id }, t)
  // start execution
  setTimeout(() => { exec({ _id }) })
  return _id
}

srpc.task.abort = async _id => {
  return await mt.update({ _id }, { status: 'aborted', message: 'Task aborted' })
}
