import React from 'react';
import { Alert } from 'react-native';
import _ from 'lodash';

import AddPlayersScreen from './screens/AddPlayersScreen';
import RulesScreen from './screens/RulesScreen';
import IntroducePlayersScreen from './screens/IntroducePlayersScreen';
import MissionChooserScreen from './screens/MissionChooserScreen';
import MissionApprovalScreen from './screens/MissionApprovalScreen';
import MissionScreen from './screens/MissionScreen';
import AssassinScreen from './screens/AssassinScreen';
import FinishScreen from './screens/FinishScreen';
import SettingsScreen from './screens/SettingsScreen';

export default class App extends React.Component {

  state = {
    players: [],
    availableRoles: [ 'Merlin', 'Morgana', 'Assassin', 'Percy' ],
    roles: {},
    STATE_VIEW: 'CHANGE_SETTINGS',
    missionNumber: 0,
    missionLeader: 0,
    missionSize: 3,
    passedMissions: 0,
    failedMissions: 0,
    consecutiveFailures: 0,
  }

  goodRoles = ['Merlin', 'Percy', 'Lover', 'Good Guy'];
  badRoles = ['Morgana', 'Assassin', 'Oberoff', 'Bad Guy'];

  getGoodGuys = () => Object.keys(this.state.roles).filter(name => this.goodRoles.includes(this.state.roles[name]));
  getBadGuys = () => Object.keys(this.state.roles).filter(name => this.badRoles.includes(this.state.roles[name]));
  getLovers = () => Object.keys(this.state.roles).filter(name => this.state.roles[name] === 'Lover');
  isGoodGuy = (player) => this.goodRoles.includes(this.state.roles[player]);

  addAvailableRoles = (roles) => {
    const availableRoles = this.state.availableRoles.slice();
    roles.map(role => availableRoles.push(role));
    this.setState({
      availableRoles,
    })
  }

  removeAvailableRoles = (roles) => {
    const availableRoles = this.state.availableRoles.slice();
    roles.map(role => {
      const i = availableRoles.indexOf(role);
      if (i >= 0) {
        availableRoles.splice(i, 1);
      }
    })
    this.setState({
      availableRoles,
    })
  }

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
    const partyLeader = this.state.players[this.state.missionLeader]
    if (party.includes(partyLeader)) {
      const i = party.indexOf(partyLeader);
      const p = party.splice(i, 1)[0];
      party.unshift(p);
    }
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
        this.finishGame(false);
      } else if (this.state.availableRoles.includes('Lover') || this.state.availableRoles.includes('Merlin')) {
        this.setState({
          STATE_VIEW: 'ASSASSIN'
        })
      } else {
        this.finishGame(true);
      }
    }
  }

  iUnderstand = () => {
    this.setState({
      STATE_VIEW: 'INTRODUCTIONS',
    })
  }

  canPlayWithRoles = () => {
    const numGoodGuys = this.goodGuysPerPlayers[this.state.players.length];
    const numBadGuys = this.state.players.length - this.goodGuysPerPlayers[this.state.players.length];
    const goodRoles = this.state.availableRoles.filter(role => this.goodRoles.includes(role)).length;
    const badRoles = this.state.availableRoles.filter(role => this.badRoles.includes(role)).length;
    return numGoodGuys >= goodRoles && numBadGuys >= badRoles;
  }

  begin = () => {
    if (this.state.players.length < 5) {
      Alert.alert('You need at least 5 players.');
      return;
    }
    if (!this.canPlayWithRoles()) {
      Alert.alert('You don\'t have enough players to fill the currently selected roles.');
      return;
    }
    
    let remainingRoles = this.state.availableRoles.slice();
    let goodRoles = remainingRoles.filter(role => this.goodRoles.includes(role));
    while (goodRoles.length < this.goodGuysPerPlayers[this.state.players.length]) {
      remainingRoles.push('Good Guy');
      goodRoles = remainingRoles.filter(role => this.goodRoles.includes(role));
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

  changeSettings = () => {
    this.setState({
      STATE_VIEW: 'CHANGE_SETTINGS',
    })
  }

  getScreen = () => {
    switch(this.state.STATE_VIEW) {
      case 'ADD_PLAYERS':
        return <AddPlayersScreen addPlayer={this.addPlayer} reset={this.reset} players={this.state.players} canPlayWithRoles={this.canPlayWithRoles} begin={this.begin} changeSettings={this.changeSettings} />
      case 'CHANGE_SETTINGS':
        return <SettingsScreen availableRoles={this.state.availableRoles} addAvailableRoles={this.addAvailableRoles} removeAvailableRoles={this.removeAvailableRoles} reset={this.reset} />
      case 'SHOW_RULES':
        return <RulesScreen getGoodGuys={this.getGoodGuys} getBadGuys={this.getBadGuys} missionChart={this.missionSizeChart[this.state.players.length]} iUnderstand={this.iUnderstand} />
      case 'INTRODUCTIONS':
        return <IntroducePlayersScreen roles={this.state.roles} getLovers={this.getLovers} getGoodGuys={this.getGoodGuys} getBadGuys={this.getBadGuys} isGoodGuy={this.isGoodGuy} finishIntroductions={this.finishIntroductions} />
      case 'CHOOSE_MISSION':
        return <MissionChooserScreen missionLeader={this.state.missionLeader} missionSize={Math.round(this.state.missionSize)} missionNumber={this.state.missionNumber} players={this.state.players} getMissionApproval={this.getMissionApproval} />
      case 'APPROVAL':
        return <MissionApprovalScreen party={this.state.party} denyMission={this.denyMission} approveMission={this.approveMission}/>
      case 'GO_ON_MISSION':
        return <MissionScreen party={this.state.party} getGoodGuys={this.getGoodGuys} getBadGuys={this.getBadGuys} numPlayers={this.state.players.length} missionNumber={this.state.missionNumber} finishMission={this.finishMission}/>
      case 'ASSASSIN':
        return <AssassinScreen players={this.state.players} roles={this.state.roles} isGoodGuy={this.isGoodGuy} finishGame={this.finishGame} availableRoles={this.state.availableRoles} />
      case 'FINISHED':
        return <FinishScreen players={this.state.players} reset={this.reset} isGoodGuy={this.isGoodGuy} roles={this.state.roles} goodGuysWin={this.state.goodGuysWin} />
    }
  }

  render() {
    return this.getScreen();
  }
}
