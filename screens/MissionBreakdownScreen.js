import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';

const numbersToWords = [
  'First',
  'Second',
  'Third',
  'Fourth',
  'Fifth',
]

export default class MissionBreakdownScreen extends React.Component {

  renderMission = (i) => {

    const boxes = [];

    const { missionResults, missionParties, missionLeaders } = this.props;

    for (let j=0; j<this.props.missionChart[i]; j++) {
      let color = missionResults[i] ? '#4d5' : '#bbb';
      if (missionResults[i] && missionResults[i] <= j) {
        color = '#f54';
      }
      boxes.push(
        <View style={{
          width: 25,
          height: 25,
          borderWidth: 1,
          borderColor: 'black',
          backgroundColor: color,
        }} key={j}/>
      );
    }

    return (
      <View key={i} style={{ marginBottom: 10 }}>
        <Text style={{ color: '#fff', fontSize: 28, textAlign: 'left' }}>{numbersToWords[i]} Mission</Text>
        {
          !!missionLeaders[i] && (
            <Text style={{ color: '#8bf', fontSize: 24, textAlign: 'left', marginLeft: 5 }}>Selected by {missionLeaders[i]}</Text>
          )
        }
        <View style={styles.inline}>
          { boxes }
        </View>
        { !!missionParties[i] && missionParties[i].map(name => 
          <Text style={{ color: '#8bf', fontSize: 24, marginLeft: 10, }} key={name}>
            {name}
          </Text>
        )}
      </View>
    )
  }

  quit = () => {
    Alert.alert('Quit Game', 'Are you sure you want to quit? The Bad Guys will win.',
    [
      {text: 'No'},
      {text: 'Yes', onPress: () => this.props.finishGame(false), style: 'cancel'},
    ])
    
  }

  render() {
    const numGoodGuys = this.props.getGoodGuys().length;
    const numBadGuys = this.props.getBadGuys().length;
    const total = numGoodGuys + numBadGuys;
    return (
      <View style={styles.container}>
        <Text style={{ color: '#fff', fontSize: 32, marginTop: 20, marginBottom: 20, textAlign: 'center' }}>Mission Breakdown</Text>
        <ScrollView style={styles.scroller}>
          {
            [0,1,2,3,4].map(this.renderMission)
          }
        </ScrollView>
        <TouchableOpacity
          onPress={this.props.goBackToMissionChooser}
          style={{borderColor: '#fff', width: '100%', borderWidth: 1, paddingLeft: 15, paddingRight: 15, paddingTop: 5, paddingBottom: 5}}
        >
          <Text style={{ color: '#fff', fontSize: 24, textAlign: 'center' }}>Continue Playing</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.quit}
          style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', marginTop: 15 }}
        >
          <Text style={{ color: '#fb6', fontSize: 26 }}>{'Quit Game'}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'flex-start',
    justifyContent: 'flex-start', //'space-between',
    padding: 50,
  },
  scroller: {
    width: '100%',
    maxHeight: '70%',
  },
  inline: {
    flexDirection: 'row',
    margin: 10,
  },
  inner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', //'space-between',
  },
});
