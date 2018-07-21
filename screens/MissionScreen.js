import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';

export default class IntroducePlayersScreen extends React.Component {

  state = {
      remainingPlayers: [],
      pass: 0,
      fail: 0,
  }

  componentDidMount() {
    this.setState({
        remainingPlayers: this.props.party
    })
  }

  playerVote = (player, vote) => {
    let pass = this.state.pass;
    let fail = this.state.fail;
    if (vote === 'pass' || this.props.getGoodGuys().includes(player)) {
      pass += 1;
    } else {
      fail += 1;
    }

    const remainingPlayers = this.state.remainingPlayers.slice();
    remainingPlayers.shift();

    this.setState({
      showResults: remainingPlayers.length < 1,
      remainingPlayers,
      pass, fail,
    });

    if (remainingPlayers.length < 1) {
      this.setState({
        passed: fail === 0,
        display: false,
      });
      setTimeout(this.nextResult, 4000);
    }
  }

  nextResult = () => {
    if (this.state.display) {
      const { pass, fail } = this.state;
      pass > 0 ? pass -= 1 : fail -= 1;
      if (pass === 0 && fail === 0) {
        this.props.finishMission(this.state.passed);
      } else {
        this.setState({
          pass, fail,
          display: false,
        })
        setTimeout(this.nextResult, 2500);
      }
    } else {
      this.setState({
        display: true,
      })
      setTimeout(this.nextResult, 1500);
    }
  }

  render() {
    const player = this.state.remainingPlayers[0];
    if (this.state.showResults) {
      let backgroundColor = 'black';
      if (this.state.display) {
        backgroundColor = this.state.pass > 0 ? 'green' : 'red';
      }
      return (
        <View style={{
          width: '100%',
          height: '100%',
          backgroundColor,
        }}/>
      )
    }
    return (
      <View style={styles.container}>
        <Text style={{ color: 'white', fontSize: 28 }}>{player}, please act on the mission:</Text>
        <TouchableOpacity
          onPress={() => this.playerVote(player, 'pass')}
          style={{borderColor: '#fff', borderWidth: 1, paddingLeft: 15, paddingRight: 15, paddingTop: 5, paddingBottom: 5, marginTop: 20, width: '40%'}}
        >
          <Text style={{ color: 'white', fontSize: 26, textAlign: 'center' }}>Pass</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.playerVote(player, 'fail')}
          style={{borderColor: '#fff', borderWidth: 1, paddingLeft: 15, paddingRight: 15, paddingTop: 5, paddingBottom: 5, marginTop: 20, width: '40%'}}
        >
          <Text style={{ color: 'white', fontSize: 26, textAlign: 'center' }}>Fail</Text>
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
