<script>
  // import successkid from 'images/successkid.jpg';
  import UserPanel from '../components/UserPanel'
  import MeetingInfo from '../components/MeetingInfo'
  import TaskCreator from '../components/TaskCreator'
  import TasksList from '../components/TasksList'
  import CompleteMeetingButton from '../components/CompleteMeetingButton'
  import { settings } from 'stores/settings';
  import { tasks } from 'stores/tasks';
  import { getInitialData } from 'api/initialData';
  import { onMount } from 'svelte';

  let isLoading = true;

  async function fetchInitialData() {
    const data = await getInitialData().finally(()=> {
      isLoading = false
    });
    settings.set(data.settings);
    tasks.set(data.tasks);
	};

  onMount(fetchInitialData);
</script>

<style src="./style.scss"></style>

<svelte:head>
	<title>Conspectus</title>
</svelte:head>

{#if isLoading}
  <div class="d-flex justify-content-center h-100 align-items-center">
    <div class="spinner-border text-success" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
{:else}
  <div class="Main h-100 p-3 p-md-5 bg-light">
    <div class="px-md-5 h-100 d-flex flex-column">
      <div class="d-flex justify-content-end"><UserPanel /></div>
      <div class="Main__header mt-4 "><MeetingInfo /></div>
      <div class="Main__сontent pl-2 pl-md-5 pr-1 pr-md-3 pb-5 pt-1 d-flex flex-column justify-content-between h-100">
        <TasksList />
        <TaskCreator />
        <CompleteMeetingButton />
      </div>
    </div>
  </div>
{/if}

