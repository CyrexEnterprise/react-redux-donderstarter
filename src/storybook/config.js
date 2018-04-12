import { configure, setAddon } from '@storybook/react'
import { setOptions } from '@storybook/addon-options'
import infoAddon, { setDefaults } from '@storybook/addon-info'

import '../styles/app.scss'

// Option defaults:
setOptions({
  name: 'Donder Storybook',
  url: 'https://github.com/Cloudoki/react-redux-donderstarter'
})

function loadStories () {
  require('../components/Navigation/stories')
  require('../components/NotFound/stories')
}

// addon-info
setDefaults({
  header: false,
  inline: true
})

setAddon(infoAddon)

configure(loadStories, module)
