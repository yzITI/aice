import srpc from "../srpc.js"
import model from "../model.js"

const mf = model('flow')
srpc.flow = {}

srpc.flow.getList = async () => {
  return await mf.find({}, { projection: { _id: 1, name: 1 } })
}

