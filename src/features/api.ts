import _ from "lodash";
import cache from "webext-storage-cache";

export function serialize(api: any): Filter[] {
  return _.flatMap(api.senders, (a) => {
    return _.map(a.filters, function (f) {
      return { ...f, sender: a.name };
    });
  });
}

export default async function api(clearCache?: boolean): Promise<Filter[]> {
  if (clearCache) {
    await cache.clear();
  }
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
  const resp = await cache.get("api");
  return serialize(resp);
}
