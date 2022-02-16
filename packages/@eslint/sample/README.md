Specifying Environments
An environment provides predefined global variables. The available environments are:

> browser - browser global variables.
> node - Node.js global variables and Node.js scoping.
> commonjs - CommonJS global variables and CommonJS scoping (use this for browser-only code that uses Browserify/WebPack).
> shared-node-browser - Globals common to both Node.js and Browser.
> es6 - enable all ECMAScript 6 features except for modules (this automatically sets the ecmaVersion parser option to 6).
> es2016 - adds all ECMAScript 2016 globals and automatically sets the ecmaVersion parser option to 7.
> es2017 - adds all ECMAScript 2017 globals and automatically sets the ecmaVersion parser option to 8.
> es2018 - adds all ECMAScript 2018 globals and automatically sets the ecmaVersion parser option to 9.
> es2019 - adds all ECMAScript 2019 globals and automatically sets the ecmaVersion parser option to 10.
> es2020 - adds all ECMAScript 2020 globals and automatically sets the ecmaVersion parser option to 11.
> es2021 - adds all ECMAScript 2021 globals and automatically sets the ecmaVersion parser option to 12.
> es2022 - adds all ECMAScript 2022 globals and automatically sets the ecmaVersion parser option to 13.
> worker - web workers global variables.
> amd - defines require() and define() as global variables as per the amd spec.
> mocha - adds all of the Mocha testing global variables.
> jasmine - adds all of the Jasmine testing global variables for version 1.3 and 2.0.
> jest - Jest global variables.
> phantomjs - PhantomJS global variables.
> protractor - Protractor global variables.
> qunit - QUnit global variables.
> jquery - jQuery global variables.
> prototypejs - Prototype.js global variables.
> shelljs - ShellJS global variables.
> meteor - Meteor global variables.
> mongo - MongoDB global variables.
> applescript - AppleScript global variables.
> nashorn - Java 8 Nashorn global variables.
> serviceworker - Service Worker global variables.
> atomtest - Atom test helper globals.
> embertest - Ember test helper globals.
> webextensions - WebExtensions globals.
> greasemonkey - GreaseMonkey globals.
