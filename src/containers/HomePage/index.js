
import React from 'react'
import PropTypes from 'prop-types'
import LocaleSelect from 'containers/LocaleSelect'
import { FormattedMessage } from 'react-intl'

const imgUrl = require('assets/hackforgood.jpg')

const navigate = (fn, path) => event => fn(path)
const HomePage = ({ history }) => (
  <div style={styles.container}>
    <h2>Cloudoki <FormattedMessage id='homePage.h1' /> <a href='http://hackforgood.pt/index/en/' target='_blank'>#hackforgood</a></h2>
    <div style={styles.imgContainer}>
      <img style={styles.img} src={imgUrl} />
    </div>
    <br />
    <div>
      Change Language: <LocaleSelect />
    </div>
    <br />
    <div>
      <FormattedMessage id='homePage.hello' />
    </div>
    <div style={styles.actions}>
      <button style={styles.button} onClick={navigate(history.push, '/login')}>login</button>
      <button style={styles.button} onClick={navigate(history.push, '/protected')}>
        <FormattedMessage id='homePage.button' />
      </button>
      <button style={styles.button} onClick={navigate(history.push, '/intlexamples')}>Intl Examples</button>
    </div>
  </div>
)

const styles = {
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imgContainer: {
    width: 700,
    borderRadius: 8,
    overflow: 'auto',
    boxShadow: '0px 4px 5px -2px rgba(0, 0, 0, 0.2), 0px 7px 10px 1px rgba(0, 0, 0, 0.14), 0px 2px 16px 1px rgba(0, 0, 0, 0.12)'
  },
  img: {
    display: 'block',
    width: '100%',
    height: 'auto'
  },
  actions: {
    marginTop: 20
  },
  button: {
    textTransform: 'uppercase',
    marginRight: 5
  }
}

HomePage.contextTypes = {
  intl: PropTypes.object.isRequired
}

HomePage.propTypes = {
  history: PropTypes.object.isRequired
}

export default HomePage
