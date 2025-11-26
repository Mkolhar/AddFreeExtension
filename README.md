# Add Free Extension

A lightweight, efficient Chrome extension designed to improve your viewing experience on Hotstar by seamlessly removing interruptions.

## Overview

Add Free Extension is built to intelligently detect and handle ad breaks during video playback. Unlike generic ad blockers that might break the player or trigger anti-adblock warnings, this extension is tailored specifically for the Hotstar player architecture. It monitors the video state and surgically removes ad containers while ensuring the main content keeps playing without a hitch.

## Key Features

*   **Smart Ad Detection**: Continuously monitors the DOM for ad-specific containers and attributes (like `ad-video-container` or specific test IDs).
*   **Instant Resume**: Automatically pauses and mutes ad streams, removes them, and forces the main video to resume immediately.
*   **UI Cleanup**: Removes visual clutter associated with ads, such as yellow seekbar markers, ad countdowns, and "ad-free" nudges.
*   **Toggle Control**: Includes a simple popup interface to quickly enable or disable the blocking functionality without uninstalling.

## Installation

Since this is a custom extension, you'll need to install it in Developer Mode:

1.  **Download the Code**: Clone this repository or download the source code to your local machine.
2.  **Open Extensions Management**: In Google Chrome, navigate to `chrome://extensions/` (or click the puzzle piece icon > Manage Extensions).
3.  **Enable Developer Mode**: Toggle the switch in the top-right corner of the page.
4.  **Load Unpacked**: Click the "Load unpacked" button that appears in the top-left.
5.  **Select Directory**: Browse to and select the `add-free-extension` folder within this project directory.

The extension should now appear in your list and be active on Hotstar.

## How It Works

The extension uses a Manifest V3 architecture with a service worker (`background.js`) that injects the content script only when you visit a Hotstar watch page.

The core logic (`content.js`) operates on a polling mechanism that:
1.  Waits for the main video player to initialize.
2.  Checks for the presence of ad layers.
3.  If an ad is detected, it removes the ad DOM elements and programmatically plays the main video element.

## Usage

Just watch your favorite content! The blocker runs automatically. If you ever need to disable it (for debugging or support), simply click the extension icon in your toolbar and toggle the switch.

---
*Note: This project is for educational purposes and personal use.*
