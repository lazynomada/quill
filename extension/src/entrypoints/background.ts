export default defineBackground(() => {
  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
    chrome.tabs.sendMessage(tabId, changeInfo)
  })
});
