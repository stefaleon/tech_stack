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



&nbsp;
## 04 A list of *libraries*

* In *./src/reducers* create *LibraryReducer.js*. It will be returning the list of *libraries* presented in the *Tech Stack* app.
For the time being it returns an empty list.


*./src/reducers/LibraryReducer.js*
```
export default () => [];
```

* Wire it up in *./src/reducers/index.js*. The demonstrative *leReducer* can be removed.

```
import { combineReducers } from 'redux';
import LibraryReducer from './LibraryReducer';

export default combineReducers({
  libraries: LibraryReducer
});
```


&nbsp;
## 05 Add data

* In *./src/reducers* create *LibraryList.json* which will contain the *libraries* data as a JSON object.

* In *./src/reducers/LibraryReducer.js* import and export the data.

```
import data from './LibraryList.json';

export default () => data;
```


&nbsp;
## 06 Connect to the store

* Create the *LibraryList.js* file inside the */src/components* folder. Connect to the Redux store and retrieve the *libraries* piece of state.  

  * The react-redux *connect()* function takes *mapStateToProps* as an argument.

  *  The return of *connect(mapStateToProps)* is also a function which takes *LibraryList* as its parameter. The result  is being exported by *LibraryList.js*

  * The *mapStateToProps* function takes the *state* as its parameter and returns an object containing the *state.libraries*. These are passed to *LibraryList* as props.

  * On the componentWillMount lifecycle method these props are passed to a ListView, via boilerplate code. Rows' changes are monitored and the ListView.DataSource is provided with appropriate data.

  * Define the howToRenderRow method in order to instruct the ListView rergarding row rendering. Temporarily returns an empty list.


*/src/components/LibraryList.js*
```
import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';

class LibraryList extends Component {
  componentWillMount() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(this.props.libraries);
  }

  howToRenderRow() {
    return [];
  }

  render() {
    return(
      <ListView
        dataSource = {this.dataSource}
        renderRow = {this.howToRenderRow}
       />
    );
  }
}

const mapStateToProps = state => {
  return { libraries: state.libraries };
};

export default connect(mapStateToProps)(LibraryList);
```

* In *App.js*

```
import LibraryList from './src/components/LibraryList';
```
```
export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={createStore(reducers)}>
        <View>
          <Header headerText="Tech Stack" />
          <LibraryList />
          <Text style={styles.welcome}>
            Get the Redux store to the React view!
          </Text>
        </View>
      </Provider>
    );
  }
}
```


&nbsp;
## 07 Display the titles

* Create the *ListItem.js* file inside the */src/components* folder. Add appropriate JSX code in order to display the title property of the JSON data object. Reuse the CardSection component from the common components.

*/src/components/ListItem.js*
```
import React, { Component } from 'react';
import { Text } from 'react-native';
import { CardSection } from './common';

export default class ListItem extends Component {
  render() {
    return (
      <CardSection>
        <Text>{this.props.library.title}</Text>        
      </CardSection>
    );
  }
}
```

* In *LibraryList.js* add the *library* parameter in *howToRenderRow()* and also pass it as a prop to the *ListItem*.

```
import ListItem from './ListItem';
```

```
howToRenderRow(library) {
  return <ListItem library={library}/>
}
```


&nbsp;
## 08 Style and flex

* Style the Text in ListItem.

```
<Text style={styles.titleStyle}>
```
```
const styles = {
  titleStyle: {
    fontSize: 20,
    paddingLeft: 15
  }
};
```

* Flex the View in App.

```
<View style={{ flex:1 }}>
```

&nbsp;
## 09 Reduce selections

* In *./src/reducers* create *SelectionReducer.js*. Avoid undefined state in the beginning by setting initial state to null (implying that we have no specific library selected to begin with).

*./src/reducers* create *SelectionReducer.js*
```
export default () => {
  return null;  
};
```

* Wire it up in *./src/reducers/index.js*. Import and attach it to the *selectedLibraryId* property inside combineReducers.

```
import SelectionReducer from './SelectionReducer';
```
```
export default combineReducers({
  libraries: LibraryReducer,
  selectedLibraryId: SelectionReducer
});
```

