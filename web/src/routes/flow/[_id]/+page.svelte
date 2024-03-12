<script>
  import srpc from '$lib/utilities/srpc.js'
  import { getChains } from '$lib/utilities/graph.js'
  import S from '$lib/S.svelte'
  import swal from 'sweetalert2'
  import moment from 'moment'
  const parseTime = t => moment(t).format('YYYY-MM-DD HH:mm:ss')

  let { data } = $props()
  let flow = $state({})
  let stepGraph = $state([])

  async function fetch () {
    S.loading = 'Loading flow...'
    flow = await srpc.flow.get(data._id)
    S.loading = false
    if (!flow) return swal.fire('Error', 'Fail to load flow', 'error')
    stepGraph = getChains(flow.steps)
    console.log(flow)
    console.log(stepGraph)
  }
  fetch()
</script>

<div class="p-6 min-h-screen">
  <h1 class="text-2xl font-bold">{flow.name}</h1>
  <div>
    {#each stepGraph as chain}
      {#each chain as stepid}
        <div>{stepid}</div>
      {/each}
    {/each}
  </div>
  <p>id: {data._id}</p>
</div>
