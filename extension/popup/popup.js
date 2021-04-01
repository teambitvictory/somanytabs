import { createBookmark } from './services/BookmarkService.js';
import { getActiveGroupInfo, getTabsForCurrentWindow } from './services/TabService.js';

const awake = async () => {
  const groupInfo = await getActiveGroupInfo();
  if (groupInfo && groupInfo.title) {
    document.getElementById("inputTitle").value = groupInfo.title
  }

  document.getElementById('all-btn').addEventListener('click', async () => {
    const title = document.getElementById("inputTitle").value;
    const payload = {
      tabs: await getTabsForCurrentWindow(),
    };
    createBookmark(title, payload);
  });

  document.getElementById('group-btn').addEventListener('click', async () => {
    const title = document.getElementById("inputTitle").value;
    const payload = await getActiveGroupInfo();
    createBookmark(title, payload);
  });
};

document.addEventListener('DOMContentLoaded', awake);
