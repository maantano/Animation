import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Pressable,
  Text,
  TouchableOpacity,
} from 'react-native';
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

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const Animated_ValueXY = () => {
  const POSITION = useRef(
    new Animated.ValueXY({
      x: -SCREEN_WIDTH / 2 + 100,
      y: -SCREEN_HEIGHT / 2 + 200,
    }),
  ).current;

  const topLeft = Animated.timing(POSITION, {
    toValue: {
      x: -SCREEN_WIDTH / 2 + 100,
      y: -SCREEN_HEIGHT / 2 + 200,
    },
    useNativeDriver: false,
  });

  const bottomLeft = Animated.timing(POSITION, {
    toValue: {
      x: -SCREEN_WIDTH / 2 + 100,
      y: +SCREEN_HEIGHT / 2 - 200,
    },
    useNativeDriver: false,
  });

  const topRight = Animated.timing(POSITION, {
    toValue: {
      x: +SCREEN_WIDTH / 2 - 100,
      y: -SCREEN_HEIGHT / 2 + 200,
    },
    useNativeDriver: false,
  });

  const bottomRight = Animated.timing(POSITION, {
    toValue: {
      x: +SCREEN_WIDTH / 2 - 100,
      y: +SCREEN_HEIGHT / 2 - 200,
    },
    useNativeDriver: false,
  });

  const moveUp = () => {
    setTimeChk(false);
    // Animated.sequence 는 여러 animation들의 array 이다.
    Animated.loop(
      Animated.sequence([bottomLeft, bottomRight, topRight, topLeft]),
    ).start();
    // Animated.sequence([topLeft, bottomLeft, bottomRight, topRight]).start();
  };

  const rotation = POSITION.y.interpolate({
    inputRange: [-150, 150],
    outputRange: ['-360deg', '360deg'],
  });
  // POSITION.addListener(() => console.log(rotation));

  const opacity = POSITION.y.interpolate({
    inputRange: [-150, 0, 150],
    outputRange: [1, 0.5, 1],
  });
  // POSITION.addListener(() => console.log(opacity));

  const borderRadius = POSITION.y.interpolate({
    inputRange: [-150, 150],
    outputRange: [100, 0],
  });
  const bgColor = POSITION.y.interpolate({
    inputRange: [-150, 150],
    // outputRange: ['blue', 'red'],  X rgb로 해야해
    outputRange: ['rgb(255,99,71)', 'rgb(71,166,255)'],
  });

  // POSITION.addListener(() => console.log(POSITION.getTranslateTransform()));
  const [timeChk, setTimeChk] = useState(false);
  console.log(timeChk);

  setTimeout(() => {
    Animated.timing(POSITION, {
      toValue: 0,
      duration: 50,
      useNativeDriver: true,
    }).stop();
    setTimeChk(true);
  }, 5000);
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
              // {rotateY: rotation},
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

export default Animated_ValueXY;
