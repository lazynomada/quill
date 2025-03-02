export default function TabListener(cb: (info: chrome.tabs.TabChangeInfo) => void) {
    const handler = (info: chrome.tabs.TabChangeInfo) => cb(info);

    chrome.runtime.onMessage.addListener(handler)
    return () => chrome.runtime.onMessage.removeListener(handler);
}