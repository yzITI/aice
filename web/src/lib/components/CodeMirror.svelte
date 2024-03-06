<script>
  import { onMount } from 'svelte'
  import { EditorView, basicSetup } from 'codemirror'
  import { yaml } from '@codemirror/lang-yaml'
  let { value, readOnly, ...props } = $props()
  
  function debounce (func, timeout = 300) {
    let timer
    return (...args) => {
      clearTimeout(timer)
      timer = setTimeout(() => { func.apply(this, args) }, timeout)
    }
  }
  
  let el = $state(), editor = null
  
  const update = debounce(() => {
    value = editor?.state?.doc?.toString()
  })
  const inputListener = EditorView.updateListener.of(v => {
    if (!v.docChanged) return
    update()
  })
  
  const sleep = ms => new Promise(r => setTimeout(r, ms))
  
  onMount(async () => {
    await sleep(100)
    editor = new EditorView({
      doc: value || '',
      extensions: [basicSetup, yaml(), inputListener, EditorView.lineWrapping],
      parent: el
    })
  })
  
  $effect(() => {
    const v = value
    if (!editor) return
    if (v !== editor.state.doc.toString()) editor.dispatch({
      changes: {
        from: 0,
        to: editor.state.doc.length,
        insert: v
      }
    })
  })
</script>

<div bind:this={el} {...props}></div>
