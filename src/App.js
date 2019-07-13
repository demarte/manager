/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import Router from './Router';
import reducers from './reducers';
import firebase from 'firebase';

class App extends Component {
  componentDidMount() {
    const firebaseConfig = {
      apiKey: "AIzaSyBch0ZhY_2ym8cWRrs8LBFjngjwIv6e6hc",
      authDomain: "manager-fd7f0.firebaseapp.com",
      databaseURL: "https://manager-fd7f0.firebaseio.com",
      projectId: "manager-fd7f0",
      storageBucket: "",
      messagingSenderId: "755227460630",
      appId: "1:755227460630:web:5c293be102d0335d"
    };
    firebase.initializeApp(firebaseConfig);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
