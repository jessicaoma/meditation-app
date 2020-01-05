import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  SafeAreaView,
} from 'react-native';
import Colors from '../constants/Colors';
import Dims from '../constants/Dimensions';
import ScreenBg from '../components/screenBg';
import ScalableText from 'react-native-text';

/**
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp} navigation
 * @extends {Component<Props>}
 */
const headerDefault = 'http://okoconnect.com/karim/assets/images/emociones/header-emocion-1.png';

export default class Emocion extends Component {

  render() {
    const { navigation } = this.props;
    console.log(JSON.stringify(navigation.getParam('header', '')));
    console.log(JSON.stringify(navigation.getParam('footer', '')));
    Number(navigation.getParam('headerH', '0.1'))
    return (
      <>
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <ScreenBg
            source={{uri: navigation.getParam('bg', ''),}}
            styleImage={{resizeMode: 'cover'}}>
             
              <Image
                style={{
                  width: '100%',
                  height: Dims.window.height * Number(navigation.getParam('headerH', '0.1')),
                }}
                source={{
                  uri: navigation.getParam('header', ''),
                }}
              />
              <View style={styles.container}>
                    <ScalableText style={styles.bigTitle}>
                      Título 
                    </ScalableText>
                    <ScalableText style={styles.paragraph}>
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
                      {'\n'}Feliz Sábado ✨
                    </ScalableText>
              </View>
              
              <Image
                style={{
                  width: '100%',
                  height: Dims.window.height * Number(navigation.getParam('footerH', '0.4')),
                }}
                source={{
                  uri: navigation.getParam('footer', ''),
                }}
              />
              
            </ScreenBg>
          </ScrollView>
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
    lineHeight: 14.5,
    marginBottom: 50,
    letterSpacing: 0,
    color: 'white',
    fontFamily: 'MyriadPro-Regular',
    textAlign: 'left',
    paddingHorizontal: Dims.smallSpace,
  },
});
