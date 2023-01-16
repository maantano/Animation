import React, {useRef, useState} from 'react';
import {Animated, Easing, PanResponder, Text, View} from 'react-native';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import icons from '../icons';

const BLACK_COLOR = '#1e272e';
const GREY = '#485460';
const GREEN = '#2ecc71';
const RED = '#e74c3c';

const Container = styled.View`
  flex: 1;
  background-color: ${BLACK_COLOR};
`;

const Edge = styled.View`
  flex: 1;
  /* background-color: red; */
  justify-content: center;
  align-items: center;
`;
/* const WordContainer = styled.View` */
const WordContainer = styled(Animated.createAnimatedComponent(View))`
  width: 100px;
  height: 100px;
  justify-content: center;
  align-items: center;
  background-color: ${GREY};
  border-radius: 50px;
`;
const Word = styled.Text`
  font-size: 38px;
  font-weight: 500;
  color: ${props => props.color};
`;
const Center = styled.View`
  flex: 3;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;
const IconCard = styled(Animated.createAnimatedComponent(View))`
  background-color: white;
  padding: 5px 10px;
  border-radius: 10px;
`;
// const IconCard = styled(Animated.createAnimatedComponent(View))`
//   background-color: white;
//   padding: 10px;
//   border-radius: 5px;
//   padding: 10px 20px;
//   border-radius: 10px;
// `;

const DragNDrop = () => {
  //values
  const opacity = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  //Animations
  const scaleOne = position.y.interpolate({
    inputRange: [-300, -80],
    outputRange: [2, 1],
    extrapolate: 'clamp',
  });

  const scaleTwo = position.y.interpolate({
    inputRange: [80, 300],
    outputRange: [1, 2],
    extrapolate: 'clamp',
  });

  const onPressIn = Animated.spring(scale, {
    toValue: 0.9,
    useNativeDriver: true,
  });
  const onPressOut = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  });
  const goCenter = Animated.spring(position, {
    // toValue: {x: 0, y: 0},
    // ==
    toValue: 0,
    useNativeDriver: true,
  });

  // spring이 바운스도 있고 좋지만 좀 느리기 때문에 timing 사용하면 훨씬 빠름!
  // const onDrop = Animated.spring(scale, {
  //   toValue: 0,
  //   useNativeDriver: true,
  // });
  const onDropScale = Animated.timing(scale, {
    toValue: 0,
    useNativeDriver: true,
    duration: 50,
    easing: Easing.linear,
  });
  const onDropOpacity = Animated.timing(opacity, {
    toValue: 0,
    duration: 50,
    easing: Easing.linear,
    useNativeDriver: true,
  });

  //Pan Responders
  const panResponder = useRef(
    PanResponder.create({
      // 손가락 이벤트를 감지할 것인가 말 것인가를 정하는 것
      onStartShouldSetPanResponder: () => true,
      // 손가락 이벤트를 감지할 것인가 말 것인가를 정하는 것
      // panResponder가 움직이기 시작하면 이 함수 실행 시킨다.
      onPanResponderGrant: () => {
        // Animated.spring(scale, {
        //   toValue: 0.9,
        //   useNativeDriver: true,
        // }).start();
        onPressIn.start();
      },
      // panResponder가 움직이기 시작하면 이 함수 실행 시킨다.
      onPanResponderMove: (_, {dx, dy}) => {
        position.setValue({x: dx, y: dy});
      },

      // panResponder가 움직임이 끝낫을떄! 즉 터치가 끝났을때!
      onPanResponderRelease: (_, {dy}) => {
        if (dy < -250 || dy > 250) {
          //drop
          // onDrop.start();
          // position.setValue({x: 0, y: 0}); ==> 이렇게 하면 돌아가는게 안이쁘다.
          // Animated.parallel([onDropOpacity, onDropScale]).start();
          Animated.sequence([
            Animated.parallel([onDropOpacity, onDropScale]),
            Animated.timing(position, {
              toValue: 0,
              duration: 50,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
          ]).start(nextIcon);
        } else {
          Animated.parallel([onPressOut, goCenter]).start(); // ==> 안에 실행될 함수가 동시에 실행 되는것
        }
        // Animated.spring(scale, {
        //   toValue: 1,
        //   useNativeDriver: true,
        // }).start();
        // onPressOut.start();
        // goCenter.start();
        // ==
        // Animated.parallel([onPressOut, goCenter]).start(); // ==> 안에 실행될 함수가 동시에 실행 되는것
        // Animated.sequence([onPressOut, goCenter]).start(); ==> 안에 실행될 함수가 하나씩 실행 되는것
      },
      // panResponder가 움직임이 끝낫을떄! 즉 터치가 끝났을때!
    }),
  ).current;
  // state
  position.getTranslateTransform();
  const [index, setIndex] = useState(0);
  const nextIcon = () => {
    Animated.parallel([
      Animated.spring(scale, {toValue: 1, useNativeDriver: true}),
      Animated.spring(opacity, {toValue: 1, useNativeDriver: true}),
    ]).start();
    setIndex(prev => prev + 1);
  };
  return (
    <Container>
      <Edge>
        <WordContainer style={{transform: [{scale: scaleOne}]}}>
          <Word color={GREEN}>알아</Word>
        </WordContainer>
      </Edge>
      <Center>
        <IconCard
          // 위에서 선언한 panResponder 의 panHandlers를 반드시 연결해줘야함
          {...panResponder.panHandlers}
          style={{
            opacity: opacity,
            transform: [
              ...position.getTranslateTransform(),
              {
                scale,
              },
            ],
          }}>
          <Ionicons name={icons[index]} color={GREY} size={76} />
        </IconCard>
      </Center>
      <Edge>
        <WordContainer style={{transform: [{scale: scaleTwo}]}}>
          <Word color={RED}>몰라</Word>
        </WordContainer>
      </Edge>
    </Container>
  );
};
export default DragNDrop;
