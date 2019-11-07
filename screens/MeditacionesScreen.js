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
import Cover from '../components/Cover';

export default class MeditacionesScreen extends Component {
  static navigationOptions = {};
  constructor(props) {
    super(props);
    this.state = {
      meditaciones: [],
      isLoading: true,
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

  _renderEmtpy = () => <Text>No hay Meditaciones :(</Text>;

  render = () => (
    <>
      <View style={styles.statusBar} />
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.sectionTitle}>Meditaciones</Text>
          <Cover
            source={{
              uri:
                'http://okoconnect.com/karim/images/viaje-1-video-preview.png',
            }}
          />
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
});
