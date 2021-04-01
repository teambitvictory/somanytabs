import { createBookmark } from './services/BookmarkService.js';
import { getActiveGroupInfo, getTabsForCurrentWindow, generateBookmarkName } from './services/TabService.js';

const getBookmarkTitle = async (payload) => {
  return (document.getElementById("inputTitle").value)? document.getElementById("inputTitle").value: await generateBookmarkName(payload.tabs.length);   
}

const awake = async () => {
  const groupInfo = await getActiveGroupInfo();
  if (groupInfo && groupInfo.title) {
    document.getElementById("inputTitle").value = groupInfo.title
  } else {
    document.getElementById('group-btn').disabled = true;
  }

  document.getElementById('all-btn').addEventListener('click', async () => {
    const payload = {
      tabs: await getTabsForCurrentWindow(),
    };
    const title = await getBookmarkTitle(payload)
    createBookmark(title, payload);
  });

  document.getElementById('group-btn').addEventListener('click', async () => {
    const payload = await getActiveGroupInfo();
    const title = await getBookmarkTitle(payload)
    createBookmark(title, payload);
  });
};

document.addEventListener('DOMContentLoaded', awake);
