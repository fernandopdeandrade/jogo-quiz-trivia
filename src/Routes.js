import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Feedback from './pages/Feedback';
import Login from './pages/Login';
import Game from './pages/Game';
import Ranking from './pages/Ranking';
import Settings from './pages/Settings';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
        <Route path="/play" render={ (props) => <Game { ...props } /> } />
        <Route path="/settings" render={ (props) => <Settings { ...props } /> } />
        <Route path="/feedback" render={ (props) => <Feedback { ...props } /> } />
        <Route path="/ranking" render={ (props) => <Ranking { ...props } /> } />
      </Switch>
    );
  }
}

export default Routes;
