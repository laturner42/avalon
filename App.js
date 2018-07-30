import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import _ from 'lodash';

import AddPlayersScreen from './screens/AddPlayersScreen';
import RulesScreen from './screens/RulesScreen';
import IntroducePlayersScreen from './screens/IntroducePlayersScreen';
import MissionChooserScreen from './screens/MissionChooserScreen';
import MissionApprovalScreen from './screens/MissionApprovalScreen';
import MissionScreen from './screens/MissionScreen';
import AssassinScreen from './screens/AssassinScreen';
import FinishScreen from './screens/FinishScreen';

export default class App extends React.Component {

  state = {
    players: [],
    roles: {},
    STATE_VIEW: 'ADD_PLAYERS',
    missionNumber: 0,
    missionLeader: 0,
    missionSize: 3,
    passedMissions: 0,
    failedMissions: 0,
    consecutiveFailures: 0,
  }

  goodRoles = ['Merlin', 'Percy', 'Good Guy'];
  badRoles = ['Maldova', 'Assassin', 'Bad Guy'];

  getGoodGuys = () => Object.keys(this.state.roles).filter(name => this.goodRoles.includes(this.state.roles[name]));
  getBadGuys = () => Object.keys(this.state.roles).filter(name => this.badRoles.includes(this.state.roles[name]));
  isGoodGuy = (player) => this.goodRoles.includes(this.state.roles[player]);

  goodGuysPerPlayers = {
    5: 3,
    6: 4,
    7: 4,
    8: 5,
    9: 6,
    10: 6,
  }

  missionSizeChart = {
    5:  [2, 3, 2, 3, 3],
    6:  [2, 3, 4, 3, 4],
    7:  [2, 3, 3, 4, 4],
    8:  [3, 4, 4, 5, 5],
    9:  [3, 4, 4, 5, 5],
    10: [3, 4, 4, 5, 5],
  }
  
  reset = (keepPlayers) => {
    this.setState({
      players: keepPlayers ? this.state.players : [],
      missionNumber: 0,
      missionLeader: 0,
      passedMissions: 0,
      failedMissions: 0,
      consecutiveFailures: 0,
      STATE_VIEW: 'ADD_PLAYERS',
      roles: {},
    })
  }

  addPlayer = (player) => {
    if (player.length < 2) return;
    if (this.state.players.includes(player)) {
      Alert.alert('This player is already playing.');
      return;
    }
    if (this.state.players.length === 10) {
      Alert.alert('The max number of players is 10.');
      return;
    }
    const players = this.state.players;
    players.push(player);
    this.setState({ players });
  }

  finishIntroductions = () => {
    this.setState({
      STATE_VIEW: 'CHOOSE_MISSION',
      missionSize: this.missionSizeChart[this.state.players.length][0],
      missionNumber: 0,
    })
  }

  getMissionApproval = (party) => {
    this.setState({
      party,
      STATE_VIEW: 'APPROVAL'
    })
  }

  approveMission = () => {
    this.setState({
      STATE_VIEW: 'GO_ON_MISSION',
      consecutiveFailures: 0,
    })
  }
  
  nextMissionLeader = () => {
    let missionLeader = this.state.missionLeader + 1;
    if (missionLeader >= this.state.players.length) {
      missionLeader = 0;
    }
    return missionLeader;
  }

  denyMission = () => {
    const consecutiveFailures = this.state.consecutiveFailures + 1;
    if (consecutiveFailures >= 5) {
      this.finishGame(false);
    } else {
      this.setState({
        STATE_VIEW: 'CHOOSE_MISSION',
        missionLeader: this.nextMissionLeader(),
        consecutiveFailures,
      });
    }
  }


  finishMission = (passed) => {
    console.log('the roles are', this.state.roles);
    let passedMissions = this.state.passedMissions;
    let failedMissions = this.state.failedMissions
    if (passed) {
      passedMissions += 1;
    } else {
      failedMissions += 1;
    }
    const missionNumber = this.state.missionNumber + 1;
    if (passedMissions < 3 && failedMissions < 3) {
      this.setState({
        STATE_VIEW: 'CHOOSE_MISSION',
        missionLeader: this.nextMissionLeader(),
        passedMissions, failedMissions,
        missionSize: this.missionSizeChart[this.state.players.length][missionNumber],
        missionNumber: missionNumber,
      })
    } else {
      if (failedMissions >= 3) {
        finishGame(false);
      } else {
        console.log('Gonna assassinate');
        this.setState({
          STATE_VIEW: 'ASSASSIN'
        })
      }
    }
  }

  iUnderstand = () => {
    this.setState({
      STATE_VIEW: 'INTRODUCTIONS',
    })
  }

  begin = () => {
    if (this.state.players.length < 5) return;
    
    let remainingRoles = [
      'Merlin',
      'Maldova',
      'Assassin',
      'Percy',
    ];
    while (remainingRoles.length - 2 < this.goodGuysPerPlayers[this.state.players.length]) {
      remainingRoles.push('Good Guy');
    }
    while (remainingRoles.length < this.state.players.length) {
      remainingRoles.push('Bad Guy');
    }
    remainingRoles = _.shuffle(remainingRoles);
    const roles = {};
    const shuffledPlayers = _.shuffle(this.state.players);
    const players = shuffledPlayers.slice();
    while (players.length) {
      const player = players.pop();
      roles[player] = remainingRoles.pop();
    }
    this.setState({
      roles, STATE_VIEW: 'SHOW_RULES', players: shuffledPlayers,
    });
  }

  finishGame = (goodGuysWin) => {
    this.setState({
      STATE_VIEW: 'FINISHED',
      goodGuysWin,
    })
  }

  getScreen = () => {
    switch(this.state.STATE_VIEW) {
      case 'ADD_PLAYERS':
        return <AddPlayersScreen addPlayer={this.addPlayer} reset={this.reset} players={this.state.players} begin={this.begin} />
      case 'SHOW_RULES':
        return <RulesScreen getGoodGuys={this.getGoodGuys} getBadGuys={this.getBadGuys} missionChart={this.missionSizeChart[this.state.players.length]} iUnderstand={this.iUnderstand} />
      case 'INTRODUCTIONS':
        return <IntroducePlayersScreen roles={this.state.roles} getGoodGuys={this.getGoodGuys} getBadGuys={this.getBadGuys} finishIntroductions={this.finishIntroductions} />
      case 'CHOOSE_MISSION':
        return <MissionChooserScreen missionLeader={this.state.missionLeader} missionSize={Math.round(this.state.missionSize)} players={this.state.players} getMissionApproval={this.getMissionApproval} />
      case 'APPROVAL':
        return <MissionApprovalScreen party={this.state.party} denyMission={this.denyMission} approveMission={this.approveMission}/>
      case 'GO_ON_MISSION':
        return <MissionScreen party={this.state.party} getGoodGuys={this.getGoodGuys} getBadGuys={this.getBadGuys} missionNumber={this.state.missionNumber} finishMission={this.finishMission}/>
      case 'ASSASSIN':
        return <AssassinScreen players={this.state.players} roles={this.state.roles} isGoodGuy={this.isGoodGuy} finishGame={this.finishGame} />
      case 'FINISHED':
        return <FinishScreen players={this.state.players} reset={this.reset} roles={this.state.roles} goodGuysWin={this.state.goodGuysWin} />
    }
  }

  render() {
    console.log(this.state);
    return this.getScreen();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    width: '100%',
    height: '100%',
  },
});
