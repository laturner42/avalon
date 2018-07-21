import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';

export default class IntroducePlayersScreen extends React.Component {

  state = {
      remainingPlayers: [],
      showingPlayer: false,
  }

  componentDidMount() {
    this.setState({
        remainingPlayers: Object.keys(this.props.roles),
    })
  }

  showPlayer = () => {
    this.setState({
      showingPlayer: true,
    })
  }

  nextPlayer = () => {
    const remainingPlayers = this.state.remainingPlayers.slice();
    remainingPlayers.shift();
    if (remainingPlayers.length < 1) {
      this.props.finishIntroductions();
    }
    this.setState({
      showingPlayer: false,
      remainingPlayers,
    });
  }

  getRoleText = (role) => {
    const badGuysString = this.props.getBadGuys().filter(name => name !== this.state.remainingPlayers[0]).join(', ');
    switch(role) {
      case 'Merlin':
        return 'Don\'t die. The Bad Guys are: ' + badGuysString;
      case 'Good Guy':
        return 'Protect Merlin.';
      case 'Bad Guy':
        return 'Make sure Merlin dies. The other Bad Guys are: ' + badGuysString;
      case 'Percy':
        const theMs = Object.keys(this.props.roles).filter(n => this.props.roles[n] === 'Merlin' || this.props.roles[n] === 'Maldova')
        return 'These two are Merlin and Maldova, but you are unsure which is which: ' + theMs.join(', ');
      case 'Maldova':
        return 'Make sure Merlin dies. The other Bad Guys are: ' + badGuysString;
      case 'Assassin':
        return 'Kill Merlin. The other Bad Guys are: ' + badGuysString;
    }
  }

  render() {
    const player = this.state.remainingPlayers[0];
    if (this.state.showingPlayer) {
      return (
        <View style={styles.container}>
        <Text style={{ color: 'white', fontSize: 32 }}>{player}</Text>
        <Text style={{ color: '#bbb', fontSize: 24 }}>your role is</Text>
        <Text style={{ color: 'white', fontSize: 32 }}>{this.props.roles[player]}</Text>
        <Text style={{ color: 'white', fontSize: 24, textAlign: 'center', }}>{this.getRoleText(this.props.roles[player])}</Text>
        <TouchableOpacity
          onPress={this.nextPlayer}
          style={{borderColor: '#fff', borderWidth: 1, paddingLeft: 15, paddingRight: 15, paddingTop: 5, paddingBottom: 5, marginTop: 20}}
        >
          <Text style={{ color: 'white', fontSize: 24 }}>Got it.</Text>
        </TouchableOpacity>
      </View>
      )
    }
    return (
      <View style={styles.container}>
        <Text style={{ color: 'white', fontSize: 24 }}>{'pass the phone to'}</Text>
        <Text style={{ color: 'white', fontSize: 28 }}>{player}</Text>
        <TouchableOpacity
          onPress={this.showPlayer}
          style={{borderColor: '#fff', borderWidth: 1, paddingLeft: 15, paddingRight: 15, paddingTop: 5, paddingBottom: 5, marginTop: 20}}
        >
          <Text style={{ color: 'white', fontSize: 26 }}>I am {player}</Text>
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
    justifyContent: 'center',
    padding: 50,
  },
});
