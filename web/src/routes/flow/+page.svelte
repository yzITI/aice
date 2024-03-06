<script>
  import { goto } from '$app/navigation'
  import srpc from '$lib/utilities/srpc.js'
  import S from '$lib/S.svelte'
  import swal from 'sweetalert2'
  import moment from 'moment'
  import { random } from '$lib/utilities/crypto.js'
  import { AIcon } from 'ace.svelte'
  import { mdiTrashCanOutline, mdiCodeTags } from '@mdi/js'

  let list = $state([])
  async function getList () {
    S.loading = 'Loading flow list'
    list = await srpc.flow.getList()
    list.sort((a, b) => b.time - a.time)
    S.loading = false
  }
  getList()

  async function add () {
    const _id = random(16)
    const flow = {
      _id,
      name: 'New flow',
      time: Date.now(),
      steps: {
        start: {
          type: 'pass',
          comment: 'Initial step',
          next: ''
        }
      }
    }
    S.loading = 'Creating'
    await srpc.flow.put(_id, flow)
    list.unshift(flow)
    S.loading = false
  }

  const parseTime = t => moment(t).format('YYYY-MM-DD HH:mm:ss')

  async function del (i, e) {
    e.stopPropagation()
    const flow = list[i]
    const { isConfirmed } = await swal.fire({
      title: 'Dangerous Operation',
      html: `You are deleting <b>${flow.name}</b>`,
      icon: 'warning',
      showCancelButton: true
    })
    if (!isConfirmed) return
    S.loading = 'Deleting'
    await srpc.flow.del(flow._id)
    list.splice(i, 1)
    S.loading = false
  }

  function gotoFlow (e, flow, route = '') {
    e.stopPropagation()
    goto('/flow/' + flow._id + '/' + route)
  }
</script>

<div class="p-6 bg-gray-100 min-h-screen">
  <div class="flex justify-between items-center">
    <h1 class="text-4xl font-bold m-2">Flow</h1>
    <button onclick={add} class="m-2 py-2 px-4 bg-blue-500 text-white font-bold transition-all shadow rounded-full hover:shadow-md">New</button>
  </div>
  <div>
    {#each list as flow, i}
      <div class="my-2 p-2 shadow all-transition hover:shadow-md hover:bg-amber-50 rounded bg-white flex items-center justify-between cursor-pointer" onclick={e => gotoFlow(e, flow)}>
        <div>
          <div class="text-lg font-bold">{flow.name}</div>
          <div class="text-xs text-gray-500">{parseTime(flow.time)}</div>
        </div>
        <div class="flex items-center">
          <button class="p-1 rounded hover:bg-amber-100 transition-all" onclick={e => gotoFlow(e, flow, 'yaml')}>
            <AIcon path={mdiCodeTags} size="1.8rem" class="text-blue-600"></AIcon>
          </button>
          <button class="p-1 rounded hover:bg-amber-100 transition-all" onclick={e => del(i, e)}>
            <AIcon path={mdiTrashCanOutline} size="1.8rem" class="text-red-600"></AIcon>
          </button>
        </div>
      </div>
    {/each}
  </div>
</div>
