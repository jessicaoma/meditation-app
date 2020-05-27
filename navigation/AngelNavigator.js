import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import React from 'react';
import AngelCartasScreen from '../screens/AngelCartasScreen';
import AngelScreen from '../screens/AngelScreen';
import {connect} from 'react-redux';

const Stack = createStackNavigator();

function AngelNavigator(props) {
  let now = new Date();
  let check = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let angelTime = new Date(props.angelTime);
  const [time, setTime] = React.useState(
    check.getTime() <= angelTime.getTime(),
    //false,
  );
  React.useEffect(() => {
    const isLogged = () => {
      let n = new Date();
      let c = new Date(n.getFullYear(), n.getMonth(), n.getDate());
      let aT = new Date(props.angelTime);
      setTime(c.getTime() <= aT.getTime());
    };
    isLogged();
  }, [props.angelTime]);
  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        header: () => null,
        headerTransparent: true,
      }}>
      {!time ? (
        <Stack.Screen name="Cartas" component={AngelCartasScreen} />
      ) : (
        <Stack.Screen name="Angel" component={AngelScreen} />
      )}
    </Stack.Navigator>
  );
}

const mapStateToProps = state => {
  return {
    angelTime: state.angelTime,
  };
};

export default connect(mapStateToProps)(AngelNavigator);
