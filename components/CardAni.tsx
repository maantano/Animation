import React, {useRef, useState} from 'react';
import {Animated, PanResponder, View, ViewBase} from 'react-native';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import icons from '../icons';

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
  position: absolute;
`;

const Btn = styled.TouchableOpacity`
  margin: 0px 10px;
`;

const BtnContainer = styled.View`
  flex-direction: row;
  flex: 1;
`;
// const Card = styled(Animated.createAnimatedComponent(ViewBase))``

const CardContainer = styled.View`
  flex: 3;
  justify-content: center;
  align-items: center;
`;

const CardAni = () => {
  const scale = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.Value(0)).current;
  const rotation = position.interpolate({
    inputRange: [-250, 250],
    outputRange: ['-15deg', '15deg'],
    // extrapolate: 'clamp',
    // input 범위 바깥으로 나갔을 때 어떻게 처리할 지 명시 할수 있따.
    // extend : 끝이 한계치를 넘어서 계속 진행하는것
    // identity :
    // clamp : 더이상 움직이지 않게 하는것
  });
  const secondScale = position.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: [1, 0.7, 1],
    extrapolate: 'clamp',
  });

  const onPressOut = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  });

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.8,
      useNativeDriver: true,
    }).start();
  };
  const goCenter = Animated.spring(position, {
    toValue: 0,
    useNativeDriver: true,
  });

  const goLeft = Animated.spring(position, {
    toValue: -500,
    tension: 5,
    useNativeDriver: true,
    // 에니메이션 기다리지 않고 끝내주는 함수
    restSpeedThreshold: 100,
    restDisplacementThreshold: 100,
    // 에니메이션 기다리지 않고 끝내주는 함수
  });

  const goRight = Animated.spring(position, {
    toValue: 500,
    tension: 5,
    useNativeDriver: true,
    restSpeedThreshold: 100,
    restDisplacementThreshold: 100,
  });

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

      onPanResponderRelease: (_, {dx}) => {
        if (dx < -250) {
          goLeft.start(onDismiss);
        } else if (dx > 250) {
          goRight.start(onDismiss);
        } else {
          Animated.parallel([
            onPressOut,
            Animated.spring(position, {toValue: 0, useNativeDriver: true}),
          ]).start();
        }

        // animted를 동시에 묶어주는 함수
      },
    }),
  ).current;

  // onPressIn 과 onPressOut이 동시에 일어나니깐 하나는(onPressOut) 상수로 만들어서 위에서 묶어줄수 있다.
  // ㄴㅅㅁㅅㄷ
  const [index, setIndex] = useState(0);
  const onDismiss = () => {
    scale.setValue(1);
    position.setValue(0);
    setIndex(prev => prev + 1);
    // Animated.timing(position, {toValue: 0, useNativeDriver: true});
  };
  const closePress = () => {
    goLeft.start(onDismiss);
  };
  const checkPress = () => {
    goRight.start(onDismiss);
  };

  return (
    <Container>
      {/* <AnimatedCard style={{transform: [{scale}]}}> */}

      <CardContainer>
        <CardAnimated style={{transform: [{scale: secondScale}]}}>
          <Ionicons name={icons[index + 1]} color="#192a56" size={98} />
        </CardAnimated>
        <CardAnimated
          {...panResponder.panHandlers}
          style={{
            transform: [{scale}, {translateX: position}, {rotateZ: rotation}],
          }}>
          {/* AnimatedCard 컴포넌트 선언 해서 사용하면 auto complited 가 안되는 이유는 위에 스타일 컴포넌트 선언이 위에처럼 하면 안됨!! */}
          {/* 그래서 CardAnimated 컴포넌트 선언한것처럼 선언해서 사용하면 auto complited 정상적으로 동작 함  */}
          <Ionicons name={icons[index]} color="#192a56" size={98} />
        </CardAnimated>
      </CardContainer>
      <BtnContainer>
        <Btn onPress={closePress}>
          <Ionicons name="close-circle" color="white" size={58} />
        </Btn>
        <Btn onPress={checkPress}>
          <Ionicons name="checkmark-circle" color="white" size={58} />
        </Btn>
      </BtnContainer>
    </Container>
  );
};

export default CardAni;
