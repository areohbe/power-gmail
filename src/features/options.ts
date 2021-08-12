import _ from "lodash";
import { options } from "./options-storage";

function shortcuts(opts) {
  return _.pick(
    opts,
    _.map(_.range(0, 10), (v) => _.toString(v))
  );
}

export async function isNewUpdate(): Promise<string | boolean> {
  const opts = await options.getAll();
  return _.get(opts, "newUpdate", false);
}

export default async function getOptions(): Promise<
  {
    key: string;
    filterId: string;
    custom_query?: string;
  }[]
> {
  const opts = await options.getAll();
  return _.map(shortcuts(opts), (v, k) => {
    const customQuery = _.get(opts, `custom_${k}`, null);
    return {
      key: k,
      filterId: v,
      customQuery: _.isEmpty(customQuery) ? "" : customQuery,
    };
  });
}
