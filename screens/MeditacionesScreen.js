import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  Image,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Buttom from '../components/Buttom';
import Colors from '../constants/Colors';
import Dims from '../constants/Dimensions';
import Constants from 'expo-constants';
import API from '../utils/API';
import ScreenBg from '../components/screenBg';
import Player from '../player/Player';

export default class MeditacionesScreen extends Component {
  static navigationOptions = {};
  constructor(props) {
    super(props);
    this.state = {
      meditaciones: [],
      isLoading: true,
      //heightCover: 210,
    };
  }
  async componentDidMount() {
    const data = await API.getMeditaciones();
    this.setState({
      meditaciones: data,
      isLoading: false,
    });

    //console.log(this.state.meditaciones[0]);
  }

  _handleClick = item => {
    this.props.navigation.navigate('Meditacion', {
      meditacion: item,
    });
  };

  _renderItem = item => {
    return (
      <Buttom
        key={item.id}
        style={{backgroundColor: item.color || Colors.primaryDark}}
        onPress={() => {
          this._handleClick(item);
        }}>
        <Text style={styles.title_boxes}>{item.title}</Text>
        <Image style={styles.image} source={{uri: item.itemImage}} />
      </Buttom>
    );
  };

  /*_handleLoad = event => {
    const {height} = event.nativeEvent.source;
    this.setState({heightCover: height});
    //console.log(height);
  };*/

  render = () => (
    <>
      <View style={styles.statusBar} />
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.sectionTitle}>Meditaciones</Text>
          <ScreenBg
            source={{
              uri:
                'http://okoconnect.com/karim/images/viaje-1-video-preview.png',
            }}
            styleView={[
              styles.containBG,
              {
                height: 210,
              },
            ]}
            styleImage={styles.imageBG}>
            <Player
              source={{
                uri: 'http://okoconnect.com/karim/videos/video2.mp4',
              }}
              isVideo={true}
              styleVideo={styles.video}
            />
          </ScreenBg>
        </View>
        {this.state.isLoading ? (
          <ActivityIndicator size="large" color={Colors.primaryDark} />
        ) : (
          this.state.meditaciones.map(this._renderItem)
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  statusBar: {
    height: Constants.statusBarHeight,
  },
  container: {
    paddingHorizontal: Dims.regularSpace,
  },
  sectionTitle: {
    fontSize: 20,
    letterSpacing: 1.11,
    lineHeight: 36,
    marginTop: Dims.regularSpace,
    marginRight: 0,
    marginBottom: 3,
    marginLeft: 0,
    color: Colors.grey,
    fontFamily: 'MyriadPro-Bold',
  },
  title_boxes: {
    color: 'white',
    fontSize: 15.5,
    letterSpacing: 0.99,
    lineHeight: 25,
    textTransform: 'uppercase',
    alignSelf: 'center',
  },
  image: {
    resizeMode: 'cover',
    width: 94,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  containBG: {
    borderRadius: 20,
    marginBottom: Dims.bigSpace,
  },
  imageBG: {
    resizeMode: 'cover',
    borderRadius: 20,
  },
  video: {
    borderRadius: 20,
  },
});
