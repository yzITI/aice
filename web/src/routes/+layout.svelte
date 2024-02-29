<script>
  import '../index.css'
  import { LS } from '$lib/state.svelte'
  import srpc from '$lib/srpc.js'
  if (LS.AICEURL) srpc(LS.AICEURL) // for debug use
</script>

<svelte:head>
  <title>AICE</title>
</svelte:head>

<slot />
