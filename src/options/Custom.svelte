<script lang="ts">
  export let option: { key: string; filterId: string; customQuery?: string };
  export let selectedSender: string;
  export let custom: boolean = false;
  $: hidden =
    selectedSender || option.filterId || option.customQuery || custom
      ? true
      : false;
</script>

<button type="button" class:hidden on:click>Custom</button>

<style lang="postcss">
  button {
    @apply flex-auto px-1 py-1 font-medium text-gray-700 bg-apple-gray6 rounded shadow-sm;
  }

  button:hover {
    @apply bg-apple-blue text-white;
  }

  .hidden {
    display: none;
  }
</style>
