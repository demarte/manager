/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import firebase from 'firebase';

import LoginForm from './components/LoginForm';

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
    return (
      <Provider store={createStore(reducers)}>
        <View style={{flex: 1}}>
          <LoginForm/>
        </View>
      </Provider>
    );
  }
}

export default App;
