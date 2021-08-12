<script lang="ts">
  import Header from "../components/Header.svelte";
  import Tailwind from "../components/Tailwind.svelte";

  function send(action?: string, message?: string) {
    chrome.runtime.sendMessage({ action: action, message: message });
  }
</script>

<Tailwind />
<main class="p-4 w-80">
  <Header />
  <button
    on:click={() => send("GO_TO_OPTIONS")}
    class="items-center w-full btn btn-blue">Options</button
  >
</main>

<style lang="postcss">
  .btn {
    @apply font-bold py-2 px-2 rounded text-sm bg-apple-gray5 text-gray-700;
  }

  .btn-blue:hover {
    @apply bg-apple-blue text-white;
  }
</style>
