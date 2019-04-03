import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './Login'
import Contact from './Contact'
import About from './About'
import Details from './Details'
import PageNotFound from './PageNotFound'
import VerticalSpace from './VerticalSpace'
import ScrollToTop from './ScrollToTop'
import Nav from './Nav'

const routes = (
  <BrowserRouter >
    <ScrollToTop> 
    <div>
      <Nav />
      <VerticalSpace />
      <Switch>
        <Route path="/" component={App} exact={true} />
        <Route path="/login" component={Login} />
        <Route path="/details" component={Details} />
        <Route path="/contact" component={Contact} />
        <Route path="/about" component={About} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  </ScrollToTop> 
  </BrowserRouter>
);

ReactDOM.render(routes, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
