# tech-stack
* React Native with Redux mini app
* Part of [The Complete React Native and Redux Course](https://www.udemy.com/the-complete-react-native-and-redux-course/)
by [Stephen Grider](https://github.com/stephengrider)


## Dev Tools
### Node, NPM, Yarn, Atom, Genymotion
### react-native, redux, react-redux

&nbsp;
## 00 Initialize the *tech_stack* app

* Initialize a new project for the application with the react-native cli.

```
$ react native init tech_stack
```

* Install Redux and react-redux

```
$  npm install --save redux react-redux

```


&nbsp;
## 01 Provider and createStore

* Add the imports.

```
import { Provider } from 'react-redux';
import { createStore } from 'redux';
```

* Wrap the main view in the Provider tag. Provide a simple reducer.

```
export default class App extends Component<{}> {
  render() {
    const leReducer = () => [];

    return (
      <Provider store={createStore(leReducer)}>
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Added the Provider and provided leReducer
          </Text>
          <Text style={styles.instructions}>
            All that in App.js
          </Text>
        </View>
      </Provider>
    );
  }
}
```



&nbsp;
## 02 combineReducers

* Create the *src* folder and the *reducers* folder inside *src*. Create *index.js* inside *reducers* and contain *leReducer* in it.

*./src/reducers/index.js*
```
import { combineReducers } from 'redux';

export default combineReducers({
  leReducer: () => [];
});
```

* In App.js, import reducers and provide them to the store.

```
import reducers from './src/reducers/index.js';
```

```
    <Provider store={createStore(reducers)}>
```


&nbsp;
## 03 Header

* Get a copy of the *./Components/common* folder from the [*auth*](https://github.com/stefaleon/Authentication-with-React-Native) app.

* Import *Header* and use it in App.js.

```
import { Header } from './src/components/common';
```

```  
    <Header headerText="Tech Stack" />
```
