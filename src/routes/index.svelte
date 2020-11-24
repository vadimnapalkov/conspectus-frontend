<script lang="javascript">
  import { onMount } from 'svelte';
  import { settings } from 'Stores/settings';
  import { tasks } from 'Stores/tasks';
  import { getInitialData } from 'Api/initialData';

  import UserPanel from '../components/UserPanel'
  import MeetingInfo from '../components/MeetingInfo'
  import TaskCreator from '../components/TaskCreator'
  import TasksList from '../components/TasksList'
  import Spinner from '../components/Spinner'
  import CompleteMeetingButton from '../components/CompleteMeetingButton'

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
  <Spinner />
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