&nbsp;
## 10 Action creator

* Create the *actions* folder and the *src/actions/index.js* file. It exports the action creator function *selectLibrary*, which returns the action with the *select_library* type. The *libraryId* argument passed to this action creator function, is being attached to the payload property of the returned action object.

*src/actions/index.js*
```
export const selectLibrary = (libraryId) => {
  return {
    type: 'select_library',
    payload: libraryId
  };
};
```

&nbsp;
## 11 Connect the actions

* In ListItem.js import all actions as *actions*.

```
import * as actions from '../actions';
```

* Import the connect helper.

```
import { connect } from 'react-redux';
```

* Setup the connection. There is not mapStateToProps, so the first patrameter of connect() is null. The second parameter is the *actions* object.

```
export default connect(null, actions)(ListItem);
```

&nbsp;
## 12 Call selectLibrary

* Now the action creator function *selectLibrary* is connected to the *ListItem* component and is available as props to be called when a touch event occurs. A touchable component is required in order to receive the touch event. Import TouchableWithoutFeedback, which is appropriate for this case. Also import the View object.

```
import { Text , TouchableWithoutFeedback, View} from 'react-native';
```

* Wrap the return in a TouchableWithoutFeedback block, and also internally to a View so that another CardSection can be added later. Call the *selectLibrary* action creator on the onPress event and pass it the particular current library's Id.

```
class ListItem extends Component {
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => this.props.selectLibrary(this.props.library.id)}
      >
        <View>
          <CardSection>
            <Text style={styles.titleStyle}>
              {this.props.library.title}
            </Text>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
```

&nbsp;
## 13 Return the selected library's Id

* Edit SelectionReducer.js so that it returns the action's payload when the dispatched action comes from selectLibrary.
```
export default (state  =  null, action) => {
  switch (action.type) {
    case 'select_library':
      return action.payload;
    default:
      return state;
  }
};
```

&nbsp;
## 14 Expand the selected row

* In ListItem.js, map the state's selectedLibraryId item to the local props, by returning it from the mapStateToProps function which takes the state as its argument.

```
const mapStateToProps = state => {
  return { selectedLibraryId: state.selectedLibraryId };
};
```

* Pass mapStateToProps as the first argument to the connect handler.

```
export default connect(mapStateToProps, actions)(ListItem);
```

* If the current list item's id (which has been defined with the LibraryReducer) is the same as the selected id (provided by the SelectionReducer), then the renderDescription function returns the related description inside a Text tag.

```
renderDescription() {
  if ( this.props.library.id === this.props.selectedLibraryId) {
    return (
      <Text>{this.props.library.description}</Text>
    );
  }
}
```

* Display the result of renderDescription() inside the ListItem's render result.

```
{this.renderDescription()}
```

&nbsp;
## 15 Refactor with ownProps

* Use ownProps as the second argument of mapStateToProps(), in order to remove the selectedId matching the current list item's  Id related logic from the component. The *expanded* flag is returned to the component instead of the selectedLibraryId.

```
const mapStateToProps = (state, ownProps) => {
  const expanded = state.selectedLibraryId === ownProps.library.id;
  return { expanded };
};
```

* Now, the related description will be displayed if the passed to component's props expanded flag is true.

```
renderDescription() {
  if ( this.props.expanded ) {
    return (
      <Text>{this.props.library.description}</Text>
    );
  }
}
```


&nbsp;
## 16 Style and animate

* Wrap the renderDescription Text in a CardSection in order to give it some padding and a bottom border. Flex it so that lines wrap properly.

```
return (
  <CardSection>
    <Text style={{ flex:1 }}>
      {this.props.library.description}
    </Text>
  </CardSection>
);
```

* Import LayOutAnimation and add a spring effect with the componentWillUpdate lifecycle method.  

```
import { UIManager,  Platform, LayoutAnimation } from 'react-native';
```
```
constructor() {
  super();
  if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

componentWillUpdate() {
  LayoutAnimation.spring();
}
```
