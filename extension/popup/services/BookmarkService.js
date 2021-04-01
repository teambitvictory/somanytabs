const createBookmark = (title, urlPayload) => {
  const BASE_URL = 'http://localhost:8081';
  const url = `${BASE_URL}?session=${encodeURIComponent(JSON.stringify(urlPayload))}`;
  chrome.bookmarks.create({
    url,
    title,
    parentId: '1', // Bookmarks bar
  });
};

const generateBookmarkName = async (numberOfTabs) => {
  const currentTab = (await chrome.tabs.query({ active: true, currentWindow: true }))[0];
  const date = new Date().toLocaleDateString('en-US');
  const tabs = (numberOfTabs === 1) ? 'Tab' : 'Tabs';
  return `[${numberOfTabs} ${tabs}] ${date} - ${currentTab.title}`;
};

export { createBookmark, generateBookmarkName };
