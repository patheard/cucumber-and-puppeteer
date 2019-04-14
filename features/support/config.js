/**
 * Configure the test suite
 * https://github.com/cucumber/cucumber-js/blob/master/docs/support_files/api_reference.md
 */
const { After, AfterAll, Before, BeforeAll, Status, defineParameterType, setDefaultTimeout, setWorldConstructor } = require('cucumber');
const FeatureScope = require('./scope/FeatureScope');
const BrowserScope = require('./scope/BrowserScope');
const { createFolder } = require('./util/FileSystem');

// Timeout, in milliseconds, for puppeteer actions
setDefaultTimeout(10 * 1000);

// `BrowserScope` is provided to all hooks and test steps in a scenario as `this`
setWorldConstructor(BrowserScope)

// Environment variable parameter type
process.env.CHECK_ATTRIBUTE_URL = 'http://localhost:8080/checkAttribute.html';
defineParameterType({
  regexp: /"([^"]*)"/,
  transformer: (string) => {
      let value = string;
      if(string.startsWith('$')){
        value = process.env[string.slice(1)];
      }
      return value;
  },
  name: 'env',
  useForSnippets: false,
  preferForRegexpMatch: true
});

// Keep a consistent web browser and page for all scenarios in a feature file.
const featureScope = new FeatureScope();

// Config object passed to every test
const config = {

  // Environment the tests are running in
  environment: process.env.ENV ? process.env.ENV : '',

  // Root URL to prepend to URLs when using action/openUrl.js with a URL that doesn't include the http(s) protocol
  rootUrl: process.env.ROOT_URL ? process.env.ROOT_URL : '',

  // Path used by checkScreenshot visual regression tests to save and compare screenshotss
  // Defaults to /test/screenshots if a SCREENSHOT_PATH environment variable isn't pressent.  
  screenshotPath: process.env.SCREENSHOT_PATH ? process.env.SCREENSHOT_PATH : './test/screenshots'
}

// Create required folders
BeforeAll(async function(){
  await createFolder(`${config.screenshotPath}/compare`);
  await createFolder(`${config.screenshotPath}/diff`);
  await createFolder(`${config.screenshotPath}/error`);
  await createFolder(`${config.screenshotPath}/ref`);
});


// Use the same BrowserScope object for each scenario in a feature
Before(async function(scenario) {

  // Check if the current scenario is in the same feature test
  const currentFeature = scenario.sourceLocation.uri;
  if(featureScope.isNewFeature(currentFeature))
    await featureScope.init(currentFeature);
  
  this.page = featureScope.browserScope.page;
  this.browser = featureScope.browserScope.browser;
  this.config = config;
});

// After hook for each scenario
After(async function(scenario){
  featureScope.browserScope = this;

  // Take a screenshot if a scenario fails
  if(scenario.result.status === Status.FAILED) {
    const screenShotName = scenario.pickle.name.replace(/[\W_]+/g, '-');
    await this.page.screenshot({
      path: `${config.screenshotPath}/error/${screenShotName}.png`
    });
  }
});

// After all feature tests are complete
AfterAll(async function() {
  await featureScope.browserScope.close();
});
