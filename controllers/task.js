import srpc from "../srpc.js"
import model from "../model.js"

const mt = model('task')
srpc.task = {}

srpc.task.getList = async () => {
  return await mt.find({}, { projection: { _id: 1, flow: 1, status: 1 }})
} 

srpc.task.get = async task => {
  return await mt.get({ _id: task })
}