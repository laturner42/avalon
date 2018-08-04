import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class AssassinScreen extends React.Component {

  state = {
    target: this.props.availableRoles.includes('Lover') ? 'The Lovers' : 'Merlin',
    chosen: undefined,
  }

  kill = (player) => {
    if (this.state.target === 'Merlin') {
      this.props.finishGame(this.props.roles[player] !== 'Merlin');
    } else {
      if (this.state.chosen) {
        const chosen = this.state.chosen;
        this.props.finishGame(this.props.roles[chosen] !== 'Lover' || this.props.roles[player] !== 'Lover');
      } else if (!this.state.chosen){
        this.setState({
          chosen: player,
        })
      }
    }
  }

  getOtherTarget = () => {
    return this.state.target === 'Merlin' ?  'The Lovers' : 'Merlin';
  }

  render() {
    const assassin = this.props.players.filter(name => this.props.roles[name] === 'Assassin')[0];
    const goodGuys = this.props.players.filter(player => this.props.isGoodGuy(player));
    return (
      <View style={styles.container}>
        <Text style={{ color: '#888', fontSize: 14, textAlign: 'center' }}>The Good Guys have saved Merlin!</Text>
        <Text style={{ color: 'white', fontSize: 28, textAlign: 'center' }}>{assassin}, kill {this.state.target}.</Text>
        {
          goodGuys.map(player => (
            <TouchableOpacity
              onPress={() => this.kill(player)}
              key={player}
              style={{borderColor: '#fff', backgroundColor: this.state.chosen === player ? '#269' : undefined, borderWidth: 1, paddingLeft: 15, paddingRight: 15, paddingTop: 5, paddingBottom: 5, marginTop: 20, width: '100%'}}
            >
              <Text style={{ color: '#fff', fontSize: 24 }}>{player}</Text>
            </TouchableOpacity> 
          ))
        }
        {
          this.props.availableRoles.includes('Lover') && this.props.availableRoles.includes('Merlin') && !this.state.chosen &&
          <TouchableOpacity
            onPress={() => this.setState({ target: this.getOtherTarget() })}
            style={{borderColor: '#6bf', borderWidth: 1, paddingLeft: 15, paddingRight: 15, paddingTop: 5, paddingBottom: 5, marginTop: 20, width: '100%'}}
          >
            <Text style={{ color: '#6bf', fontSize: 24 }}>Kill {this.getOtherTarget()} instead.</Text>
          </TouchableOpacity> 
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
