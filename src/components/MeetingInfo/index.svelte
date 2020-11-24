<script>
  import { onDestroy } from 'svelte';
  import dayjs from 'dayjs'
  import Datepicker from 'svelte-calendar'
  import { settings, updateSettings } from 'Stores/settings';

  let isToday;
  let currentSettings;
  let dateChosen;
  let formattedSelected;

  const unsubscribe = settings.subscribe(value => {
		currentSettings = value;
  });

  $: if(dateChosen && formattedSelected) updateSettings({ dateOfMeeting: dayjs(formattedSelected).format()})

  $: isToday = dayjs(currentSettings.dateOfMeeting).format('DD/MM/YYYY') === dayjs().format('DD/MM/YYYY')

  onDestroy(unsubscribe)

</script>

<style src="./style.scss"></style>

<Datepicker
  start={new Date()}
  end={new Date(dayjs().add(2, 'months').format())}
  bind:formattedSelected
  selected={new Date(dayjs(currentSettings.dateOfMeeting).format())}
  bind:dateChosen
>
  <div class="MeetingInfo p-3 d-flex cursor-pointer">
    {isToday ? 'Today\'s meeting' : 'Next meeting is'} : <b class="MeetingInfo__date ml-4">{dayjs(currentSettings.dateOfMeeting).format('DD.MM.YYYY')}</b>
  </div>
</Datepicker>
