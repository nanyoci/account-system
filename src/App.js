import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './components/Login';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminTable from './components/AdminTable';

class App extends Component {
  render() {
    return (
      
      <Provider store={store}>
          <BrowserRouter>
            <Switch>
            <Route path= "/users" component={ AdminTable}/>
            <Route path= "/login" component={ Login }/>
            </Switch>
            </BrowserRouter>
  </Provider>
    );
  }
}

export default App;