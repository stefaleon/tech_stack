

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './src/reducers/index.js';


export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={createStore(reducers)}>
        <View style={styles.container}>
          <Text style={styles.welcome}>
            reducers are provided with combineReducers
          </Text>
          <Text style={styles.instructions}>
            from ./src/reducers/index.js
          </Text>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
