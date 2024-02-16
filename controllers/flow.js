import srpc from "../srpc.js"
import model from "../model.js"

const mf = model('flow')
srpc.flow = {}

srpc.flow.getList = async () => {
  return await mf.find({}, { projection: { _id: 1, name: 1, time: 1 } })
}

srpc.flow.get = async flow => {
  return await mf.get({ _id: flow })
}

srpc.flow.put = async (flow, step) => {
  await mf.put ({ _id: flow }, step)
  return true
}