
import * as React from 'react'

import imgUrl from 'assets/hackforgood.jpg'

import { HomePageProps } from './types'

const hfgLink = 'http://hackforgood.pt/index/en/'

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '2rem',
  } as React.CSSProperties,
  imgContainer: {
    width: 700,
    borderRadius: 8,
    overflow: 'auto',
    boxShadow: '0px 4px 5px -2px rgba(0, 0, 0, 0.2), 0px 7px 10px 1px rgba(0, 0, 0, 0.14), 0px 2px 16px 1px rgba(0, 0, 0, 0.12)',
  },
  img: {
    display: 'block',
    width: '100%',
    height: 'auto',
  },
  actions: {
    marginTop: 20,
  },
  footer: {
    width: '100%',
    textAlign: 'center',
  } as React.CSSProperties,
}

const createOnClick = (fn: Function, path: string) => () => fn(path)

const HomePage: React.FC<HomePageProps> = ({ history, strings }) => (
  <div style={styles.container}>
    <h2>Cloudoki at <a href={hfgLink} target='_blank' rel='noopener noreferrer'>#hackforgood</a></h2>
    <div style={styles.imgContainer}>
      <img style={styles.img} src={imgUrl} />
    </div>
    <div style={styles.actions}>
      <button onClick={createOnClick(history.push, '/protected')}>PROTECTED</button>
    </div>
    <div style={styles.footer}>{strings('homePage.madeWlove')}</div>
  </div>
)

export default HomePage
