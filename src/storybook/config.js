import { configure, addDecorator } from '@storybook/react'
import { withOptions } from '@storybook/addon-options'

import '../styles/app.scss'

// Option defaults:
addDecorator(withOptions({
  name: 'Donder Storybook',
  url: 'https://github.com/Cloudoki/react-redux-donderstarter',
  addonPanelInRight: true,
}))

function loadStories () {
  require('../components/Navigation/stories')
  require('../components/NotFound/stories')
}

configure(loadStories, module)
