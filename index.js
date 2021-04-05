const byId = document.getElementById.bind(document);
const show = (id, shouldShow = true) => { byId(id).style.display = (shouldShow ? 'block' : 'none'); };

const getOpenTabsCallback = (tabs) => () => {
  if (document.body.getAttribute('extension-available')) {
    // Extension takes over, no further handling required
    document.body.dispatchEvent(new Event('OPEN_TABS'));
    return;
  }

  const newTabs = tabs.map((url) => window.open(url));

  if (newTabs.some((newTab) => (
    !newTab || newTab.closed || newTab.closed == null
  ))) {
    // Popups blocked
    show('permission');
  }
  show('extension');
};

const awake = () => {
  const session = (new URLSearchParams(window.location.search)).get('session');
  const { tabs } = JSON.parse(decodeURIComponent(session));
  const openTabs = getOpenTabsCallback(tabs);

  const allowedBookmarks = JSON.parse(localStorage.getItem('smt.allowedBookmarks') || '[]');
  if (allowedBookmarks.some((bookmark) => bookmark === tabs.join('; '))) {
    openTabs();
  } else {
    // Ask for permission first
    byId('confirmation-url-list').innerHTML = tabs.map((tab) => `<li>${tab}</li>`).join('');
    byId('confirmation-btn').addEventListener('click', async () => {
      localStorage.setItem(
        'smt.allowedBookmarks',
        JSON.stringify([...allowedBookmarks, tabs.join('; ')]),
      );
      show('confirmation', false);
      openTabs();
    });
    show('confirmation');
  }
};

window.addEventListener('load', awake);
