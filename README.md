# React/Redux Donderstarter

This boilerplate is designed to get you up and running with the absolute minimum of React/Router/Redux/Sagas workflow. This branch is lacking multiple features from the main branch, and focuses only on the React/Redux basics but including sagas & ducks pre-setup.

## Table of Contents
1. [Requirements](#requirements)
1. [Installation](#installation)
1. [Development](#development)
1. [Project Structure](#project-structure)

## Requirements
* node `^12.0.0`
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
|`commmit`          |Runs `git-cz`, to help with commit conventions|
|`test`             |Runs unit tests with jest pass `--watch` to watch file changes|
|`build`            |Builds the application to ./dist folder|
|`start`            |Runs tests, build and serves dist application at [localhost:8080](http://localhost:8080)|
|`release`			    |Generates `CHANGELOG.md` file, bumps `package.json` version and creates tags from conventional commits - see [standard-version](https://github.com/conventional-changelog/standard-version) for more|

## Project Structure

Containers use the [ducks](https://github.com/erikras/ducks-modular-redux) approach, with small changes. Instead of having the effects in the `ducks.js` file we preserve the sagas file to prevent our files of having more than 150/200 lines of code each and be easier to debug/read them. The other small change to this approach is that the middleware is also present in the `ducks.js` file, because we don't expect to have more than a couple per container, normally just one. 

All files are in the relative folder and imported when needed with the help of `webpack resolve`.

Ex: `import App from 'components/App'`

```
.
├── dist                            # All build-related source code
││
└── src                             # Application source code
    ├── assets                      # asset files to be required
    ├── index.html                  # Main HTML page container for app
    ├── index.js                    # Application bootstrap and rendering
    │
    ├── components                  # Global reusable components
    │   └── Component
    │       ├── _styles.scss        # Your component styles (if any)
    │       └── index.js            # Component code
    ├── containers                  # Components wrapped by redux/connect
    │   └── Container
    │       ├── _styles.scss        # Your container styles (if any)
    │       ├── ducks.js            # Reducer, action creators, contstants and middleware
    │       ├── routes.js           # Your nested routes (if any)
    │       ├── sagas.js            # All container related sagas
    │       └── index.js            # Component code
    │
    ├── constants                   # Global constants
    │
    ├── store
    │   ├── combinedReducers.js     # Combine all reducers in one place
    │   ├── combinedSagas.js        # Combine all sagas in one place
    │   └── index.js                # Redux store bootstrap
    ││
    ├── styles                      # Global styles
    └── util
        ├── getDefaultHeaders.js    # Helper to inject headers on requests
        └── request.js              # Fetch API handler
```
