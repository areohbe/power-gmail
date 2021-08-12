<script lang="ts">
  import Tailwind from "../components/Tailwind.svelte";

  export let key: string;
  export let small = false;

  const symbols = {
    "1": "!",
    "2": "@",
    "3": "#",
    "4": "$",
    "5": "%",
    "6": "^",
    "7": "&",
    "8": "*",
    "9": "(",
  };
</script>

<Tailwind />
<div class="key" class:small class:p-0.5={small}>
  <span
    class="block w-full my-auto text-xs leading-tight text-gray-600"
    class:leading-none={small}
    class:hidden={small}
  >
    {symbols[key]}</span
  >
  <span
    class="block w-full font-semibold"
    class:text-sm={!small}
    class:pt-1={small}>{key}</span
  >
</div>

<style lang="postcss">
  .key {
    @apply inline-block p-1 text-center border border-apple-gray5 rounded;
    max-height: 44px;
    max-width: 44px;
    min-height: 44px;
    min-width: 44px;
  }
  .key.small {
    max-height: 32px;
    max-width: 32px;
    min-height: 32px;
    min-width: 32px;
  }
</style>
