import { shortcutHandler } from "../features/shortcuts";

shortcutHandler();

chrome.runtime.onMessage.addListener(function (
  request,
  _sender,
  _sendResponse
) {
  if (request.action === "GO_TO_OPTIONS") {
    chrome.runtime.openOptionsPage();
  }
});

chrome.storage.onChanged.addListener(function (changes) {
  console.log(changes);
});

export {};
