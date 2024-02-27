<script>
  import SmileIcon from '$lib/components/SmileIcon.svelte'
  let cot = $state(0)

  function inc () {
    cot++
  }
</script>

<SmileIcon></SmileIcon>
<p>cot: {cot}</p>
<button onclick={inc} class="p-2 rounded">Click Me</button>
