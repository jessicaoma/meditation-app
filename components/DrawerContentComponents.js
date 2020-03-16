import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import Dimensions from '../constants/Dimensions';
import TabBarIcon from './TabBarIcon';

/**
 * Drawer Content Render
 * @extends {Component<import('react-navigation').DrawerItemsProps & {descriptors: {[key: string]: import('react-navigation').NavigationDescriptor}}>}
 */
export default class DrawerContentComponents extends Component {
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigateAction);
  };

  renderItem = item => {
    const options = this.props.descriptors[item.key].options;
    return (
      <View style={[styles.itemStyle]} key={item.key}>
        <TabBarIcon name={item.key} />
        <Text
          style={[styles.labelStyle]}
          onPress={this.navigateToScreen(item.key)}>
          {options.title}
        </Text>
      </View>
    );
  };

  render() {
    return (
      <View>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Janett Ramirez</Text>
            </View>
            <View style={styles.itemsContainer}>
              {this.props.items.slice(1).map(item => this.renderItem(item))}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: Dimensions.statusBarHeight,
  },
  headerContainer: {
    minHeight: 64,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
    justifyContent: 'center',
    marginTop: 10,
    borderBottomColor: 'rgba(115, 115, 115, 0.5)',
    borderStartColor: 'white',
    borderTopColor: 'white',
    borderEndColor: 'white',
    borderWidth: 1,
    alignSelf: 'center',
  },
  headerText: {
    fontFamily: 'SFProText-Medium',
    fontSize: Dimensions.window.width * 0.06,
    color: '#494c6b',
  },
  itemsContainer: {
    padding: 20,
    width: '100%',
  },
  itemStyle: {
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
  },
  labelStyle: {
    fontSize: Dimensions.window.width * 0.038,
    marginLeft: 20,
    textAlign: 'left',
    fontFamily: 'MyriadPro-Regular',
    color: '#665e61',
    height: 50,
    flex: 1,
    alignItems: 'flex-start',
    paddingVertical: 5,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});
