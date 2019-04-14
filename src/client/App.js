import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './app.css';
import './bootstrap.min.css';

import AuthReg from './pages/AuthReg';
import Books from './pages/Books';
import Header from './components/Header';

export default class App extends Component {
  // state = { username: null };

  componentDidMount() {
    // fetch('/api/getUsername')
    //   .then(res => res.json())
    //   .then(user => this.setState({ username: user.username }));
  }

  render() {
    // const { username } = this.state;
    return (
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/" component={AuthReg} />
          <div className="container">
            <Route exact path="/allbooks" component={Books} />
          </div>
          {/* <Footer /> */}
        </div>
      </Router>
    );
  }
}
