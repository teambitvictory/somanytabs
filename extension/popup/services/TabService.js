const getTabsForCurrentWindow = async () => {
  const openTabs = await chrome.tabs.query({
    currentWindow: true,
  });
  return openTabs.map((tab) => tab.url);
};

const getActiveGroupInfo = async () => {
  const currentTab = (await chrome.tabs.query({ active: true, currentWindow: true }))[0];
  const { groupId } = currentTab;

  if (groupId !== undefined && groupId < 0) {
    return undefined;
  }

  const groupInfoPromise = new Promise((resolve) => {
    chrome.tabGroups.get(groupId, async ({ title, color }) => {
      const openTabs = (await chrome.tabs.query({
        currentWindow: true,
      })).filter((tab) => tab.groupId === groupId);
      return resolve({
        tabs: openTabs.map((tab) => tab.url),
        title,
        color,
      });
    });
  });
  return groupInfoPromise;
};

export { getTabsForCurrentWindow, getActiveGroupInfo };
