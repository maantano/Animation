import React, {useEffect, useRef, useState} from 'react';
import {Animated, Easing, PanResponder, View} from 'react-native';
import styled from 'styled-components/native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

import icons from '../icons';
import arrow from '../arrow';

const BLACK_COLOR = '#1e272e';
const GREY = '#485460';
const GREEN = '#2ecc71';
const RED = '#e74c3c';

const Root = styled.View`
  flex: 1;
  flex-direction: row;
`;
const Container = styled.View`
  flex: 1;
  background-color: ${BLACK_COLOR};
`;

const Edge = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const EdgeEast = styled.View`
  flex: 1;

  justify-content: center;
  align-items: flex-end;
  margin-right: 15px;
`;
const EdgeWest = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  margin-left: 15px;
`;

const WordContainer = styled(Animated.createAnimatedComponent(View))`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  background-color: ${GREY};
  border-radius: 50px;
`;

const Word = styled.Text`
  font-size: 15px;
  font-weight: 500;
  color: ${props => props.color};
`;
const Center = styled.View`
  flex: 5;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;
const IconCard = styled(Animated.createAnimatedComponent(View))`
  background-color: white;
  padding: 5px 10px;
  border-radius: 10px;
  position: absolute;
  z-index: 100;
`;

const IconCorrect = styled(Animated.createAnimatedComponent(View))`
  background-color: ${GREEN};
  padding: 5px 10px;
  border-radius: 10px;
  position: absolute;
  z-index: 100;
`;

const Ewns = () => {
  //values
  const [index, setIndex] = useState(0);

  const nextIcon = () => {
    Animated.parallel([
      Animated.spring(scale, {toValue: 1, useNativeDriver: true}),
      Animated.spring(opacity, {toValue: 1, useNativeDriver: true}),
      Animated.spring(scale2, {toValue: 3, useNativeDriver: true}),
      Animated.spring(opacity2, {toValue: 0, useNativeDriver: true}),
    ]).start();

    const sPick = Math.floor(Math.random() * arrow.length);
    setIndex(sPick);
  };

  const opacity = useRef(new Animated.Value(1)).current;
  const opacity2 = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const scale2 = useRef(new Animated.Value(3)).current;
  const position = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const position2 = useRef(new Animated.ValueXY({x: 0, y: 0})).current;

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

  const scaleThree = position.x.interpolate({
    inputRange: [-120, -25],
    outputRange: [2, 1],
    extrapolate: 'clamp',
  });
  const scaleFour = position.x.interpolate({
    inputRange: [25, 120],
    outputRange: [1, 2],
    extrapolate: 'clamp',
  });

  const onPressIn = Animated.spring(scale, {
    toValue: 0.5,
    useNativeDriver: true,
  });

  const onChkOpacity2 = Animated.timing(opacity2, {
    toValue: 1,
    duration: 5,
    easing: Easing.linear,
    useNativeDriver: true,
  });

  const onPressOut = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  });
  const goCenter = Animated.spring(position, {
    toValue: 0,
    useNativeDriver: true,
  });

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
      // ????????? ???????????? ????????? ????????? ??? ???????????? ????????? ???
      onStartShouldSetPanResponder: () => true,

      // panResponder??? ???????????? ???????????? ??? ?????? ?????? ?????????.
      onPanResponderGrant: () => {
        onPressIn.start();
      },
      // panResponder??? ???????????? ???????????? ??? ?????? ?????? ?????????.
      onPanResponderMove: (_, {dx, dy}) => {
        // onReset.start(nextIcon);
        setTimeout(() => {
          Animated.timing(position, {
            toValue: 0,
            duration: 50,
            useNativeDriver: true,
          }).stop(() => {
            position.setValue(0);
            nextIcon();
          });
        }, 1000);
        position.setValue({x: dx, y: dy});
      },

      // panResponder??? ???????????? ????????????! ??? ????????? ????????????!
      onPanResponderRelease: (_, {dx, dy}) => {
        if (dy < -250 && -15 < dx < 15) {
          Animated.sequence([
            Animated.parallel([onDropOpacity, onDropScale, onChkOpacity2]),
            Animated.timing(position, {
              toValue: 0,
              duration: 50,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
          ]).start(() => {
            nextIcon(0);
          });
        } else if (dy > 250 && -15 < dx < 15) {
          Animated.sequence([
            Animated.parallel([onDropOpacity, onDropScale, onChkOpacity2]),
            Animated.timing(position, {
              toValue: 0,
              duration: 50,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
          ]).start(() => {
            nextIcon(1);
          });
        } else if (dx > 150 && -10 < dy < 10) {
          Animated.sequence([
            Animated.parallel([onDropOpacity, onDropScale, onChkOpacity2]),
            Animated.timing(position, {
              toValue: 0,
              duration: 50,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
          ]).start(() => {
            nextIcon(2);
          });
        } else if (dx < -150 && -10 < dy < 10) {
          Animated.sequence([
            Animated.parallel([onDropOpacity, onDropScale, onChkOpacity2]),
            Animated.timing(position, {
              toValue: 0,
              duration: 50,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
          ]).start(() => {
            nextIcon(3);
          });
        } else {
          Animated.parallel([onPressOut, goCenter]).start(); // ==> ?????? ????????? ????????? ????????? ?????? ?????????
        }
      },
    }),
  ).current;
  // state
  position.getTranslateTransform();
  // console.log(panResponder.panHandlers);

  return (
    <Root>
      <Container>
        <EdgeWest>
          <WordContainer style={{transform: [{scale: scaleThree}]}}>
            <Word color={GREEN}>???</Word>
          </WordContainer>
        </EdgeWest>
      </Container>
      <Container>
        <Edge>
          <WordContainer style={{transform: [{scale: scaleOne}]}}>
            <Word color={GREEN}>???</Word>
          </WordContainer>
        </Edge>
        <Center>
          <IconCard
            // ????????? ????????? panResponder ??? panHandlers??? ????????? ??????????????????
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
            <AntDesign name={arrow[index]} color={BLACK_COLOR} size={76} />
          </IconCard>
          <IconCorrect
            {...panResponder.panHandlers}
            style={{
              opacity: opacity2,
              transform: [
                ...position2.getTranslateTransform(),
                {
                  scale: scale2,
                },
              ],
            }}>
            <Entypo name="check" color={BLACK_COLOR} size={76} />
          </IconCorrect>
        </Center>
        <Edge>
          <WordContainer style={{transform: [{scale: scaleTwo}]}}>
            <Word color={RED}>???</Word>
          </WordContainer>
        </Edge>
      </Container>
      <Container style={{zIndex: -1}}>
        <EdgeEast>
          <WordContainer style={{transform: [{scale: scaleFour}]}}>
            <Word color={RED}>???</Word>
          </WordContainer>
        </EdgeEast>
      </Container>
    </Root>
  );
};
export default Ewns;
