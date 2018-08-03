import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class IntroducePlayersScreen extends React.Component {

  state = {
      remainingPlayers: [],
      showingPlayer: false,
      countdown: 0,
  }

  componentDidMount() {
    this.setState({
        remainingPlayers: Object.keys(this.props.roles),
    })
  }

  showPlayer = () => {
    this.setState({
      showingPlayer: true,
      countdown: 5,
    })
    setTimeout(this.countItDown, 1000);
  }

  countItDown = () => {
    const countdown = this.state.countdown - 1;
    this.setState({
      countdown,
    })
    if (countdown > 0) {
      setTimeout(this.countItDown, 1000);
    }
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
    const badGuysString = <Text style={{ color: '#f76' }}>{this.props.getBadGuys().filter(name => name !== this.state.remainingPlayers[0]).join(', ')}</Text>
    const theMs = <Text style={{ color: '#6bf' }}>
      {Object.keys(this.props.roles).filter(n => this.props.roles[n] === 'Merlin' || this.props.roles[n] === 'Morgana').join(', ')}
    </Text>;
    const loversString = <Text style={{ color: '#4f5' }}>{this.props.getLovers().filter(name => name !== this.state.remainingPlayers[0]).join(', ')}</Text>

    let string;
    let badGuysShow = false;
    let percy = false;
    let lover = false;
    switch(role) {
      case 'Merlin':
        string = 'Don\'t die. The Bad Guys are: ';
        badGuysShow = true;
        break;
      case 'Good Guy':
        string = 'Protect Merlin. Try to figure out who your fellow Good Guys are.';
        break;
      case 'Morgana':
      case 'Bad Guy':
        string = 'Make sure Merlin dies. The other Bad Guys are: ';
        badGuysShow = true;
        break;
      case 'Percy':
        string = 'These two are Merlin and Morgana, but you are unsure which is which: ';
        percy = true;
        break;
      case 'Lover':
        string = 'Your fellow lover is: ';
        lover = true;
        break;
      case 'Assassin':
        string = 'Kill Merlin. The other Bad Guys are: ';
        badGuysShow = true;
        break;
      case 'Oberoff':
        string = 'You have no idea who your fellow Bad Guys are.';
        break;
      }
    return <Text style={{ color: 'white', fontSize: 24, textAlign: 'center', }}>{string} {badGuysShow && badGuysString}{percy && theMs}{lover && loversString}</Text>;
  }

  render() {
    const player = this.state.remainingPlayers[0];
    const playerColor = this.props.isGoodGuy(player) ? '#4f5' : '#f76';
    if (this.state.showingPlayer) {
      return (
        <View style={styles.container}>
          <Text style={{ color: 'white', fontSize: 32 }}>{player}</Text>
          <Text style={{ color: '#bbb', fontSize: 24 }}>your role is</Text>
          <Text style={{ color: playerColor, fontSize: 32 }}>{this.props.roles[player]}</Text>
          {this.getRoleText(this.props.roles[player])}
          {
            this.state.countdown > 0 ?
            <Text style={{ color: 'white', fontSize: 24, padding: 6, marginTop: 20 }}>{this.state.countdown}</Text> :
            <TouchableOpacity
              onPress={this.nextPlayer}
              style={{borderColor: '#fff', borderWidth: 1, paddingLeft: 15, paddingRight: 15, paddingTop: 5, paddingBottom: 5, marginTop: 20}}
            >
                <Text style={{ color: 'white', fontSize: 24 }}>Got it.</Text>
            </TouchableOpacity>
          }
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
