import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  SafeAreaView,
  Animated,
  TouchableOpacity
} from 'react-native';
import Colors from '../constants/Colors';
import LogoCompartir from '../constants/LogoCompartir';
import LogoDescargar from '../constants/LogoDescargar';
import Dims from '../constants/Dimensions';
import ScreenBg from '../components/screenBg';
import ScalableText from 'react-native-text';

const deviceWidth = Dims.window.width;
const deviceHeight = '100%';
const BAR_SPACE = 9;
/**
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp} navigation
 * @extends {Component<Props>}
 */
const headerDefault = 'http://okoconnect.com/karim/assets/images/emociones/header-emocion-1.png';

export default class Emocion extends Component {
  animVal = new Animated.Value(0);

  render() {
    const { navigation } = this.props;
    const info = [
      {
        key: 'slide1',
        title: 'Título',
        class: 'styles.container',
        text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet\nFeliz Sábado ✨\n\n\n DESLIZA PARA VER ORACIÓN ➡️',
      },
      {
        key: 'slide2',
        title: 'Oración',
        class: 'styles.containerFloating',
        text: 'Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet. \n\nAmén',
      },
    ];

    let imageArray = [];
    let barArray = [];
    const numItems = info.length;
    const itemWidth = 5;
    info.forEach((item, i) => {
      const thisImage = (
        <ScrollView key={`image${i}`}
        vertical
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>

          {i === 0 ? (
            <Image
              style={{
                width: deviceWidth,
                height: Dims.window.height * Number(navigation.getParam('headerH', '0.1')),
              }}
              source={{
                uri: navigation.getParam('header', ''),
              }}
            />
          ) : (
            <View style={{height: 50}}></View>
          )}

          <View style={styles.container} >
            <ScalableText style={styles.bigTitle}>
              {item.title}
            </ScalableText>
            <ScalableText style={styles.paragraph}>
              {item.text}
            </ScalableText>
          </View>
          {i === 0 ? (
            <Image
              style={{
                width: deviceWidth,
                height: Dims.window.height * Number(navigation.getParam('footerH', '0.4')),
                minHeight: Dims.window.height * Number(navigation.getParam('footerH', '0.4')),
              }}
              source={{
                uri: navigation.getParam('footer', ''),
              }}
            />
          ) : (
            <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end', paddingHorizontal: 50}}>
              <TouchableOpacity style={{marginRight: 20}}><LogoCompartir/></TouchableOpacity>
              <TouchableOpacity ><LogoDescargar/></TouchableOpacity>
            </View>
          )}
        </ScrollView>
      );
      imageArray.push(thisImage);

      const scrollBarVal = this.animVal.interpolate({
        inputRange: [deviceWidth * (i - 1), deviceWidth * (i + 1)],
        outputRange: [-itemWidth, itemWidth],
        extrapolate: 'clamp',
      });

      const thisBar = (
        <View
          key={`bar${i}`}
          style={[
            styles.track,
            {
              width: itemWidth,
              marginLeft: i === 0 ? 0 : BAR_SPACE,
            },
          ]}>
          <Animated.View
            style={[
              styles.bar,
              {
                width: itemWidth,
                transform: [{translateX: scrollBarVal}],
              },
            ]}
          />
        </View>
      );
      barArray.push(thisBar);

    });


    Number(navigation.getParam('headerH', '0.1'))
    return (
      <>
        <SafeAreaView>
          <ScreenBg
            source={{uri: navigation.getParam('bg', ''),}}
            styleImage={{resizeMode: 'cover', height: Dims.window.height,}}>
            

              <View style={styles.barContainer}>{barArray}</View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={10}
                pagingEnabled
                onScroll={Animated.event([
                  {nativeEvent: {contentOffset: {x: this.animVal}}},
                ])}
                style={styles.slider}>
                {imageArray}
              </ScrollView>
            
          </ScreenBg>
       </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: deviceWidth,
    padding: 30,
  },
  scrollView: {
    width: deviceWidth,
    minHeight: deviceHeight,
  },
  slider: {
    margin: 0,
    position: 'relative',
  },
  bigTitle: {
    fontSize: 40,
    letterSpacing: 1.11,
    lineHeight: 40,
    marginTop: Dims.regularSpace,
    marginRight: 0,
    marginBottom: 10,
    marginLeft: 0,
    color: 'white',
    fontFamily: 'MyriadPro-Regular',
  },
  paragraph: {
    fontSize: 15.5,
    lineHeight: 15.5,
    marginBottom: 50,
    letterSpacing: 0,
    color: 'white',
    fontFamily: 'MyriadPro-Regular',
    textAlign: 'justify',
    paddingHorizontal: Dims.smallSpace,
  },
  barContainer: {
    position: 'absolute',
    zIndex: 20,
    top: 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  track: {
    backgroundColor: '#fff',
    overflow: 'hidden',
    height: 5,
    borderRadius: 5,
  },
  bar: {
    backgroundColor: Colors.gray,
    height: 5,
    position: 'absolute',
    left: 0,
    top: 0,
    borderRadius: 5,
  },
});
