<script>
  import { fromJSON, toJSON, createRichTextEditor, richTextSchema } from 'prosemirror-svelte/state';
  import { richTextPlugins } from 'prosemirror-svelte/helpers';
  import debounce from 'lodash/debounce';
  import { updateTask } from 'Stores/tasks'

  import TextEditor from '../../../TextEditor'

  export let uuid
  export let comment

  let editorState = comment ? fromJSON(JSON.parse(comment), richTextSchema, richTextPlugins) : createRichTextEditor('')

  const debounceUpdate = debounce((task) => updateTask(task), 1000);

  const handleChange = event => {
    const newEditorState = event.detail.editorState
    debounceUpdate({ uuid, comment: JSON.stringify(toJSON(newEditorState)) })
    editorState = newEditorState;
  }

</script>

<style src="./style.scss"></style>

<TextEditor placeholder="Write comment here..." className="TaskCreator__editor outline-none w-100 mt-1" editorState={editorState} onChange={handleChange} />
