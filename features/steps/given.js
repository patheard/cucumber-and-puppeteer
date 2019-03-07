const { Given } = require('cucumber');
const checkAttribute = require('../support/check/checkAttribute');
const checkContainsText = require('../support/check/checkContainsText');
const checkElementEnabled = require('../support/check/checkElementEnabled');
const checkElementExists = require('../support/check/checkElementExists');
const checkElementValue = require('../support/check/checkElementValue');
const checkElementVisible = require('../support/check/checkElementVisible');
const checkIsEmpty = require('../support/check/checkIsEmpty');
const checkUrl = require('../support/check/checkUrl');
const checkHasFocus = require("../support/check/checkHasFocus");
const checkIsChecked = require('../support/check/checkIsChecked');
const checkCookieExists = require("../support/check/checkCookieExists");
const checkCookieContents = require("../support/check/checkCookieContents");

Given(
    /^the element "([^"]*)?" is( not)* visible$/,
    checkElementVisible
);

Given(
    /^the element "([^"]*)?" value is( not)? "([^"]*)?"$/,
    checkElementValue
);

Given(
    /^the page url is( not)? "([^"]*)?"$/,
    checkUrl
);

Given(
    /^the attribute "([^"]*)?" from element "([^"]*)?" is( not)* "([^"]*)?"$/,
    checkAttribute
);

Given(
    /^the element "([^"]*)"( does not)? contains? text "([^"]*)"$/, 
    checkContainsText
);

Given(
    /^element "([^"]*)?" is( not)* on the page$/,
    checkElementExists
);

Given(
    /^the element "([^"]*)?" is( not)* empty$/,
    checkIsEmpty
);

Given(
    /^the element "([^"]*)?" is( not)* checked$/,
    checkIsChecked
);

Given(
    /^the element "([^"]*)?" has( no)* focus$/,
    checkHasFocus
);

Given(
    /^the element "([^"]*)?" is( not)* enabled$/,
    checkElementEnabled
);

Given(
    /^the cookie "([^"]*)?" contains( not)* the value "([^"]*)?"$/,
    checkCookieContents
);

Given(
    /^the cookie "([^"]*)?" does( not)* exists$/,
    checkCookieExists
);