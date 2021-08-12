import React from 'react';
import {
  BrowserRouter as Router, Redirect, Route, Switch,
} from 'react-router-dom';
import './App.css';
import Home from './pages/home/home';

function App() {
  return (
    <>
      <div className="">
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Redirect from="/" to="/" />
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;
