<script lang="ts">
  import { onMount } from "svelte";
  import Option from "./Option.svelte";
  import Header from "../components/Header.svelte";
  import Tailwind from "../components/Tailwind.svelte";
  import { options } from "../features/options-storage";
  import getOptions from "../features/options";

  let userOptions: { key: string; filterId: string; customQuery?: string }[];
  export let serial: Filter[];

  onMount(async () => {
    userOptions = await getOptions();
    options.syncForm(document.querySelector("form"));
    chrome.storage.onChanged.addListener(async function () {
      userOptions = await getOptions();
    });
  });
</script>

<Tailwind />
<main>
  <form>
    <Header />
    {#if userOptions}
      {#each userOptions as option}
        <Option {option} serialDb={serial} />
      {/each}
    {/if}
  </form>
</main>

<style lang="postcss">
  :global(body) {
    @apply bg-apple-gray6;
  }

  form {
    @apply w-full p-6 mt-8 mb-2 border rounded border-apple-gray5 bg-white;
  }

  main {
    @apply w-2/5 px-4 mx-auto mt-10 pb-10;
    max-width: 960px;
    min-width: 720px;
  }
</style>
