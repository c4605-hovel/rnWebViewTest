import React from 'react'
import {AppRegistry, StyleSheet, Text, View, ErrorUtils} from 'react-native'

class RNHighScores extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.content}>It works</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  content: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

// Module name
AppRegistry.registerComponent('RNHighScores', () => RNHighScores)
