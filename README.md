# React/Redux Donderstarter

This boilerplate is designed to get you up and running with React/Router/Redux/Sagas workflow, backed up by webpack and unit testing with jest/enzyme.

The primary goal of this boilerplate is to provide a stable foundation upon which to build modern web applications.

## Table of Contents
1. [Requirements](#requirements)
1. [Installation](#installation)
1. [Development](#development)
1. [Project Structure](#project-structure)
1. [i18n Support](#i18n-support)

## Requirements
* node `^10.0.0`
* yarn `1.0.0`

## Installation

After confirming that your environment meets the above [requirements](#requirements), you can create a new project based on `react-redux-donderstarter` by doing the following:

```bash
$ git clone https://github.com/Cloudoki/react-redux-donderstarter.git <my-project-name>
$ cd <my-project-name>
```

When that's done, install the project dependencies. It is recommended that you use [Yarn](https://yarnpkg.com/) for deterministic dependency management, but `npm install` will suffice.

```bash
$ yarn  # Install project dependencies (or `npm install`)
```

You can also merge `react-redux-donderstarter` into an existing project by doing the following:

```bash
$ cd path/to/existing-project-folder
$ git remote add react-redux-donderstarter https://github.com/Cloudoki/react-redux-donderstarter.git
$ git fetch react-redux-donderstarter
$ git merge --allow-unrelated-histories react-redux-donderstarter/master # or whichever branch you want to merge
$ git remote remove react-redux-donderstarter
```

Note: if you have files with the same name as `react-redux-donderstarter` those might get some merge conflicts, most common are the `README.md` - fix the conflicts and then:

```bash
$ git commit
$ git push
```

## Development

After completing the [installation](#installation) step, you're ready to start developing your App!

**Start by adding your first file in the root of the project:**

`.env`

```bash
# Your .env files can include sensitive information.
# Because of this, `dotenv-webpack` will only expose environment
# variables that are explicitly referenced in your code to your final bundle.
# see more here: https://github.com/mrsteele/dotenv-webpack#description

# API url
API_URL = 'http://localhost:9004'
```
If you look at `src/constants/endpoints.js` you will see a reference to `process.env.API_URL`, use it to make calls to mock API :D

**Runing the project in `development` mode:**

```bash
$ yarn dev  # or `npm run dev`
```

Hot reloading is enabled by default for both **JavaScript** and **SCSS** files.

[reactotron](https://github.com/infinitered/reactotron) is enabled in development. Download the appropriate release for your environment [here](https://github.com/infinitered/reactotron/releases).

**All scripts at your disposal:**

|`yarn <script>`    |Description|
|-------------------|-----------|
|`dev`            	|Serves your app at [localhost:9001](http://localhost:9001)|
|`mock-api`			    |Serves a mock api at `localhost:9004` - see [json-server](https://github.com/typicode/json-server) for more|
|`commmit`          |Runs `git-cz`, to help with commit conventions|
|`test`             |Runs unit tests with jest pass `--watch` to watch file changes|
|`open-cov`			    |Opens test coverage `html` page in the browser|
|`build`            |Builds the application to ./dist folder|
|`start`            |Runs tests, build and serves dist application at [localhost:8080](http://localhost:8080)|
|`release`			    |Generates `CHANGELOG.md` file, bumps `package.json` version and creates tags from conventional commits - see [standard-version](https://github.com/conventional-changelog/standard-version) for more|

## Project Structure

Containers use the [ducks](https://github.com/erikras/ducks-modular-redux) approach, with small changes. Instead of having the effects in the `ducks.js` file we preserve the sagas file to prevent our files of having more than 150/200 lines of code each and be easier to debug/read them. The other small change to this approach is that the middleware is also present in the `ducks.js` file, because we don't expect to have more than a couple per container, normally just one. 

All files are in the relative folder and imported when needed with the help of `webpack resolve`.

Ex: `import App from 'components/App'`

```
.
├── __mocks__                       # Unit tests mocks and db file
├── dist                            # All build-related source code
│
├── internals                       # Project development configurations
│ └── jest                          # Tests setups and shims
│
└── src                             # Application source code
    ├── assets                      # asset files to be required
    ├── index.html                  # Main HTML page container for app
    ├── index.tsx                   # Application bootstrap and rendering
    │
    ├── components                  # Global reusable components
    │   └── Component
    │       ├── styles.scss         # Your component styles (if any)
    │       ├── Component.tsx       # Pure component source code (easily tested)
    │       ├── Component.test.js   # Component test cases
    │       ├── routes.tsx          # Your nested routes (if any)
    │       ├── types.ts            # Component types (if any)
    │       └── index.tsx           # Component export (HOC should be added here if any)
    │
    ├── containers                  # Components wrapped by redux/connect
    │   └── Container
    │       ├── styles.scss         # Your container styles (if any)
    │       ├── Component.tsx       # Pure Component source code (easily tested)
    │       ├── Component.test.js   # Component test cases
    │       ├── ducks.ts            # Reducer, action creators, contstants and middleware
    │       ├── routes.tsx          # Your nested routes (if any)
    │       ├── sagas.ts            # All container related sagas
    │       ├── types.ts            # Container types (if any)
    │       └── index.tsx           # Component export with HOC
    │
    ├── constants                   # Global constants
    │
    ├── store
    │   ├── combinedReducers.ts     # Combine all reducers in one place
    │   ├── combinedSagas.ts        # Combine all sagas in one place
    │   └── index.ts                # Redux store bootstrap
    │
    ├── styles                      # Global styles
    └── util
        ├── getDefaultHeaders.ts    # Helper to inject headers on requests
        └── request.ts              # Fetch API handler
```

## i18n Support

*Adding `fr-FR` translations*

Add `fr` to `webpackInclude` regex:

```typescript
// components/Localization/Provider.tsx

...

if (normalizedLocale !== 'en') {
  await import(
    /* webpackChunkName: "locale-[request]", webpackInclude: /(pt|nl|fr)\.js$/ */ // <--- here
    `moment/locale/${normalizedLocale}.js`
  )
}
```

Add the locale to the `appLocales` array and Locale type:

```typescript
// components/Localization/types.ts

...

export type Locales = 'en-US' | 'pt-PT' | 'nl-NL' | 'fr-FR' // <-- here

```

```typescript
// components/Localization/context.ts

...

export const defaultContextState: I18nContextState = {
  initLoad: true,
  locale: 'en-US',
  appLocales: ['en-US', 'pt-PT', 'nl-NL', 'fr-FR'], // <-- here
  seti18n: async () => undefined,
  strings: () => '',
}
```

You should first add the translation object to your default language file and then copy paste it on the translation file and add the translation to the message like the following:

```json
// translations/en-US.json

{
  "homePage": {
    "madeWlove": "Made with ♥ by Cloudoki Team"
  }
}
```

```json
// translations/fr-FR.json

{
  "homePage": {
    "madeWlove": "Fabriqué avec ♥ par Cloudoki équipe"
  }
}
```
