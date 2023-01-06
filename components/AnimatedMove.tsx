import React, {useEffect, useRef, useState} from 'react';
import {Animated, Pressable, Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Box = styled.View`
  background-color: tomato;
  width: 200px;
  height: 200px;
`;
const AnimatedBox = Animated.createAnimatedComponent(Box);
const AnimatedMove = () => {
  const POSITION = useRef(new Animated.ValueXY({x: 0, y: 300})).current;
  const [up, setUp] = useState(false);
  const toggle = () => setUp(prev => !prev);

  const moveUp = () => {
    Animated.timing(POSITION, {
      toValue: up ? 300 : -300,
      useNativeDriver: false,
      duration: 2000,
    }).start(toggle);
  };

  const rotation = POSITION.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ['-360deg', '360deg'],
  });
  // POSITION.addListener(() => console.log(rotation));

  const opacity = POSITION.y.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: [1, 0.5, 1],
  });
  // POSITION.addListener(() => console.log(opacity));

  const borderRadius = POSITION.y.interpolate({
    inputRange: [-300, 300],
    outputRange: [100, 0],
  });
  const bgColor = POSITION.y.interpolate({
    inputRange: [-300, 300],
    // outputRange: ['blue', 'red'],  X rgb로 해야함
    outputRange: ['rgb(255,99,71)', 'rgb(71,166,255)'],
  });

  POSITION.addListener(() => console.log(POSITION.getTranslateTransform()));
  return (
    <Container>
      <Pressable onPress={moveUp}>
        <AnimatedBox
          style={{
            borderRadius,
            opacity,
            backgroundColor: bgColor,
            // Native Driver는 native operating system을 이용해서 animate 할수 있게 해줌
            // native 쪽에서는 backgroundColor를 animate 할수가 없다
            // backgroundColor를 사용하려면 useNativeDriver를 false로 둬야함
            transform: [
              {rotateY: rotation},
              // {translateX: POSITION.x},
              // {translateY: POSITION.y}, ===>
              ...POSITION.getTranslateTransform(),
            ],
          }}
        />
      </Pressable>
    </Container>
  );
};

export default AnimatedMove;
