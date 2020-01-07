import React from 'react';
import './App.css';
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from 'react-router-dom'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  };

  render() {

    return (
      <Router>
        <>
          <nav className="nav-bar">
            <NavLink
              to="/"
              activeClassName="selected"
              className="bar-button">
              Home
            </NavLink>
            <NavLink
              to="/profile"
              activeClassName="selected"
              className="bar-button">
              Profile
            </NavLink>
          </nav>

          <Switch>

            <Route
              exact path="/">
              <HomePage />
            </Route>

            <Route
              path="/profile">
              <ProfilePage />
            </Route>

          </Switch>
        </>
      </Router>
    );
  }
}

export default App;
