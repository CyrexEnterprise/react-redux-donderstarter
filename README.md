# React/Redux Donderstarter

This boilerplate is designed to get you up and running with React/Router/Redux/Sagas workflow, backed up by webpack and unit testing with jest/enzyme.

The primary goal of this boilerplate is to provide a stable foundation upon which to build modern web applications.

## Table of Contents
1. [Requirements](#requirements)
1. [Installation](#instalation)
1. [Development](#development)
1. [Project Structure](#project-structure)

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

After completing the [installation](#installation) step, you're ready to start deveoping your App!

```bash
$ yarn run dev  # Start the development server (or `npm run dev`)
```

Hot reloading is enabled by default for both **JavaScript** and **SCSS** files.

All scripts at your disposal:

|`yarn run <script>`    |Description|
|-------------------|-----------|
|`dev`            	|Serves your app at `localhost:9000`|
|`mock-api`			|Serves a mock api at `localhost:9004`|
|`build`            |Builds the application to ./dist|
|`test`             |Runs unit tests with jest|

## Project Structure

All files are in the relative folder and imported when needed with the help of `webpack resolve`.

Ex: `import App from 'components/App'`

```
.
├── build                           # All build-related source code
├── __tests__                       # Unit tests
mock-api
│ └── db.json                       # mock api data
└── src                             # Application source code
    ├── index.html                  # Main HTML page container for app
    ├── index.js                    # Application bootstrap and rendering
    ├── components                  # Global reusable components
    │   └── Component
    │       ├── index.js            # Component source code
    │       ├── routes.js           # Your nested routes (if any)
    │       └── _styles.scss        # Your component styles (if any)
    ├── containers                  # Components wrapped by redux/connect
    │   └── Container
    │       ├── actions.js          # All component related actions
    │       ├── constants.js        # All component related constants
    │       ├── reducer.js          # Component reducer code source
    │       ├── sagas.js            # All component related sagas
    │       ├── middleware.js       # All component related middleware
    │       ├── index.js            # Component source code
    │       ├── routes.js           # Your nested routes (if any)
    │       └── _styles.scss        # Your component styles (if any)
    ├── constants                   # Global constants
    ├── store
    │   ├── combinedReducers.js     # Combine all reducers in one place
    │   ├── combinedSagas.js        # Combine all sagas in one place
    │   └── index.js                # Redux store bootstrap
    ├── styles                      # Global styles
    └── util
        ├── request.js              # Fetch API handler
        └── getDefaultHeaders.js    # Helper to inject headers on requests
```
