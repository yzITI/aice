<script>
  import srpc from '$lib/utilities/srpc.js'
  import moment from 'moment'
  import { random } from '$lib/utilities/crypto.js'
  import { AIcon } from 'ace.svelte'
  import { mdiTrashCanOutline } from '@mdi/js'

  let list = $state([])
  async function getList () {
    list = await srpc.flow.getList()
    list.sort((a, b) => b.time - a.time)
  }
  getList()

  async function add () {
    const _id = random(16)
    const flow = {
      _id,
      name: 'New flow',
      time: Date.now(),
      steps: {
        start: {}
      }
    }
    await srpc.flow.put(_id, flow)
    list.unshift(flow)
  }

  const parseTime = t => moment(t).format('YYYY-MM-DD HH:mm:ss')

  async function del (i) {
    await srpc.flow.del(list[i]._id)
    list.splice(i, 1)
  }
</script>

<div class="p-6 bg-gray-100 min-h-screen">
  <div class="flex justify-between items-center">
    <h1 class="text-4xl font-bold m-2">Flow</h1>
    <button onclick={add} class="m-2 py-2 px-4 bg-blue-500 text-white font-bold transition-all shadow rounded-full hover:shadow-md">New</button>
  </div>
  <div>
    {#each list as flow, i}
      <div class="my-2 p-2 shadow all-transition hover:shadow-md hover:bg-amber-50 rounded bg-white flex items-center justify-between cursor-pointer">
        <div>
          <div class="text-lg font-bold">{flow.name}</div>
          <div class="text-xs text-gray-500">{parseTime(flow.time)}</div>
        </div>
        <button class="p-1" onclick={() => del(i)}>
          <AIcon path={mdiTrashCanOutline} size="1.8rem" class="text-red-600"></AIcon>
        </button>
      </div>
    {/each}
  </div>
</div>
