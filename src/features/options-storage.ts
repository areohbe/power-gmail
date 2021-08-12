import _ from 'lodash'
import OptionsSync from "webext-options-sync";
import { serialize } from "./api";
import cache from "webext-storage-cache";

async function api() {
    if (!(await cache.has("api"))) {
      const cachableItem = await fetch(
        "https://areoh.be/power-gmail/api.json"
      )
        .then((response) => response.json())
        .then((json) => {
          return json;
        });
      await cache.set("api", cachableItem, {
        days: 1,
      });
    }
    return await cache.get("api");
}

function getFilterId(
  sender: string,
  filterName: string,
  api: Filter[]
): string | undefined {
  const filter = _.find(api, { sender: sender, name: filterName });
  return filter && filter.id;
}

export async function generateDefaultConfig(): Promise<SyncOptions> {
  const db = serialize(await api());
  return {
    "1": getFilterId("All", "Unread", db),
    "2": getFilterId("Google Calendar", "Invitations", db),
    "3": getFilterId("All", "Last 7 days", db),
    "4": getFilterId("Dropbox Paper", "All", db),
    "5": null,
    "6": null,
    "7": null,
    "8": null,
    "9": null,
    custom_1: "",
    custom_2: "",
    custom_3: "",
    custom_4: "",
    custom_5: "",
    custom_6: "",
    custom_7: "",
    custom_8: "",
    custom_9: "",
  };
}

const defaults = await generateDefaultConfig();

const migrations = [];

export const options = new OptionsSync({ defaults, migrations });
