import srpc from "../srpc.js"
import model from "../model.js"

const md = model('data')
srpc.data = {}

srpc.data.get = async data => {
  return await md.get({ _id: data })
} 