import React from 'react';
import ReactDOM from 'react-dom';

import './style.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from './components/app';
import Characters from './components/characters';


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/characters" exact component={Characters} />
      <Route path="/" exact component={App} />
      <Route render={() => <h2 id="noPage">Page not found!</h2>} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
