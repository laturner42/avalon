import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';

export default class SettingsScreen extends React.Component {

  state = {
    playersChosen: [],
  }

  toggleMerlin = () => {
    if (this.props.availableRoles.includes('Merlin')) {
      const removeRoles = ['Merlin', 'Mordred'];
      if (!this.props.availableRoles.includes('Lover')) removeRoles.push('Assassin');
      this.props.removeAvailableRoles(removeRoles);
    } else {
      this.props.addAvailableRoles(['Merlin', 'Assassin']);
    }
  }

  toggleMordred = () => {
    if (this.props.availableRoles.includes('Mordred')) {
      this.props.removeAvailableRoles(['Mordred']);
    } else if (this.props.availableRoles.includes('Merlin')) {
      this.props.addAvailableRoles(['Mordred']);
    }
  }

  toggleAssassin = () => {
    if (this.props.availableRoles.includes('Assassin')) {
      this.props.removeAvailableRoles(['Assassin', 'Merlin']);
    } else if (this.props.availableRoles.includes('Merlin') || this.props.availableRoles.includes('Lover')){
      this.props.addAvailableRoles(['Assassin']);
    }
  }

  togglePercy = () => {
    if (this.props.availableRoles.includes('Percy')) {
      this.props.removeAvailableRoles(['Percy', 'Morgana']);
    } else {
      this.props.addAvailableRoles(['Percy']);
    }
  }

  toggleMorgana = () => {
    if (this.props.availableRoles.includes('Morgana')) {
      this.props.removeAvailableRoles(['Morgana']);
    } else if (this.props.availableRoles.includes('Percy')){
      this.props.addAvailableRoles(['Morgana']);
    }
  }

  toggleLovers = () => {
    if (this.props.availableRoles.includes('Lover')) {
      const removeRoles = ['Lover', 'Lover'];
      if (!this.props.availableRoles.includes('Merlin')) removeRoles.push('Assassin');
      this.props.removeAvailableRoles(removeRoles);
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

  option = (title, callback, selected, tabbed) => (
    <View style={{
      width: '100%',
      flexWrap: 'wrap', 
      alignItems: 'flex-start',
      flexDirection: 'row',
      margin: 10,
      paddingLeft: tabbed ? 20 : 0,
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
          Choose Roles
        </Text>
        <Text style={{ color: '#aaa', fontSize: 20, margin: 5 }}>Remember to consider game balance when picking.</Text>
        <ScrollView style={{ maxHeight: '50%', marginBottom: 10 }}>
          {this.option(
            'Merlin',
            this.toggleMerlin,
            this.props.availableRoles.includes('Merlin')
          )}
          {this.option(
            'Mordred',
            this.toggleMordred,
            this.props.availableRoles.includes('Mordred'),
            true
          )}
          {this.option(
            'Assassin',
            this.toggleAssassin,
            this.props.availableRoles.includes('Assassin')
          )}
          {this.option(
            'Percy',
            this.togglePercy,
            this.props.availableRoles.includes('Percy')
          )}
          {this.option(
            'Morgana',
            this.toggleMorgana,
            this.props.availableRoles.includes('Morgana'),
            true
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
        <TouchableOpacity
          onPress={() => WebBrowser.openBrowserAsync('https://prestonandvictoria.com/avalon-rules.html')}
          style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', margin: 10 }}
        >
          <Text style={{ color: '#6bf', fontSize: 26 }}>{'Rules '}</Text>
          <Ionicons
            name={Platform.OS === 'ios' ? 'ios-arrow-forward' : 'md-arrow-forward'}
            size={32}
            color="#6bf"
            style={{ marginRight: 15}}
          />
        </TouchableOpacity>
        <Text style={{ width: '100%', color: '#888', fontSize: 16, textAlign: 'center', margin: 1 }}>version 1.4.0</Text>
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
