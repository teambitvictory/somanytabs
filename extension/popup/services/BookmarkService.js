const createBookmark = (title, urlPayload) => {
  const BASE_URL = 'http://localhost:8081';
  const url = `${BASE_URL}?session=${encodeURIComponent(JSON.stringify(urlPayload))}`;
  chrome.bookmarks.create({
    url,
    title,
    parentId: '1', // Bookmarks bar
  });
};

export { createBookmark };
