import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import './App.css';

// redux imports
import { Provider } from 'react-redux';
import store from './store';

const App = () => (
  // similar to Context API
  //   store will be available to all child components
  <Provider store={store}>
    <Router>
      <div>
        <Navbar />
        <Route exact path='/' render={Landing} />
        <section className='container'>
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
          </Switch>
        </section>
      </div>
    </Router>
  </Provider>
);

export default App;
