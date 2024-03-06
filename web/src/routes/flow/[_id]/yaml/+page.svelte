<script>
  import yaml from 'js-yaml'
  import CodeMirror from '$lib/components/CodeMirror.svelte'
  import srpc from '$lib/utilities/srpc.js'
  import S from '$lib/S.svelte'
  import swal from 'sweetalert2'
  import moment from 'moment'
  const parseTime = t => moment(t).format('YYYY-MM-DD HH:mm:ss')

  let { data } = $props()
  let flow = $state({})
  let yml = $state('')
  async function fetch () {
    S.loading = 'Loading flow...'
    flow = await srpc.flow.get(data._id)
    S.loading = false
    if (!flow) return swal.fire('Error', 'Fail to load flow', 'error')
    flow.time = parseTime(flow.time)
    yml = yaml.dump(flow)
  }
  fetch()

  async function save () {
    S.loading = 'Saving...'
    const payload = yaml.load(yml)
    const res = await srpc.flow.put(data._id, payload)
    S.loading = false
    if (!res) swal.fire('Error', 'Failed to save your flow', 'error')
  }
</script>

<div class="p-6 min-h-screen bg-gray-100">
  <div class="flex items-center justify-between">
    <h1 class="text-2xl font-bold">Flow: {flow.name}</h1>
    <button onclick={save} class="m-2 py-2 px-4 bg-blue-500 text-white font-bold transition-all shadow rounded-full hover:shadow-md">Save</button>
  </div>
  <CodeMirror class="bg-white my-4" bind:value={yml}></CodeMirror>
</div>
