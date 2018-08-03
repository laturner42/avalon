import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';

export default class MissionChooserScreen extends React.Component {

  state = {
    playersChosen: [],
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'white', fontSize: 28, textAlign: 'center' }}>Was the following mission approved by a majority of the group?</Text>
        <Text style={{ color: '#6bf', fontSize: 24, textAlign: 'center', marginTop: 10 }}>{this.props.party.join(', ')}</Text>
        <TouchableOpacity
          onPress={this.props.approveMission}
          style={{borderColor: '#fff', borderWidth: 1, paddingLeft: 15, paddingRight: 15, paddingTop: 5, paddingBottom: 5, marginTop: 20, width: '100%'}}
        >
          <Text style={{ color: '#5f7', fontSize: 26, textAlign: 'center' }}>Approved!</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.props.denyMission}
          style={{borderColor: '#fff', borderWidth: 1, paddingLeft: 15, paddingRight: 15, paddingTop: 5, paddingBottom: 5, marginTop: 20, width: '100%'}}
        >
          <Text style={{ color: '#f75', fontSize: 26, textAlign: 'center' }}>Denied!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 50,
  },
});
