// Add Free Extension - Popup Logic
// Handles toggle switch and syncs state with Chrome storage

document.addEventListener('DOMContentLoaded', function () {
  const toggleSwitch = document.getElementById('toggleSwitch');
  const statusText = document.getElementById('statusText');

  function updateStatusUI(isEnabled) {
    if (isEnabled) {
      statusText.textContent = "Protection Active";
      statusText.classList.add('active');
    } else {
      statusText.textContent = "Protection Paused";
      statusText.classList.remove('active');
    }
  }

  // Load the saved state and set the toggle accordingly
  chrome.storage.sync.get('enabled', function (data) {
    const isEnabled = data.enabled !== false; // Default to true if undefined
    toggleSwitch.checked = isEnabled;
    updateStatusUI(isEnabled);
  });

  // When the toggle is clicked, save the new state
  toggleSwitch.addEventListener('change', function () {
    const isEnabled = this.checked;
    chrome.storage.sync.set({ enabled: isEnabled });
    updateStatusUI(isEnabled);
  });
});
