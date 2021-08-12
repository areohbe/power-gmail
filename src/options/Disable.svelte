<script lang="ts">
  export let option: { key: string; filterId: string; customQuery?: string };
  export let selectedSender: string;
  export let custom: boolean = false;
  $: hidden = selectedSender || option.customQuery || custom ? false : true;
</script>

<button type="button" class:hidden on:click>Disable</button>

<style lang="postcss">
  button {
    @apply flex-auto px-1 py-1 font-medium bg-apple-gray6 rounded text-gray-700;
  }
  button:hover {
    @apply bg-apple-red text-white;
  }
</style>
