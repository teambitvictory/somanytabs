import { createBookmark } from './services/BookmarkService.js';
import { getActiveGroupInfo, getTabsForCurrentWindow } from './services/TabService.js';

const awake = () => {
  document.getElementById('all-btn').addEventListener('click', async () => {
    const payload = {
      tabs: await getTabsForCurrentWindow(),
    };
    createBookmark(payload);
  });

  document.getElementById('group-btn').addEventListener('click', async () => {
    const payload = await getActiveGroupInfo();
    createBookmark(payload);
  });
};

document.addEventListener('DOMContentLoaded', awake);
