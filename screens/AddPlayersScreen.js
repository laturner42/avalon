import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';

export default class AddPlayersScreen extends React.Component {

  state = { newName: '' }

  render() {
    const beginColor = this.props.players.length >= 5 ? '#4f5' : '#666';
    return (
      <View style={styles.container}>
        <View style={{width: '100%'}}>
          <Text style={{ color: '#5af', fontSize: 50, marginBottom: 25, textAlign: 'center' }}>avalon</Text>
        </View>
        <Text style={{ color: 'white', fontSize: 24 }}>Add new player:</Text>
        <TextInput
          style={{ fontSize: 21, height: 40, width: '100%', borderColor: '#fff', borderWidth: 1, borderTopWidth: 0, marginTop: 10, marginBottom: 10, padding: 5, color: 'white'}}
          onChangeText={(newName) => this.setState({newName})}
          value={this.state.newName}
          onSubmitEditing={() => {
            this.props.addPlayer(this.state.newName);
            this.setState({ newName: '' });
          }}
          autoCorrect={false}
          returnKeyType="done"
        />
        <View style={{
          width: '100%',
          flexWrap: 'wrap', 
          alignItems: 'flex-start',
          flexDirection: 'row',
        }}>
          <TouchableOpacity
            onPress={this.props.reset}
            style={{borderColor: '#fff', borderWidth: 1, paddingLeft: 15, paddingRight: 15, paddingTop: 5, paddingBottom: 5, margin: 10}}
          >
            <Text style={{ color: '#fff', fontSize: 24 }}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.props.begin}
            style={{borderColor: beginColor, borderWidth: 1, paddingLeft: 15, paddingRight: 15, paddingTop: 5, paddingBottom: 5, margin: 10}}
          >
            <Text style={{ color: beginColor, fontSize: 24 }}>Begin</Text>
          </TouchableOpacity>
        </View>
        { this.props.players.length > 0 && <Text style={{ color: 'white', fontSize: 24 }}>Current player list:</Text> }
        {
          this.props.players.map((player, i) => <Text style={{ color: '#bbb', fontSize: 22 }} key={player}>{i+1}. {player}</Text>)
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
