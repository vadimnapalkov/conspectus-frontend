<script>
  import dayjs from 'dayjs';
  import { settings } from 'stores/settings';
  import { removeCompletedTasks } from 'stores/tasks';
  import { onDestroy } from 'svelte';
  import { completeMeeting} from 'api/settings'

  let currentSettings;

  const unsubscribe = settings.subscribe(value => {
		currentSettings = value;
  });

  let isLoading = false;

  $: isToday = dayjs(currentSettings.dateOfMeeting).format('DD/MM/YYYY') === dayjs().format('DD/MM/YYYY')

  const handleCompleteMeeting = async () => {
    if (window.confirm('Current meeting will be completed. Are you sure?')) {
      isLoading = true;
      const data = await completeMeeting().finally(() => {
        isLoading = false;
      });
      settings.update(currentSettings => ({ ...currentSettings, ...data.settings }));
      removeCompletedTasks()
      setTimeout(() => window.alert('Great Success!'))
    }
  }

  onDestroy(unsubscribe)
</script>

{#if isToday}
  <button type="button" class="btn btn-outline-dark mt-4 align-self-end px-4" on:click={handleCompleteMeeting}>
    {#if isLoading}
      <div class="spinner-border text-success" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    {:else}
      Complete Meeting
    {/if}
  </button>
{/if}

