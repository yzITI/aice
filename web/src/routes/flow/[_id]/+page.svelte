<script>
  import srpc from '$lib/utilities/srpc.js'
  import S from '$lib/S.svelte'
  import swal from 'sweetalert2'
  import moment from 'moment'
  const parseTime = t => moment(t).format('YYYY-MM-DD HH:mm:ss')

  let { data } = $props()
  let flow = $state({})

  async function fetch () {
    S.loading = 'Loading flow...'
    flow = await srpc.flow.get(data._id)
    S.loading = false
    if (!flow) return swal.fire('Error', 'Fail to load flow', 'error')
    console.log(flow)
  }
  fetch()
</script>

<div class="p-6 min-h-screen">
  <h1>This is the page for a specific flow</h1>
  <p>under construction</p>
  <p>id: {data._id}</p>
</div>
