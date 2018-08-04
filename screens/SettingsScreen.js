import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

export default class SettingsScreen extends React.Component {

  state = {
    playersChosen: [],
  }

  toggleMerlin = () => {
    if (this.props.availableRoles.includes('Merlin')) {
      this.props.removeAvailableRoles(['Merlin']);
    } else {
      this.props.addAvailableRoles(['Merlin']);
    }
  }

  toggleAssassin = () => {
    if (this.props.availableRoles.includes('Assassin')) {
      this.props.removeAvailableRoles(['Assassin']);
    } else {
      this.props.addAvailableRoles(['Assassin']);
    }
  }

  togglePercyAndMorgana = () => {
    if (this.props.availableRoles.includes('Percy')) {
      this.props.removeAvailableRoles(['Percy', 'Morgana']);
    } else {
      this.props.addAvailableRoles(['Percy', 'Morgana']);
    }
  }

  toggleLovers = () => {
    if (this.props.availableRoles.includes('Lover')) {
      this.props.removeAvailableRoles(['Lover', 'Lover']);
    } else {
      this.props.addAvailableRoles(['Lover', 'Lover']);
    }
  }

  toggleOberoff = () => {
    if (this.props.availableRoles.includes('Oberoff')) {
      this.props.removeAvailableRoles(['Oberoff']);
    } else {
      this.props.addAvailableRoles(['Oberoff']);
    }
  }

  option = (title, callback, selected) => (
    <View style={{
      width: '100%',
      flexWrap: 'wrap', 
      alignItems: 'flex-start',
      flexDirection: 'row',
      margin: 10,
    }} key={title}>
      <TouchableOpacity
        onPress={callback}
        style={{borderColor: '#fff', borderWidth: 1, width: 30, height: 30, marginRight: 10,
          backgroundColor: selected ? '#2a5': 'black',
        }}
      />
      <Text style={{ color: 'white', fontSize: 24, width: '70%' }}>{title}</Text>
    </View>
  )

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'white', fontSize: 30 }}>
          Choose Playable Roles
        </Text>
        <Text style={{ color: '#aaa', fontSize: 24, margin: 5 }}>Make sure you consider game balance when picking.</Text>
        <ScrollView style={{ maxHeight: '50%' }}>
          {this.option(
            'Merlin',
            this.toggleMerlin,
            this.props.availableRoles.includes('Merlin')
          )}
          {this.option(
            'Assassin',
            this.toggleAssassin,
            this.props.availableRoles.includes('Assassin')
          )}
          {this.option(
            'Percy & Morgana',
            this.togglePercyAndMorgana,
            this.props.availableRoles.includes('Percy')
          )}
          {this.option(
            'The Lovers',
            this.toggleLovers,
            this.props.availableRoles.includes('Lover')
          )}
          {this.option(
            'Oberoff',
            this.toggleOberoff,
            this.props.availableRoles.includes('Oberoff')
          )}
        </ScrollView>
        <TouchableOpacity
          onPress={() => this.props.reset(true)}
          style={{borderColor: '#fff', borderWidth: 1, paddingLeft: 15, paddingRight: 15, paddingTop: 5, paddingBottom: 5, width: '100%'}}
        >
          <Text style={{ color: 'white', fontSize: 26, textAlign: 'center' }}>Save</Text>
        </TouchableOpacity>
        <Text style={{ width: '100%', color: '#888', fontSize: 16, textAlign: 'center', margin: 7 }}>version 1.1.0</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 50,
  },
});
