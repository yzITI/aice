<script>
  import '../index.css'
  import loadingImg from '$lib/images/loading.svg'
  import { fade } from 'svelte/transition'
  import { LS, S } from '$lib/S.svelte'
  import srpc from '$lib/utilities/srpc.js'
  if (LS.AICEURL) srpc(LS.AICEURL) // for debug use
</script>

<svelte:head>
  <title>AICE</title>
</svelte:head>

<slot />

{#if S.loading}
  <div transition:fade class="fixed z-50 top-0 left-0 w-screen h-screen bg-gray-100 flex flex-col items-center justify-center">
    <img alt="loading" src={loadingImg}>
    {#if typeof S.loading === 'string'}
      <div class="my-2">{S.loading}</div>
    {/if}
  </div>
{/if}
