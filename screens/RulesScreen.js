import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const numbersToWords = [
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
]

export default class RulesScreen extends React.Component {

  state = {
    showReset: false,
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        showReset: true,
      })
    }, 2000);
  }

  render() {
    const numGoodGuys = this.props.getGoodGuys().length;
    const numBadGuys = this.props.getBadGuys().length;
    const total = numGoodGuys + numBadGuys;
    return (
      <View style={styles.container}>
        <View style={styles.inner}>
          <Text style={{ color: '#fff', fontSize: 32, textAlign: 'center' }}>Game specifics:</Text>
          <Text style={{ color: '#4f5', fontSize: 24, textAlign: 'center' }}>{numGoodGuys} Good Guys</Text>
          <Text style={{ color: '#f54', fontSize: 24, textAlign: 'center' }}>{numBadGuys} Bad Guys</Text>
          <Text style={{ color: '#fff', fontSize: 26, textAlign: 'center', margin: 5, }}>Mission breakdown:</Text>
          {
            [0,1,2,3,4].map(i => <Text style={{ color: '#ddd', fontSize: 24 }} key={i}>{numbersToWords[i]}{i===3 && total >= 7 && '*'}: {this.props.missionChart[i]} people</Text>)
          }
          {
            this.state.showReset &&
            <TouchableOpacity
              onPress={this.props.iUnderstand}
              style={{borderColor: '#fff', borderWidth: 1, paddingLeft: 15, paddingRight: 15, paddingTop: 5, paddingBottom: 5, margin: 10}}
            >
              <Text style={{ color: '#fff', fontSize: 24 }}>We're ready.</Text>
            </TouchableOpacity>
          }
          {total >= 7 && <Text style={{ color: '#ccc', fontSize: 20, textAlign: 'center' }}>*This mission takes two failures to Fail</Text>}
        </View>
        <View>
          <Text style={{ color: '#ccc', fontSize: 20, textAlign: 'center' }}>Remember, good guys can't fail missions - even if they try.</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 50,
  },
  inner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', //'space-between',
  },
});
