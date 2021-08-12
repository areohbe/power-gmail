<script lang="ts">
  export let options: SelectOption[];
  export let value: string;
  export let custom: boolean = false;
  export let name: string = undefined;
  export let option: { key: string; filterId: string; customQuery?: string };

  let id = (name ? "filter" : "sender") + option.key;
</script>

<div class="form-control" class:hidden={custom}>
  <label for={id}>Filter</label>
  <select
    {id}
    {name}
    class="form-select focus:outline-none focus:ring-2 focus:ring-apple-blue"
    class:warning={option.key}
    bind:value
    on:change
    on:blur
  >
    <option disabled selected value={null}>Select...</option>
    {#if options}
      {#each options as option}
        <option value={option.value}>{option.text}</option>
      {/each}
    {/if}
  </select>
</div>

<style lang="postcss">
  label {
    @apply hidden pb-2 text-sm font-bold;
  }
  .form-control {
    @apply flex-auto w-1/2;
  }
  .form-select {
    @apply block w-full h-full text-sm rounded border border-apple-gray5 cursor-pointer;
  }
</style>
