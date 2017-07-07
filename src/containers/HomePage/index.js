
import React from 'react'
import PropTypes from 'prop-types'

const navigate = (fn, path) => event => fn(path)
const HomePage = ({ history }) => (
  <div style={styles.container}>
    <h2>Cloudoki at <a href='http://hackforgood.pt/index/en/' target='_blank'>#hackforgood</a></h2>
    <div style={styles.imgContainer}>
      <img style={styles.img} src='/assets/hackforgood.jpg' />
    </div>
    <div style={styles.actions}>
      <button onClick={navigate(history.push, '/login')}>LOGIN</button>
      <button onClick={navigate(history.push, '/protected')}>PROTECTED</button>
    </div>
  </div>
)

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    display: 'flex',
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
  }
}

HomePage.propTypes = {
  history: PropTypes.object.isRequired
}

export default HomePage
