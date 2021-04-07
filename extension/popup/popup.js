import { createBookmark, generateBookmarkName } from './services/BookmarkService.js';
import { getActiveGroupInfo, getTabsForCurrentWindow } from './services/TabService.js';

const getTitleInput = () => document.getElementById('inputTitle');

const getBookmarkTitle = async (numberOfTabs) => ((getTitleInput().value)
  ? getTitleInput().value : generateBookmarkName(numberOfTabs));

const prepareUI = async () => {
  const groupInfo = await getActiveGroupInfo();
  if (!groupInfo) {
    const element = document.getElementById('group-btn');
    element.classList.add('opacity-50');
  }
  if (groupInfo && groupInfo.title && groupInfo.title.length) {
    getTitleInput().placeholder = groupInfo.title;
  } else {
    const tabs = await getTabsForCurrentWindow();
    const title = await getBookmarkTitle(tabs.length);
    getTitleInput().placeholder = title;
  }
};

const awake = async () => {
  prepareUI();

  document.getElementById('all-btn').addEventListener('click', async () => {
    const payload = {
      tabs: await getTabsForCurrentWindow(),
    };
    let title = getTitleInput().placeholder;
    if (getTitleInput().value && getTitleInput().value.length) {
      title = getTitleInput().value;
    }
    createBookmark(title, payload);
  });

  document.getElementById('group-btn').addEventListener('click', async () => {
    const payload = await getActiveGroupInfo();
    let title = getTitleInput().placeholder;
    if (getTitleInput().value && getTitleInput().value.length) {
      title = getTitleInput().value;
    }
    createBookmark(title, payload);
  });
};

document.addEventListener('DOMContentLoaded', awake);
