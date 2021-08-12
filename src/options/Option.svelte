<script lang="ts">
  import _ from "lodash";
  import { options } from "../features/options-storage";
  import Key from "./Key.svelte";
  import Disable from "./Disable.svelte";
  import Select from "./Select.svelte";
  import Custom from "./Custom.svelte";
  import Input from "./Input.svelte";

  async function disable() {
    await options.set({ [option.key]: null, [`custom_${option.key}`]: "" });
    selectedSender = null;
    custom = false;
  }

  function getFilterOptions(
    sender: string,
    serialDb: Filter[]
  ): SelectOption[] {
    const filters = _.filter(serialDb, ["sender", sender]);
    return _.map(filters, (f) => {
      return {
        text: f.name,
        value: f.id,
      };
    });
  }

  function getSenders(api: Filter[]): SelectOption[] {
    return _.uniqWith(
      _.map(api, (s) => {
        return {
          value: s.sender,
          text: s.sender,
        };
      }),
      _.isEqual
    );
  }
  function getSender(filterId: string, api: Filter[]): string {
    return _.get(_.find(api, ["id", filterId]), "sender", null);
  }

  export let serialDb: Filter[];
  export let option: {
    key: string;
    filterId: string;
    customQuery?: string;
  };

  let custom: boolean = !_.isEmpty(option.customQuery) ? true : false;
  let senders: SelectOption[] = getSenders(serialDb);
  let selectedSender: string = getSender(option.filterId, serialDb);
  $: filterOptions = getFilterOptions(selectedSender, serialDb);
</script>

<div class="flex gap-2 mb-2 option">
  <Key key={option.key} />
  <div class="flex w-full gap-2">
    <Select
      {custom}
      {option}
      options={senders}
      bind:value={selectedSender}
      on:change={() => (option.filterId = null)}
      on:blur={() => (option.filterId = null)}
    />
    <Select
      {option}
      {custom}
      name={option.key}
      options={filterOptions}
      bind:value={option.filterId}
    />
    <Input {option} {custom} bind:value={option.customQuery} />
  </div>
  <div class="flex justify-center w-20 py-2">
    <Custom
      {custom}
      {selectedSender}
      {option}
      on:click={() => (custom = true)}
    />
    <Disable {custom} {option} {selectedSender} on:click={disable} />
  </div>
</div>
