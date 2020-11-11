<script>
  import { onDestroy } from 'svelte';
  import { tasks } from 'stores/tasks';
  import Task from './Task';

  let currentTasks = []

  const unsubscribe = tasks.subscribe(value => {
    currentTasks = value;
  })

  onDestroy(unsubscribe)
</script>

<style src="./style.scss"></style>

<svelte:head>
	<title>Conspectus</title>
</svelte:head>

<div class="TasksList d-flex h-100 py-4 flex-column pr-2">
  {#if !currentTasks.length}
    <div class="m-auto">
      You don't have any tasks yet
    </div>
  {:else}
    {#each currentTasks.filter(task=> !task.parentUuid) as task (task.uuid)}
      <div class="d-flex flex-column">
        <Task task={task}/>
        {#each currentTasks.filter(childTask=> childTask.parentUuid && childTask.parentUuid === task.uuid) as childTask (childTask.uuid)}
          <Task task={childTask}/>
        {/each}
      </div>
    {/each}
  {/if}
</div>
