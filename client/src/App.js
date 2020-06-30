import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import './App.css';

const App = () => (
  <Router>
    <div>
      <Navbar />
      <Route exact path='/' render={Landing} />
      <section className='container'>
        <Switch>
          <Route exact path='/login' render={Login} />
          <Route exact path='/register' render={Register} />
        </Switch>
      </section>
    </div>
  </Router>
);

export default App;
