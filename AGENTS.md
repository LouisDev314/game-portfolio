## Browser automation

For local UI testing, use Playwright with its managed Chromium browser.

Do not launch or attach to my normal Google Chrome or Comet browser profile.

Always:
1. Launch an isolated Playwright Chromium instance.
2. Perform the requested browser testing.
3. Close all browser contexts.
4. Close the browser process before completing the task.

Use Comet only for research or general web browsing, not automated localhost UI testing.
