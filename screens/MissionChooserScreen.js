import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

export default class MissionChooserScreen extends React.Component {

  state = {
    playersChosen: [],
  }

  selectPlayer = (player) => {
    const playersChosen = this.state.playersChosen.slice();
    const i = playersChosen.indexOf(player);
    if (i >= 0) {
      playersChosen.splice(i, 1);
    } else if (playersChosen.length < this.props.missionSize){
      playersChosen.push(player);
    }
    this.setState({
      playersChosen,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'white', fontSize: 30 }}>
          <Text style={{ color: '#6bf' }}>{this.props.players[this.props.missionLeader]}</Text>,
          you are the Mission Leader!
        </Text>
        <Text style={{ color: '#aaa', fontSize: 24, margin: 5 }}>Mission {this.props.missionNumber + 1}: Choose {this.props.missionSize}</Text>
        <ScrollView style={{ maxHeight: '50%' }}>
          {
            this.props.players.map((player) => (
              <View style={{
                width: '100%',
                flexWrap: 'wrap', 
                alignItems: 'flex-start',
                flexDirection: 'row',
                margin: 10,
              }} key={player}>
                <TouchableOpacity
                  onPress={() => this.selectPlayer(player)}
                  style={{borderColor: '#fff', borderWidth: 1, width: 30, height: 30, marginRight: 10,
                    backgroundColor: this.state.playersChosen.includes(player) ? '#2a5': 'black',
                  }}
                />
                <Text style={{ color: 'white', fontSize: 24, width: '70%' }} numberOfLines={1}>{player}</Text>
              </View>
            ))
          }
        </ScrollView>
        <TouchableOpacity
          onPress={this.props.showLiveMissionBreakdown}
          style={{borderColor: 'white', borderWidth: 1, paddingLeft: 15, paddingRight: 15, paddingTop: 5, paddingBottom: 5, marginTop: 20, width: '100%'}}
        >
          <Text style={{ color: '#ccc', fontSize: 26, textAlign: 'center' }}>Mission Breakdown</Text>
        </TouchableOpacity>
        {this.state.playersChosen.length === this.props.missionSize &&
          <TouchableOpacity
            onPress={() => this.props.getMissionApproval(this.state.playersChosen)}
            style={{borderColor: 'white', borderWidth: 1, paddingLeft: 15, paddingRight: 15, paddingTop: 5, paddingBottom: 5, marginTop: 20, width: '100%'}}
          >
            <Text style={{ color: '#6bf', fontSize: 26, textAlign: 'center' }}>Propose Mission Party</Text>
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
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 50,
  },
});
