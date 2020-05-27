import {
  createStackNavigator,
  HeaderBackButton,
  TransitionPresets,
} from '@react-navigation/stack';
import * as React from 'react';
import EmocionesScreen from '../screens/EmocionesScreen';
import EmocionScreen from '../screens/EmocionScreen';
import MisEmocionesScreen from '../screens/MisEmocionesScreen';
import {connect} from 'react-redux';

const Stack = createStackNavigator();

function EmocionesNavigator(props) {
  let now = new Date();
  let check = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let emocionTime = new Date(props.emocionTime);
  const [time, setTime] = React.useState(
    check.getTime() <= emocionTime.getTime(),
    //false,
  );
  React.useEffect(() => {
    const isLogged = () => {
      let n = new Date();
      let c = new Date(n.getFullYear(), n.getMonth(), n.getDate());
      let aT = new Date(props.emocionTime);
      setTime(c.getTime() <= aT.getTime());
    };
    isLogged();
  }, [props.emocionTime]);
  return (
    <Stack.Navigator
      screenOptions={prop => {
        return {
          ...TransitionPresets.SlideFromRightIOS,
          title: '¿Cómo te sientes hoy?',
          headerTitleStyle: {
            color: '#030303',
            fontFamily: 'MyriadPro-Semibold',
          },
          headerLeft: () => (
            <HeaderBackButton
              onPress={() => {
                prop.navigation.goBack();
              }}
              labelVisible={false}
            />
          ),
        };
      }}>
      {!time ? (
        <Stack.Screen name="Emociones" component={EmocionesScreen} />
      ) : (
        <>
          <Stack.Screen name="Emocion" component={EmocionScreen} />
          <Stack.Screen
            name="MisEmociones"
            component={MisEmocionesScreen}
            options={MisEmocionesScreen.navigationOptions}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

const mapStateToProps = state => {
  return {
    emocionTime: state.emocionTime,
  };
};

export default connect(mapStateToProps)(EmocionesNavigator);
