<script>
  import srpc from '$lib/srpc.js'
  async function getList () {
    const res = await srpc.flow.getList()
    console.log(res)
  }
  getList()
</script>

<div class="p-6">
  <h1 class="text-4xl font-bold">Flow</h1>
  <p>This page is under construction</p>
  <p>Show flow list here</p>
</div>
