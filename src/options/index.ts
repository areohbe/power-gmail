import _ from "lodash";
import fetchApi from "../features/api";
import Options from "./Options.svelte";

const api = await fetchApi();

const app = new Options({
  target: document.body,
  props: {
    serial: api,
  },
});

export default app;
