import React, {useRef} from 'react';
import {Animated, PanResponder, View, ViewBase} from 'react-native';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #00a8ff;
`;

const Card = styled.View`
  background-color: white;
  width: 300px;
  height: 300px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
`;

const AnimatedCard = Animated.createAnimatedComponent(Card);

const CardAnimated = styled(Animated.createAnimatedComponent(View))`
  background-color: white;
  width: 300px;
  height: 300px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
`;
// const Card = styled(Animated.createAnimatedComponent(ViewBase))``

const CardAni = () => {
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, {dx, dy}) => {
        position.setValue(dx);
      },
      onPanResponderGrant: () => onPressIn(),

      // onPanResponderRelease: () => {
      //   Animated.parallel([]);
      //   // animted를 동시에 묶어주는 함수
      //   onPressOut();
      //   Animated.spring(position, {toValue: 0, useNativeDriver: true}).start();
      // },
      onPanResponderRelease: () => {
        Animated.parallel([
          onPressOut,
          Animated.spring(position, {toValue: 0, useNativeDriver: true}),
        ]).start();

        // animted를 동시에 묶어주는 함수
      },
    }),
  ).current;

  const scale = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.Value(0)).current;

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.8,
      useNativeDriver: true,
    }).start();
  };
  // onPressIn 과 onPressOut이 동시에 일어나니깐 하나는(onPressOut) 상수로 만들어서 위에서 묶어줄수 있다.
  const onPressOut = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  });
  // const onPressOut = () => {
  //   Animated.spring(scale, {
  //     toValue: 1,
  //     useNativeDriver: true,
  //   }).start();
  // };

  return (
    <Container>
      {/* <AnimatedCard style={{transform: [{scale}]}}> */}
      <CardAnimated
        {...panResponder.panHandlers}
        style={{transform: [{scale}, {translateX: position}]}}>
        {/* AnimatedCard 컴포넌트 선언 해서 사용하면 auto complited 가 안되는 이유는 위에 스타일 컴포넌트 선언이 위에처럼 하면 안됨!! */}
        {/* 그래서 CardAnimated 컴포넌트 선언한것처럼 선언해서 사용하면 auto complited 정상적으로 동작 함  */}
        <Ionicons name="pizza" color="#192a56" size={98} />
      </CardAnimated>
    </Container>
  );
};

export default CardAni;
