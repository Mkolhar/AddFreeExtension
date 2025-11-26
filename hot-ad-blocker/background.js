// This script runs in the background and injects the ad blocker script onto Hotstar pages.

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Check if the page has finished loading and the URL is a Hotstar watch page
  if (changeInfo.status === 'complete' && tab.url && tab.url.includes('hotstar.com/') && tab.url.includes('/watch')) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['content.js']
    });
  }
});
