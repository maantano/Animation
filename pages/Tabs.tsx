import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Ewns from '../components/Ewns';
import CardAni from '../components/CardAni';
import AnimatedMove from '../components/AnimatedMove';
import AnimatedDrag from '../components/AnimatedDrag';
import Animated_ValueXY from '../components/Animated_ValueXY';
import Home from '../components/Home';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Ewns" component={Ewns} />
      <Tab.Screen name="CardAni" component={CardAni} />
      <Tab.Screen name="AnimatedMove" component={AnimatedMove} />
      <Tab.Screen name="AnimatedDrag" component={AnimatedDrag} />
      <Tab.Screen name="Animated_ValueXY" component={Animated_ValueXY} />
    </Tab.Navigator>
  );
  //   <Tab.Navigator>
  //     <Tab.Screen
  //   </Tab.Navigator>;
};

export default Tabs;
