<script>
  // import the core component
 import ProsemirrorEditor from 'prosemirror-svelte';
 import { toHTML } from 'prosemirror-svelte/state';

 export let placeholder = "Enter task..."
 export let readOnly = false
 export let className = ''
 export let onKeyDown = null
 export let editorState
 export let onChange

</script>

{#if readOnly}
  <del class="TextEditor">{@html toHTML(editorState)}</del>
{:else}
  <ProsemirrorEditor
  {placeholder}
  {editorState}
  className={`TextEditor ${className}`}
  on:change={onChange}
  on:keydown={onKeyDown}
  />
{/if}

