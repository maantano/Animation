import React, {useEffect, useRef, useState} from 'react';
import {Animated, PanResponder} from 'react-native';
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

const AnimatedDrag = () => {
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, {dx, dy}) => {
        // console.log('Finger moving');
        POSITION.setValue({x: dx, y: dy});
      },
      onPanResponderGrant: () => {
        // console.log('Touch Started');
        POSITION.setOffset({
          x: POSITION.x._value,
          y: POSITION.y._value,
        });
      },
      // 0이 아니라 어디서 컴포넌트 시작 위치가 어디일지 정해주는 함수

      onPanResponderRelease: () => {
        // console.log('Touch Finished');
        POSITION.flattenOffset();
        // 현재 offset에 가지고 있던 값은 현재 포지션으로 넘겨주고, offset안에 있던 값은 0으로 변경하는 소스!! 이거 중요!
      },
    }),
  ).current;

  const POSITION = useRef(
    new Animated.ValueXY({
      x: 0,
      y: 0,
    }),
  ).current;

  const opacity = POSITION.y.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: [1, 0.5, 1],
  });

  const borderRadius = POSITION.y.interpolate({
    inputRange: [-300, 300],
    outputRange: [100, 0],
  });
  const bgColor = POSITION.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ['rgb(255,99,71)', 'rgb(71,166,255)'],
  });

  // POSITION.addListener(() => console.log(POSITION.getTranslateTransform()));
  return (
    <Container>
      <AnimatedBox
        {...panResponder.panHandlers}
        style={{
          borderRadius,
          opacity,
          backgroundColor: bgColor,
          transform: POSITION.getTranslateTransform(),
        }}
      />
    </Container>
  );
};

export default AnimatedDrag;
