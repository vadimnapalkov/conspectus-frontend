<script>
  import TextEditor from '../TextEditor'
  import { addTask } from 'stores/tasks';
  import { createRichTextEditor, toJSON } from 'prosemirror-svelte/state';

  // create the initial editor state
  let editorState = createRichTextEditor('');

  const handleKeyDown = (event) => {
    if(event.key === 'Enter' && event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault()
      addTask({ body: JSON.stringify(toJSON(editorState))});
      editorState = createRichTextEditor('');
    }
  }

  function handleChange(event) {
   // get the new editor state from event.detail
   editorState = event.detail.editorState;
 }

</script>

<style src="./style.scss"></style>

<div class="TaskCreator pb-1">
  <TextEditor className="TaskCreator__editor outline-none" editorState={editorState} onKeyDown={handleKeyDown} onChange={handleChange}  />
</div>