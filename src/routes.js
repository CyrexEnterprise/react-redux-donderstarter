import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './pages/home';
import LoginPage from './pages/login';
import {requireAuthentication} from './components/auth';
import Auth from './containers/Auth';
import ProtectedPage from './pages/protected';
import NotFoundPage from './pages/notFound';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="login" component={LoginPage}/>
    <Route path="protected" component={requireAuthentication(Auth)}>
      <IndexRoute component={ProtectedPage}/>
    </Route>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
