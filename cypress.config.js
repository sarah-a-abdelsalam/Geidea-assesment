const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('before:browser:launch', (browser, launchOptions) => {
  if (browser.family === 'chromium') {
    launchOptions.args.push('--disable-blink-features=AutomationControlled')
    launchOptions.args.push('--disable-extensions')
    launchOptions.args.push('--disable-popup-blocking')
    launchOptions.args.push('--disable-notifications')
    launchOptions.args.push('--lang=en-US')
  }
  return launchOptions
})
    }}}
);