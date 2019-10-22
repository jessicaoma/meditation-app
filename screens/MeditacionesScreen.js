import React, {Component} from 'react';
import {Text, SectionList, StyleSheet, Image} from 'react-native';
import Buttom from '../components/Buttom';
import Colors from '../constants/Colors';
import Dims from '../constants/Dimensions';

const data = [
  {
    title: 'Meditaciones',
    data: [
      {
        id: 1,
        title: 'Meditación 1',
        img: 'http://okoconnect.com/karim/images/meditar2.png',
      },
      {
        id: 2,
        title: 'Meditación 2',
        img: 'http://okoconnect.com/karim/images/meditar4.png',
      },
      {
        id: 3,
        title: 'Meditación 3',
        img: 'http://okoconnect.com/karim/images/meditar1.png',
      },
      {
        id: 4,
        title: 'Meditación 4',
        img: 'http://okoconnect.com/karim/images/meditar3.png',
      },
    ],
  },
];

const styles = StyleSheet.create({
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

export default class MeditacionesScreen extends Component {
  static navigationOptions = {
    header: null,
  };
  _handleClick = () => {
    this.props.navigation.navigate('Meditacion');
  };
  render = () => (
    <>
      <SectionList
        style={styles.container}
        sections={data}
        renderItem={({item}) => (
          <Buttom
            style={{backgroundColor: item.bg || Colors.primaryDark}}
            onPress={this._handleClick}>
            <Text style={styles.title_boxes}>{item.title}</Text>
            <Image style={styles.image} source={{uri: item.img}} />
          </Buttom>
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.sectionTitle}>{title}</Text>
        )}
        keyExtractor={item => 'meditacionId' + item.id}
      />
    </>
  );
}

MeditacionesScreen;
