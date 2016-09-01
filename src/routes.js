import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import HomePage from './pages/home/HomePage';
import NotFoundPage from './pages/notFound/NotFoundPage.js';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
