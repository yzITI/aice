import srpc from '../srpc.js'
import model from '../model.js'

const mf = model('flow')
srpc.flow = {}

srpc.flow.getList = async () => {
  return await mf.find({}, { projection: { _id: 1, name: 1, time: 1 } })
}

srpc.flow.get = async _id => {
  return await mf.get({ _id })
}

srpc.flow.put = async (_id, payload) => {
  if (!payload?.steps?.start) return false
  payload.time = Date.now()
  return await mf.put({ _id }, payload)
}
