import _ from "lodash";
import hotkeys from "hotkeys-js";
import getOptions from "./options";
import fetchApi from "./api";

const HOTKEYS: string = _.toString(_.range(1, 9));
const BASE_URL: string = "https://mail.google.com/mail/u/0/#search/";

function getFilterQuery(filterId: string, api: Filter[]): string {
  const filter = _.find(api, ["id", filterId]);
  return filter && filter.query;
}

function setUserOptionsPrompt() {
  const setOptionsPrompt = confirm(
    'Power Gmail options not set. Press "OK" to configure.'
  );
  if (setOptionsPrompt) {
    chrome.runtime.openOptionsPage();
  }
}

export async function registerShortcuts(): Promise<void> {
  const userOptions = await getOptions();
  hotkeys(HOTKEYS, (_event, handler) => {
    if (_.isEmpty(userOptions)) {
      setUserOptionsPrompt();
      return;
    }
    if (!handler.key) return;
    chrome.runtime.sendMessage({ key: handler.key });
  });
}

export function formatQueryUrl(
  baseUrl: string,
  query: string,
  inbox: boolean
): string {
  const i = inbox ? " label:inbox" : "";
  return `${baseUrl}${encodeURIComponent(query + i)}`;
}

export async function shortcutHandler(): Promise<void> {
  chrome.runtime.onMessage.addListener(async function (
    request,
    _sender,
    _sendResponse
  ) {
    if (!_.includes(HOTKEYS, request.key)) return;

    const options = await getOptions();
    const api = await fetchApi();
    const filterId = _.get(_.find(options, { key: request.key }), "filterId");
    const customQuery = _.get(
      _.find(options, { key: request.key }),
      "customQuery"
    );
    const query = filterId ? getFilterQuery(filterId, api) : customQuery;

    if (!query) {
      console.info(`No filter found for ${request.key}`);
      return;
    }

    chrome.tabs.query({ currentWindow: true, active: true }, function () {
      chrome.tabs.update({ url: formatQueryUrl(BASE_URL, query, true) });
    });
  });
}
