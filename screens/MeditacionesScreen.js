import React, {Component} from 'react';
import {Text, SectionList, StyleSheet, Image, View} from 'react-native';
import Buttom from '../components/Buttom';
import TabBarIcon from '../components/TabBarIcon';
import Colors from '../constants/Colors';
import Dims from '../constants/Dimensions';
import Constants from 'expo-constants';
import API from '../utils/API';
const iconMeditar = '..assets/images/iconsNavigations/iconMeditar.png';


export default class MeditacionesScreen extends Component {
  static navigationOptions = {
    //header: null,
    tabBarIcon: ({focused}) => (
      <TabBarIcon focused={focused} name={'md-link'} uri={iconMeditar}/>
    ),
  };
  constructor(props) {
    super(props);
    this.state = {
      meditaciones: [{title: 'Meditaciones', data: []}],
    };
  }
  async componentDidMount() {
    const data = await API.getMeditaciones();
    this.setState({
      meditaciones: [{title: 'Meditaciones', data}],
    });

    //console.log(this.state.meditaciones[0]);
  }

  _handleClick = item => {
    this.props.navigation.navigate('Meditacion', {
      meditacion: item,
    });
  };
  _renderItem = ({item}) => {
    return (
      <Buttom
        style={{backgroundColor: item.color || Colors.primaryDark}}
        onPress={() => {
          this._handleClick(item);
        }}>
        <Text style={styles.title_boxes}>{item.title}</Text>
        <Image style={styles.image} source={{uri: item.itemImage}} />
      </Buttom>
    );
  };

  _renderHeader = ({section: {title}}) => (
    <Text style={styles.sectionTitle}>{title}</Text>
  );
  _renderEmtpy = () => <Text>No hay Meditaciones :(</Text>;

  render = () => (
    <>
      <View style={styles.statusBar} />
      <SectionList
        style={styles.container}
        sections={this.state.meditaciones}
        renderItem={this._renderItem}
        ListEmptyComponent={this._renderEmtpy}
        renderSectionHeader={this._renderHeader}
        keyExtractor={item => item.id}
      />
    </>
  );
}

const styles = StyleSheet.create({
  statusBar: {
    //height: StatusBar.currentHeight,
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
  },
});
