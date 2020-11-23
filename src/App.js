import React, {Component} from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import './App.css';

import Home from './home/Home.js';
import Minesweeper from './minesweeper/Minesweeper';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact path="/"
            component={Home}
          />
          <Route
            exact path="/minesweeper"
            component={Minesweeper}
          />
        </Switch>
      </Router>
    )
  }
}

export default App;
