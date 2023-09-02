<script>
    import { onMount } from 'svelte';

    let alarms = [];

    onMount(async () => {
        // Fetch all active alarms
        chrome.alarms.getAll((allAlarms) => {
            alarms = allAlarms;
        });
    });
</script>

<h1>Active Alarms</h1>

<ul>
    {#each alarms as alarm}
        <li>{alarm.name} - {alarm.scheduledTime}</li>
    {/each}
</ul>
