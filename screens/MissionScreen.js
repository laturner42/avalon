import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';

export default class MissionScreen extends React.Component {

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
      // The fourth mission is mission index 3
      const needToFail = this.props.numPlayers >= 7 && this.props.missionNumber === 3 ? 2 : 1;
      let displayArray = [...Array(pass)].map(()=>'pass');
      const failArray = [...Array(fail)].map(()=>'fail');
      displayArray = displayArray.concat(failArray);
      this.setState({
        passed: fail < needToFail,
        displayArray,
        displayIndex: -2,
      });
      setTimeout(this.nextResult, 3300);
    }
  }

  nextResult = () => {
    const displayIndex = this.state.displayIndex + 1;
    if (displayIndex < this.state.displayArray.length) {
      this.setState({
        displayIndex,
      })
      setTimeout(this.nextResult, 1500);
    } else {
      this.props.finishMission(this.state.passed, this.props.party, this.state.pass);
    }
    // if (this.state.display) {
    //   const { pass, fail } = this.state;
    //   pass > 0 ? pass -= 1 : fail -= 1;
    //   if (pass === 0 && fail === 0) {
    //     this.props.finishMission(this.state.passed);
    //   } else {
    //     this.setState({
    //       pass, fail,
    //       display: false,
    //     })
    //     setTimeout(this.nextResult, 2000);
    //   }
    // } else {
    //   this.setState({
    //     display: true,
    //   })
    //   setTimeout(this.nextResult, 1100);
    // }
  }

  render() {
    const player = this.state.remainingPlayers[0];
    if (this.state.showResults) {
      const blockHeight = Dimensions.get('window').height / this.props.party.length;
      return (
        <View style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'black',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          { this.state.displayIndex == -2 && <Text style={{ color: 'white', fontSize: 28 }}>show the phone to the party</Text>}
          {
            this.state.displayIndex >= 0 && this.state.displayArray.slice(0, this.state.displayIndex + 1).map((pass, i) => (
              <View style={{
                position: 'absolute',
                width: '100%',
                left: 0,
                right: 0,
                top: blockHeight * i,
                height: blockHeight,
                backgroundColor: pass === 'pass' ? 'green' : 'red',
                borderWidth: 1,
                borderColor: 'black',
              }}
              key={i}
              />
            ))
          }
        </View>
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
