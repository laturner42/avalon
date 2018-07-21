import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';

export default class AssassinScreen extends React.Component {

  kill = (player) => {
    this.props.finishGame(this.props.roles[player] !== 'Merlin');
  }

  render() {
    console.log('props lol', this.props);
    const assassin = this.props.players.filter(name => this.props.roles[name] === 'Assassin')[0];
    const goodGuys = this.props.players.filter(player => this.props.isGoodGuy(player));
    console.log(assassin);
    console.log(goodGuys);
    return (
      <View style={styles.container}>
        <Text style={{ color: '#888', fontSize: 14, textAlign: 'center' }}>The Good Guys have saved Merlin!</Text>
        <Text style={{ color: 'white', fontSize: 28, textAlign: 'center' }}>{assassin}, kill someone.</Text>
        {
          goodGuys.map(player => (
            <TouchableOpacity
              onPress={() => this.kill(player)}
              key={player}
              style={{borderColor: '#fff', borderWidth: 1, paddingLeft: 15, paddingRight: 15, paddingTop: 5, paddingBottom: 5, marginTop: 20, width: '100%'}}
            >
              <Text style={{ color: '#fff', fontSize: 24 }}>{player}</Text>
            </TouchableOpacity>
          ))
        }
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
