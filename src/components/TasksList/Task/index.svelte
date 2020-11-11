<script>
  import { fromJSON, toJSON, richTextSchema } from 'prosemirror-svelte/state';
  import { richTextPlugins } from 'prosemirror-svelte/helpers';
  import { removeTask, updateTask, nestTask, removeTaskNesting } from 'stores/tasks'
  import debounce from 'lodash/debounce';
  import cn from 'classnames';

  import Comment from './Comment';
  import Checkbox from './Checkbox';
  import TextEditor from '../../TextEditor'

  export let task

  let editorState = fromJSON(JSON.parse(task.body), richTextSchema, richTextPlugins)

  const debounceUpdate = debounce((task) => updateTask(task), 1000);

  const handleKeyDown = event => {
    if (event.key === 'Tab'){
      event.preventDefault()
      if (event.shiftKey && task.parentUuid) return removeTaskNesting(task.uuid);
      nestTask(task.uuid)
    }
  }

  const handleChange = event => {
    const newEditorState = event.detail.editorState
    debounceUpdate({ uuid: task.uuid, body: JSON.stringify(toJSON(newEditorState)) })
    editorState = newEditorState;
  }

  const handleRemoveClick = () => !task.completed && removeTask(task.uuid)

  const toggleCompletedTask = () => updateTask({ uuid: task.uuid, completed: !task.completed })

</script>

<style src="./style.scss"></style>

<div class={cn("Task d-flex py-2 mb-2", {
  'Task--completed' : task.completed,
  'pl-5': task.parentUuid
})}>
  <Checkbox className="mr-3" checked={task.completed} onChange={toggleCompletedTask}/>
  <div class="w-100">
    <div class="Task__editor-wrapper w-100 border-bottom">
      <TextEditor className="outline-none" editorState={editorState} onChange={handleChange} readOnly={task.completed} onKeyDown={handleKeyDown} />
    </div>
    <Comment uuid={task.uuid} comment={task.comment} />
  </div>
  <i class="Task__delete-icon far fa-trash-alt cursor-pointer align-self-start ml-3" on:click={handleRemoveClick} />
</div>