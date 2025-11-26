// Hot Ad Blocker - Popup Logic
// Handles toggle switch and syncs state with Chrome storage

document.addEventListener('DOMContentLoaded', function() {
  const toggleSwitch = document.getElementById('toggleSwitch');

  // Load the saved state and set the toggle accordingly
  chrome.storage.sync.get('enabled', function(data) {
    toggleSwitch.checked = !!data.enabled;
  });

  // When the toggle is clicked, save the new state
  toggleSwitch.addEventListener('change', function() {
    chrome.storage.sync.set({enabled: this.checked});
  });
});
