const addTabsToGroups = async (originalTabId, url, originalIndex) => {
  const session = (new URLSearchParams((new URL(url)).search)).get('session');
  const { tabs, title, color } = JSON.parse(decodeURIComponent(session));

  // Open tabs
  const createdTabs = await Promise.all(tabs.map((tabUrl, offset) => chrome.tabs.create({
    url: tabUrl,
    index: originalIndex + offset + 1,
  })));

  // Create group
  const groupId = await chrome.tabs.group({
    tabIds: createdTabs.map((tab) => tab.id),
  });
  await chrome.tabGroups.update(groupId, {
    color,
    title,
  });

  // Close the original tab
  chrome.tabs.remove(originalTabId);
};

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request !== 'CREATE_TABS') {
      return;
    }
    const { id, url, index } = sender.tab;
    addTabsToGroups(id, url, index);
    sendResponse();
  },
);
