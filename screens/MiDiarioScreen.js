import React, {Component} from 'react';
import {Text, StyleSheet, ScrollView, View, SafeAreaView} from 'react-native';
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
      <>
      <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.container}>
            <CalendarComponent />
          </View>
        </ScrollView>
      </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Dims.regularSpace,
  },
});
