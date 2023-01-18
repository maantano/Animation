import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import AnimatedDrag from './components/AnimatedDrag';
import AnimatedMove from './components/AnimatedMove';
import Animated_ValueXY from './components/Animated_ValueXY';
import CardAni from './components/CardAni';
import Ewns from './components/Ewns';
import Root from './pages/Root';
// import AnimatedDrag from './components/AnimatedDrag';
// import CardAni from './components/CardAni';
// import DragNDrop from './components/DragNDrop';
// import Ewns from './components/Ewns';
import Tabs from './pages/Tabs';

const App = () => {
  // return <AnimatedDrag />;
  // return <Ewns />;
  // <Tab.Screen name="Ewns" component={Ewns} />
  // <Tab.Screen name="CardAni" component={CardAni} />
  // <Tab.Screen name="AnimatedMove" component={AnimatedMove} />
  // <Tab.Screen name="AnimatedDrag" component={AnimatedDrag} />
  // <Tab.Screen name="animated_ValueXY" component={animated_ValueXY} />
  return (
    <NavigationContainer>
      <Root />
    </NavigationContainer>
    // <Ewns />
    // <CardAni />
    // <AnimatedMove />
    // <AnimatedDrag />
    // <CardAni />
    // <Animated_ValueXY />
    // <NavigationContainer>
    //   <Tabs />
    // </NavigationContainer>
  );
};

export default App;
