import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';

export default class AssassinScreen extends React.Component {

  kill = (player) => {
    this.props.finishGame(this.props.roles[player] !== 'Merlin');
  }

  render() {
    
    return (
      <View style={styles.container}>
        {
          this.props.goodGuysWin ?
          <Text style={{ color: '#4f5', fontSize: 32, textAlign: 'center' }}>The Good Guys Win!</Text> :
          <Text style={{ color: '#f54', fontSize: 32, textAlign: 'center' }}>The Bad Guys Win!</Text>
        }
        <Text style={{ color: '#fff', fontSize: 24, textAlign: 'center', marginTop: 20, marginBottom: 10 }}>Everyone's roles:</Text>
        {
          this.props.players.map(player => (
            <Text style={{ color: '#eee', fontSize: 24, textAlign: 'center' }} key={player}>{player}: {this.props.roles[player]}</Text>
          ))
        }
        <TouchableOpacity
          onPress={this.props.reset}
          style={{borderColor: '#fff', borderWidth: 1, paddingLeft: 15, paddingRight: 15, paddingTop: 5, paddingBottom: 5, margin: 10}}
        >
          <Text style={{ color: '#fff', fontSize: 24 }}>Play Again</Text>
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
