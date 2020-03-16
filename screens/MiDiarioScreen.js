import React, {Component} from 'react';
import {StyleSheet, ScrollView, View, SafeAreaView} from 'react-native';
import Dims from '../constants/Dimensions';
import CalendarComponent from '../components/CalendarComponent';
/**
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp} navigation
 * @extends {Component<Props>}
 */
export default class MiDiarioScreen extends Component {
  static navigationOptions = {
    //title: 'Paso',
  };

  render() {
    return (
      <SafeAreaView style={styles.safe}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.container}>
            <CalendarComponent />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    paddingHorizontal: Dims.regularSpace,
  },
});
