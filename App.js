

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './src/reducers';
import { Header } from './src/components/common';

export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={createStore(reducers)}>
        <View>
          <Header headerText="Tech Stack" />
          <Text style={styles.welcome}>
            Now using the LibraryReducer.
          </Text>
          <Text style={styles.instructions}>
            from ./src/reducers/LibraryReducer.js
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
