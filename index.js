import model from './model.js'
import srpc from './srpc.js'

async function main () {
  await model('test').put({ _id: 'id' }, { hhh: '4' })
}
setTimeout(main, 3000)