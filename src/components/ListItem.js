import React, { Component } from 'react';
import { Text , TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common';
import * as actions from '../actions';
import { UIManager,  Platform, LayoutAnimation } from 'react-native';

class ListItem extends Component {
  constructor() {
    super();
    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  componentWillUpdate() {
    LayoutAnimation.linear();
  }


  renderDescription() {
    if ( this.props.expanded ) {
      return (
        <CardSection>
          <Text style={{ flex:1 }}>
            {this.props.library.description}
          </Text>
        </CardSection>
      );
    }
  }

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
          {this.renderDescription()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 20,
    paddingLeft: 15
  }
};

const mapStateToProps = (state, ownProps) => {
  const expanded = state.selectedLibraryId === ownProps.library.id;
  return { expanded };
};


export default connect(mapStateToProps, actions)(ListItem);
