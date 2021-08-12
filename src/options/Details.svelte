<script lang="ts">
  import _ from "lodash";

  function getFilterReadable(id: string, db: Database): string {
    const filters = _.flatMap(db.senders, "filters");
    return _.get(_.find(filters, ["id", id]), "readable");
  }

  export let option: Shortcut;
  export let db: Database;

  $: readable = getFilterReadable(option.filterId, db);
</script>

<div class="pt-0.5 pb-3">
  <p class="italic text-gray-700 " class:invisible={!readable}>
    {readable && readable}
  </p>
</div>

<style>
  p {
    padding-left: 64px;
  }
</style>
