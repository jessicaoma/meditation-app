import React, {Component} from 'react';
import {
  Text,
  SectionList,
  StyleSheet,
  Image,
  View,
  StatusBar,
} from 'react-native';
import Buttom from '../components/Buttom';
import Colors from '../constants/Colors';
import Dims from '../constants/Dimensions';

const data = [
  {
    title: 'Categorías',
    data: [
      {
        id: 1,
        title: 'Ser feliz',
        bg: '#fdd58d',
        img: 'http://okoconnect.com/karim/images/cat1.png',
      },
      {
        id: 2,
        title: 'Emociones',
        bg: '#f6e1aa',
        img: 'http://okoconnect.com/karim/images/cat2.png',
      },
      {
        id: 3,
        title: 'Relaciones Personales',
        bg: '#efbfba',
        img: 'http://okoconnect.com/karim/images/cat3.png',
      },
      {
        id: 4,
        title: 'Autoestima',
        bg: '#f1dee1',
        img: 'http://okoconnect.com/karim/images/cat4.png',
      },
      {
        id: 5,
        title: 'Ansiedad y Estrés',
        bg: '#d9def8',
        img: 'http://okoconnect.com/karim/images/cat5.png',
      },
      {
        id: 6,
        title: 'Mindfulness',
        bg: '#a8aed4',
        img: 'http://okoconnect.com/karim/images/cat6.png',
      },
      {
        id: 7,
        title: 'Enfócate',
        bg: '#d9f6f0',
        img: 'http://okoconnect.com/karim/images/cat7.png',
      },
      {
        id: 8,
        title: 'Vida Saludable',
        bg: '#cbe3e2',
        img: 'http://okoconnect.com/karim/images/cat8.png',
      },
      {
        id: 9,
        title: 'Reinvéntate',
        bg: '#f3ebf9',
        img: 'http://okoconnect.com/karim/images/cat9.png',
      },
      {
        id: 19,
        title: 'Espiritualidad',
        bg: '#b2a0bd',
        img: 'http://okoconnect.com/karim/images/cat19.png',
      },
    ],
  },
];

class Categorias extends Component {
  static navigationOptions = {
    header: null,
  };
  _handleClick = item => {
    //alert('This is a button!');
    this.props.navigation.navigate('Categoria', {
      title: item.title,
      bg: item.bg,
    });
  };
  keyExtractor = item => item.id.toString() + 'categoria';
  render() {
    return (
      <>
        <View style={styles.statusBar} />
        <SectionList
          style={styles.container}
          sections={data}
          renderItem={({item}) => (
            <Buttom
              style={{backgroundColor: item.bg || Colors.primaryDark}}
              onPress={() => {
                this._handleClick(item);
              }}>
              <Text style={styles.title_boxes}>{item.title}</Text>
              <Image style={styles.image} source={{uri: item.img}} />
            </Buttom>
          )}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.sectionTitle}>{title}</Text>
          )}
          keyExtractor={this.keyExtractor}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  statusBar: {
    height: StatusBar.currentHeight,
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
    color: Colors.gray,
    fontFamily: 'MyriadPro-Bold',
  },
  title_boxes: {
    color: '#494c6b',
    fontSize: 15.5,
    letterSpacing: 0.99,
    lineHeight: 25,
    textTransform: 'uppercase',
    alignSelf: 'center',
  },
  image: {
    resizeMode: 'cover',
    width: 83,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default Categorias;
