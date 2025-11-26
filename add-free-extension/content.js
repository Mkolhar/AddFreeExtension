// --- Add Free Extension - Content Script v1.1 ---
// Waits for the player to load, then blocks ads and restores main video playback.

(function () {
    'use strict';
    console.log("Add Free Extension: Content script injected. Waiting for player...");

    let adBlockerInterval = null;
    let isEnabled = true;

    // The core ad-blocking logic
    function smartAdBlocker() {
        const mainVideoContainer = document.getElementById('video-container');
        const adVideoContainer = document.getElementById('ad-video-container');
        const adUIContainer = document.querySelector('div[data-testid="ad-head"]');

        const isAdActive = (adUIContainer || (adVideoContainer && adVideoContainer.getAttribute('aria-hidden') === 'false'));

        if (isAdActive) {
            console.log("Ad break detected! Taking action.");

            // 1. Silence and remove the ad video player
            if (adVideoContainer) {
                const adVideo = adVideoContainer.querySelector('video');
                if (adVideo) {
                    adVideo.pause();
                    adVideo.muted = true;
                    adVideo.srcObject = null;
                    adVideo.src = '';
                }
                adVideoContainer.remove();
            }

            // 2. Remove all other ad-related UI
            document.querySelectorAll('[data-testid="ad-head"], [data-testid="ad-info"], [data-testid="ads-free-nudge"], .SEEKBAR_TRACK_ADS, [data-testid="cue-marker"]').forEach(el => el.remove());

            // 3. Ensure the main video is visible and playing
            if (mainVideoContainer) {
                const mainVideo = mainVideoContainer.querySelector('video');
                mainVideoContainer.style.visibility = 'visible';
                mainVideoContainer.setAttribute('aria-hidden', 'false');
                if (mainVideo) {
                    if (mainVideo.paused) mainVideo.play();
                    if (mainVideo.muted) mainVideo.muted = false;
                }
            }
        }
    }

    function startBlocker() {
        if (adBlockerInterval) return;
        console.log("Add Free Extension: Activated.");
        adBlockerInterval = setInterval(smartAdBlocker, 150);
    }

    function stopBlocker() {
        if (!adBlockerInterval) return;
        console.log("Add Free Extension: Deactivated.");
        clearInterval(adBlockerInterval);
        adBlockerInterval = null;
    }

    // This function waits until the main video player is loaded in the DOM
    function initialize() {
        const waitForPlayer = setInterval(() => {
            if (document.getElementById('video-container')) {
                clearInterval(waitForPlayer);
                console.log("Add Free Extension: Player detected. Initializing blocker...");
                // Now that the player exists, check storage and start/stop the blocker
                chrome.storage.sync.get('enabled', function (data) {
                    isEnabled = data.enabled !== false;
                    if (isEnabled) {
                        startBlocker();
                    }
                });
            }
        }, 500); // Check every half second
    }

    // Listen for changes from the popup toggle
    chrome.storage.onChanged.addListener(function (changes) {
        if (changes.enabled) {
            isEnabled = !!changes.enabled.newValue;
            if (isEnabled) {
                startBlocker();
            } else {
                stopBlocker();
            }
        }
    });

    initialize();

})();