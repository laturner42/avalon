import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';

export default class AssassinScreen extends React.Component {

  state = {
    showReset: false,
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        showReset: true,
      })
    }, 5000);
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: 'black' }} contentContainerStyle={styles.container}>
        {
          this.props.goodGuysWin ?
          <Text style={{ color: '#4f5', fontSize: 32, textAlign: 'center' }}>The Good Guys Win!</Text> :
          <Text style={{ color: '#f54', fontSize: 32, textAlign: 'center' }}>The Bad Guys Win!</Text>
        }
        <Text style={{ color: '#4f5', fontSize: 24, textAlign: 'center', marginTop: 20, marginBottom: 10 }}>Good Guys:</Text>
        {
          this.props.players.filter(this.props.isGoodGuy).map(player => (
            <Text style={{ color: '#eee', fontSize: 24, textAlign: 'center' }} key={player}>{player}: {this.props.roles[player]}</Text>
          ))
        }
        <Text style={{ color: '#f54', fontSize: 24, textAlign: 'center', marginTop: 20, marginBottom: 10 }}>Bad Guys:</Text>
        {
          this.props.players.filter(p => !this.props.isGoodGuy(p)).map(player => (
            <Text style={{ color: '#eee', fontSize: 24, textAlign: 'center' }} key={player}>{player}: {this.props.roles[player]}</Text>
          ))
        }
        {
          this.state.showReset &&
          <TouchableOpacity
            onPress={() => this.props.reset(true)}
            style={{borderColor: '#fff', borderWidth: 1, paddingLeft: 15, paddingRight: 15, paddingTop: 5, paddingBottom: 5, marginTop: 20}}
          >
            <Text style={{ color: '#fff', fontSize: 24 }}>Play Again</Text>
          </TouchableOpacity>
        }
      </ScrollView>
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
