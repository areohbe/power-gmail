<script lang="ts">
  export let custom: boolean = true;
  export let value: string = "";
  export let option: { key: string; filterId: string; customQuery?: string };
</script>

<input
  class="form-text focus:ring-2 focus:ring-apple-blue"
  type="text"
  name={`custom_${option.key}`}
  bind:value
  class:hidden={!custom}
  placeholder="Search query"
/>

<style lang="postcss">
  .form-text {
    @apply block w-full h-full text-sm border border-apple-gray5 rounded font-mono;
  }
  .hidden {
    display: none;
  }
</style>
