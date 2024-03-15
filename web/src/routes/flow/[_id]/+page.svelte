<script>
  import srpc from '$lib/utilities/srpc.js'
  import { getChains } from '$lib/utilities/graph.js'
  import S from '$lib/S.svelte'
  import swal from 'sweetalert2'
  import moment from 'moment'
  import { AIcon } from 'ace.svelte'
  import { mdiTrashCanOutline, mdiCodeTags } from '@mdi/js'
  const parseTime = t => moment(t).format('YYYY-MM-DD HH:mm:ss')

  let { data } = $props()
  let flow = $state({}), step = $state({})
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

  async function choose (i, j) {
    step = flow.steps[stepGraph[i][j]]
  }
</script>

<div class="p-6 min-h-screen flex flex-col bg-gray-100">
  <h1 class="text-2xl font-bold my-2">{flow.name}</h1>
  <div>
    <div class="w-1/4">
      {#each stepGraph as chain, i}
        {#each chain as stepid, j}
          <div class="bg-white flex my-1 p-2 rounded justify-between items-center shadow cursor-pointer all-transition hover:shadow-md">
            <div>{stepid}</div>
            <button>
              <AIcon path={mdiTrashCanOutline} size="1.5rem" class="text-red-600"></AIcon>
            </button>
          </div>
        {/each}
      <hr class="my-2">
      {/each}
    </div>
    <div>
  
    </div>
  </div>
  <!-- <p>id: {data._id}</p> -->
</div>
