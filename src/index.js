import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import Login from './Login'

const routes = (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/" component={App} exact={true} />
        <Route path="/login" component={Login} exact={true} />
      </Switch>
    </div>
  </BrowserRouter>
);

ReactDOM.render(routes, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
