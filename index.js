const awake = () => {
  if (document.body.getAttribute('extension-available')) {
    // Extension takes over, no further handling required
    return;
  }

  const session = (new URLSearchParams(window.location.search)).get('session');
  const { tabs } = JSON.parse(decodeURIComponent(session));

  const newTabs = tabs.map((url) => window.open(url));

  if (newTabs.some((newTab) => (
    !newTab || newTab.closed || newTab.closed == null
  ))) {
    // Popups blocked
    // TODO
    console.error('Popups are being blocked');
  }
};

window.addEventListener('load', awake);
