import srpc from '../srpc.js'
import model from '../model.js'

const md = model('data')
srpc.data = {}

srpc.data.get = async filter => {
  return await md.find(filter)
} 
