// Set a custom attribute on the body to communicate with the app
// This is quite dirty but an easy way to avoid script injection
document.body.setAttribute('extension-available', true);

// Inform the bg script to handle the payload
chrome.runtime.sendMessage('CREATE_TABS', () => {});
