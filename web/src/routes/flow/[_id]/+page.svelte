<script>
  import srpc from '$lib/utilities/srpc.js'
  import { goto } from '$app/navigation'
  import { getChains } from '$lib/utilities/graph.js'
  import S from '$lib/S.svelte'
  import swal from 'sweetalert2'
  import moment from 'moment'
  import { AIcon } from 'ace.svelte'
  import logoImg from '$lib/images/logo.svg'
  import { mdiTrashCanOutline, mdiCodeTags, mdiChevronRight, mdiChevronDown, mdiCloseCircleOutline } from '@mdi/js'
  import stepsIndex from '$lib/steps/index.js'
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
  }
  fetch()

  function del (e, stepid) {
    e.stopPropagation()
    for (const id in flow.steps) {
      if (stepid === id) continue
      const s = flow.steps[id], next = flow.steps[stepid].next
      if (s.next === stepid) s.next = (next === id ? '' : next) 
    }
    delete flow.steps[stepid]
    stepGraph = getChains(flow.steps)
  }

  let current = $state('start') // current stepid
  const currentStep = $derived(flow?.steps?.[current])
</script>

<div class="p-6 h-screen flex flex-col bg-gray-100">
  <div class="flex items-center">
    <img alt="logo" class="w-20 cursor-pointer" onclick={() => goto('/')} src={logoImg}>
    <input class="text-2xl px-2 grow font-bold m-2 text-black"  bind:value={flow.name}>
  </div>
  
  <div class="flex grow h-0">
    <div class="w-72 max-h-full overflow-y-auto p-2">
      {#each stepGraph as chain, i}
        {#each chain as stepid, j}
          {#if flow.steps[stepid]}
            {@const step = flow.steps[stepid]}
            <div class={'bg-white flex my-2 py-1 px-2 rounded justify-between items-center shadow cursor-pointer all-transition hover:shadow-md ' + (current === stepid ? 'ring' : '')} onclick={() => { current = stepid }}>
              <div class="flex flex-col grow">
                <div class="flex items-center m-0">
                  <AIcon path={stepsIndex[step.type].icon} size="1.2rem" color="#333"></AIcon>
                  <div class="font-bold ml-1px">{step.type}</div>
                  <code class="ml-2 mr-1 text-xs bg-gray-100 text-gray-500 px-1 select-all">{stepid}</code>
                  <div class={'flex items-center ' + (step.next ? (j === chain.length - 1 ? 'text-blue-600' : 'text-green-600') : 'text-red-600')}>
                    <AIcon path={step.next ? (j === chain.length - 1 ? mdiChevronRight : mdiChevronDown) : mdiCloseCircleOutline} size="1.1rem"></AIcon>
                    {#if j === chain.length - 1}
                      <code class="mr-2 text-xs select-all">{step.next}</code>
                    {/if}
                  </div>
                </div>
                <input bind:value={step.comment} class="block w-full text-xs outline-none opacity-60 px-1" placeholder="comment">
              </div>
              {#if stepid !== 'start'}
                <button onclick={e => del(e, stepid)}>
                  <AIcon path={mdiTrashCanOutline} size="1.5rem" class="text-red-600 opacity-75"></AIcon>
                </button>
              {/if}
            </div>
          {/if}
        {/each}
      <hr class="my-2" />
      {/each}
    </div>
    <div class="grow px-4">
      <div>
        <svelte:component this={stepsIndex?.[currentStep?.type]?.component} />
      </div>
    </div>
  </div>
</div>
