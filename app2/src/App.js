import React, { Component } from 'react';
import {BrowserRouter as Router ,Route, Link} from "react-router-dom"

import Dashboard from "./components/dashboard";
import Login from "./components/login";

import PrivateRoute from "./lib/privateRoute";
import './App.css';

// import Cookies from "universal-cookie"
// const cookie = new Cookies()
// cookie.set("isLoggedIn", true, {path: "/"})

import Cookies from "js-cookie";
Cookies.set("isLoggedIn", true, {path: "/"})

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          
          <PrivateRoute path="/" component={Dashboard}/>
          <Route path="/login" component={Login}/>
        </div>
      </Router>
    );
  }
}

const Header = () => (
  <ul>
    <li>
      <Link to="/">Dashboard</Link>
    </li>
    <li>
      <Link to="/login">Login</Link>
    </li>
  </ul>
);

export default App;
