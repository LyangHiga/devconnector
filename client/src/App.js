import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import PrivateRoute from './components/routing/PrivateRoute';
import { load } from './actions/auth';
import setToken from './utils/setToken';
import './App.css';

// redux imports
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  // try to load the user from the token in local storage
  useEffect(() => {
    setToken(localStorage.token);
    store.dispatch(load());
  }, []);

  return (
    // similar to Context API
    //   store will be available to all child components
    <Provider store={store}>
      <Router>
        <div>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute
                exact
                path='/create-profile'
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path='/edit-profile'
                component={EditProfile}
              />
            </Switch>
          </section>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
