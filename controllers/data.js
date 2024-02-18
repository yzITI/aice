import srpc from '../srpc.js'
import model from '../model.js'

const md = model('data')
srpc.data = {}

srpc.data.find = async filter => {
  return await md.find(filter)
} 

srpc.data.put = async (_id, data) => {
  return await md.put({ _id }, data)
}

srpc.data.update = async (_id, data) => {
  return await md.update({ _id }, data)
}

srpc.data.del = async filter => {
  return await md.del(filter)
} 