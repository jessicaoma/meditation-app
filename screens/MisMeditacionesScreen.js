import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  Image,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Buttom from '../components/Buttom';
import Colors from '../constants/Colors';
import Dims from '../constants/Dimensions';
import Constants from 'expo-constants';
import API from '../utils/API';
import ScreenBg from '../components/screenBg';
import Player from '../player/Player';

/**
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp} navigation
 * @extends {Component<Props>}
 */
export default class MisMeditacionesScreen extends Component {
  static navigationOptions = {};
  constructor(props) {
    super(props);
    /** @type {{meditaciones: import('../utils/API').Meditación[]}} */
    this.state = {
      meditaciones: [
        {"id":"med1",
        "title":"Meditación Básica",
        "backgroundImage":"http://okoconnect.com/karim/images/meditar2-full.png",
        "color":"#7883a4",
        "itemImage":"http://okoconnect.com/karim/images/meditar2.png",
        "intro":"http://okoconnect.com/karim/videos/pre_meditacion.mp4",
        "media":"http://okoconnect.com/karim/meditaciones/Meditacion-Basica.mp3",
        "time":"05hr 22min",
        },
        {
        "id":"med2",
        "title":"Meditación otra",
        "backgroundImage":"http://okoconnect.com/karim/images/meditar4-full.png",
        "color":"#7883a4",
        "itemImage":"http://okoconnect.com/karim/images/meditar4.png",
        "intro":"http://okoconnect.com/karim/videos/pre_meditacion.mp4","media":"http://okoconnect.com/karim/meditaciones/Meditacion-Basica.mp3",
        "time":"01hr 04min",
        },
      ],
    };
  }

  /** @param {import('../utils/API').Meditación} item */
  _handleClick = item => {
    this.props.navigation.navigate('Mis Meditaciones', {
      meditacion: item,
    });
  };

  /** @param {{item : import('../utils/API').Meditación}} item */
  _renderItem = ({item}) => {
    return (
      <Buttom
        key={item.id}
        style={[
          styles.button,
          {backgroundColor: item.color || Colors.primaryDark},
        ]}
        onPress={() => {
          this._handleClick(item);
        }}>
        <View style={styles.textContainer}>
          <Text style={styles.title_boxes}>{item.title}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Image style={styles.image} source={{uri: item.itemImage}} />
      </Buttom>
    );
  };

  _renderListEmpty = _ => {
    return <ActivityIndicator size="large" color={Colors.primaryDark} />;
  };
  /** @param {import('../utils/API').Meditación} item */
  _keyExtractor = item => item.id;

  render = () => (
    <>
      <View style={styles.statusBar} />
      <FlatList
        data={this.state.meditaciones}
        renderItem={this._renderItem}
        ListEmptyComponent={this._renderListEmpty}
        style={styles.container}
        keyExtractor={this._keyExtractor}
      />
    </>
  );
}

const styles = StyleSheet.create({
  statusBar: {
    height: Constants.statusBarHeight,
  },
  container: {
    paddingHorizontal: Dims.regularSpace,
    flex: 1,
  },
  button: {
    paddingRight: 0,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'flex-start',
  },
  title_boxes: {
    color: 'white',
    fontSize: Dims.window.width * 0.038,
    letterSpacing: 0.055,
    lineHeight: 25,
    textTransform: 'uppercase',
    alignSelf: 'flex-start',
    textAlign: 'left',
    fontFamily: 'MyriadPro-Regular',
  },
  image: {
    resizeMode: 'cover',
    width: 92,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
  },
  time: {
    fontFamily: 'MyriadPro-Bold',
    fontSize: Dims.window.width * 0.028,
    color: 'white',
  },
});