import React from 'react';
import {
  BrowserRouter as Router, Redirect, Route, Switch,
} from 'react-router-dom';
import './App.css';
import Home from './pages/home/home';
import Top from './pages/top-urls/top-urls';

function App() {
  return (
    <>
      <div className="">
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/top" component={Top} />
            <Redirect from="/" to="/" />
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;
