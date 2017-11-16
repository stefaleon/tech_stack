import React, { Component } from 'react';
import { Text } from 'react-native';
import { CardSection } from './common';

export default class ListItem extends Component {
  render() {
    return (
      <CardSection>
        <Text style={styles.titleStyle}>
          {this.props.library.title}
        </Text>
      </CardSection>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 20,
    paddingLeft: 15
  }
};
