
import React from 'react'
import routes from './routes'
import { useHistory } from "react-router-dom"
import Navigation from 'components/Navigation'

const App = () => {
  const history = useHistory();

  const navigate = (route) => { 
    if (route) {
      history.push(route)
    }
  }
  
  return [
    <Navigation navigate={navigate} />,
    routes(),
  ]
}

export default App
