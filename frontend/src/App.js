import React from 'react';
import {
  BrowserRouter as Router, Redirect, Route, Switch,
} from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/index';
import Home from './pages/home/index';
import Top from './pages/top-urls/index';

function App() {
  return (
    <>
      <div className="">
        <Router>
          <Navbar />
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
