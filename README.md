# React/Redux Donderstarter

This boilerplate is designed to get you up and running with React/Router/Redux/Sagas workflow, backed up by webpack and unit testing with jest/enzyme.

The primary goal of this boilerplate is to provide a stable foundation upon which to build modern web applications.

## Table of Contents
1. [Requirements](#requirements)
1. [Installation](#installation)
1. [Development](#development)
1. [Project Structure](#project-structure)
1. [Stories with Storybook](#stories-with-storybook)
1. [i18n Support](#i18n-support)
1. [Caveats](#caveats)

## Requirements
* node `^5.0.0`
* yarn `^0.22.0`

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

**All scripts at your disposal:**

|`yarn <script>`    |Description|
|-------------------|-----------|
|`dev`            	|Serves your app at [localhost:9001](http://localhost:9001)|
|`mock-api`			    |Serves a mock api at `localhost:9004` - see [json-server](https://github.com/typicode/json-server) for more|
|`commmit`          |Runs `git-cz`, to help with commit conventions|
|`test`             |Runs unit tests with jest pass `--watch` to watch file changes|
|`open-cov`			    |Opens jest coverage `html` page in the browser|
|`build`            |Builds the application to ./dist folder|
|`start`            |Runs tests, build and serves dist application at [localhost:8080](http://localhost:8080)|
|`release`			    |Generates `CHANGELOG.md` file, bumps `package.json` version and creates tags from conventional commits - see [standard-version](https://github.com/conventional-changelog/standard-version) for more|
|`generate`         |Generates a quick `component` or `container` with input choices|
|`storybook`        |Runs storybook server at [localhost:9002](http://localhost:9002) - see [storybook](https://github.com/storybooks/storybook) for more|
|`storybook:build`  |Builds a static version of storybook to `./docs` folder|
|`open-storybook`   |Runs `storybook:build` and opens storybook static version on `docs/index.html`|

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
│ └── generate                      # File generation scripts
│
└── src                             # Application source code
    ├── assets                      # asset files to be required
    ├── index.html                  # Main HTML page container for app
    ├── index.js                    # Application bootstrap and rendering
    │
    ├── components                  # Global reusable components
    │   └── Component
    │       ├── _styles.scss        # Your component styles (if any)
    │       ├── Component.js        # Pure component source code (easily tested)
    │       ├── Component.test.js   # Component test cases
    │       ├── routes.js           # Your nested routes (if any)
    │       ├── stories.js          # Your component stories (if any)
    │       └── index.js            # Component export (HOC should be added here if any)
    │
    ├── containers                  # Components wrapped by redux/connect
    │   └── Container
    │       ├── _styles.scss        # Your container styles (if any)
    │       ├── Component.js        # Pure Component source code (easily tested)
    │       ├── Component.test.js   # Component test cases
    │       ├── ducks.js            # Reducer, action creators, contstants and middleware
    │       ├── routes.js           # Your nested routes (if any)
    │       ├── sagas.js            # All container related sagas
    │       └── index.js            # Component export with HOC (connect in this case)
    │
    ├── constants                   # Global constants
    │
    ├── store
    │   ├── combinedReducers.js     # Combine all reducers in one place
    │   ├── combinedSagas.js        # Combine all sagas in one place
    │   └── index.js                # Redux store bootstrap
    │
    ├── storybook
    │   └── config.js               # Require your stories in `loadStories`
    │
    ├── styles                      # Global styles
    └── util
        ├── getDefaultHeaders.js    # Helper to inject headers on requests
        └── request.js              # Fetch API handler
```

## Stories with Storybook

If you are working in team maybe it is a good thing to help your team mates how to use your components without much burden. One can also develop theses components without create a dummy view for it. Storybook for the help!

Example component: `components/MyComponent/MyComponent.js`

```javascript
import React from 'react'
import { string, node } from 'prop-types'

const MyComponent = ({ children }) => (
  <div className='myComponent'>
    {children != null
    	? <div>{children}</div>
    	: <div>I am a childless component</div>
    }
  </div>
)

MyComponent.propTypes = {
  /**
   * Children components to be rendered on the right
   */
  children: node
}

export default MyComponent
```

### Adding a story

Create a stories file on your component folder and use Storybook `storiesOf ` to start adding stories, add the minimum requirements component examples and all the other states you think it should be shown.

Note: Component `PropTypes` annotations will be automaticly shown on Storybook.

Write the stories you want to show: `components/MyComponent/stories.js`

```javascript
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import MyComponent from './MyComponent'

storiesOf('MyComponent', module)
  .addDecorator(withInfo({ header: false, inline: true }))
  .add('default', () => (
    <MyComponent />
  ))
  .add('with children', () => (
    <MyComponent>
      <button>Click me!</button>
    </MyComponent>
  ))

```

Finally require your story in Storybook: `storybook/config.js`

```javascript
...
function loadStories () {
  require('../components/MyComponent/stories')
}
...
```

### Running Storybook

To see all stories one can simply run `yarn open-storybook`, this will create a satic version of storybook and open it on your default browser. This is good to see the docs only.

If you're developing the component or making stories for it, run `yarn storybook`, this will crete a server on `localhost:9002` with hot reloading enabled, so we can see changes on the fly for both the component and the story.

## i18n Support

Same boilerplate with `i18n` support is on this [branch](https://github.com/Cloudoki/react-redux-donderstarter/tree/i18n-support). You can create a new project based on `react-redux-donderstarter` with `i18n` support by doing the following:

```bash
$ git clone -b i18n-support https://github.com/Cloudoki/react-redux-donderstarter.git <my-project-name>
$ cd <my-project-name>
$ git checkout master
$ git merge i18n-support
```
Merge into an existing project? Check [Installation](#installation) and point to the `i18n` branch: `react-redux-donderstarter/master` to `react-redux-donderstarter/i18n-support`

### Adding translations

Add the following to `src/util/i18n.js`

```javascript
...

import frLocaleData from 'react-intl/locale-data/fr' // import the locale data

...

import frTranslationMessages from 'translations/fr.json' // import the translations JSON file

...

addLocaleData(frLocaleData) // add locale data to react-intl

export const appLocales = [
  'fr' // add the locale to the array of options
]

...

export const translationMessages = {
  fr: formatTranslationMessages(frTranslationMessages) // export the translations
}
```

You should first add the translation object to your default language file and then copy paste it on the translation file and add the translation to the message like the following:

```javascript
// src/translations/en.json
[
  {
    "id": "homePage.hello",
    "defaultMessage": "Made with ♥ by Cloudoki Team",
    "message": ""
  }
]
```

```javascript
// src/translations/fr.json
[
  {
    "id": "homePage.hello",
    "defaultMessage": "Made with ♥ by Cloudoki Team",
    "message": "Fabriqué avec ♥ par Cloudoki équipe"
  }
]
```

Adding formats to be used on your `FormattedMessages`, add the following to `src/util/i18n.js` formats variable:

```javascript
...

export const formats = {
  number: {
    EUR: {
      style: 'currency',
      currency: 'EUR'
    }
  }
}

...
```

Check [react-intl documentation](https://github.com/yahoo/react-intl/wiki#formatting-data) for more.

## Caveats

Some times `node-sass` have build problems on linux environments, probable solution:

- Bring your node version to `^6.0.0`
- Run `npm rebuild node-sass`
	- You need to run `npm rebuild node-sass` everytime `node-sass` package is installed.
