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

const Titleconatainer = styled.View`
  padding-top: 55px;
`;

const Title = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 33px;
  text-align: center;
`;

const Cardtext = styled.Text`
  color: white;
  font-weight: 500;
  font-size: 25px;
`;
const CardAnimated2 = styled(Animated.createAnimatedComponent(View))`
  background-color: rgb(41, 189, 247);
  width: 150px;
  height: 150px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  position: absolute;
  z-index: 10;
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
    // input ?????? ???????????? ????????? ??? ????????? ????????? ??? ?????? ?????? ??????.
    // extend : ?????? ???????????? ????????? ?????? ???????????????
    // identity :
    // clamp : ????????? ???????????? ?????? ?????????
  });
  const secondScale = position.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: [1, 0.7, 1],
    extrapolate: 'clamp',
  });
  const scaleText = position.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: [2.5, 1, 2.5],
    extrapolate: 'clamp',
  });
  const opcaityText = position.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: [1, 0, 1],
  });

  // const textScale = position.interpolate({
  //   inputRange: [-300, 0, 300],
  //   outputRange: [1, 0.7, 1],
  //   extrapolate: 'clamp',
  // });

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
    // ??????????????? ???????????? ?????? ???????????? ??????
    restSpeedThreshold: 100,
    restDisplacementThreshold: 100,
    // ??????????????? ???????????? ?????? ???????????? ??????
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
      //   // animted??? ????????? ???????????? ??????
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

        // animted??? ????????? ???????????? ??????
      },
    }),
  ).current;

  // onPressIn ??? onPressOut??? ????????? ??????????????? ?????????(onPressOut) ????????? ???????????? ????????? ???????????? ??????.
  // ???????????????
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
      <Titleconatainer>
        {/* <Title>
          {`Do you know this
Font Img name?`}
        </Title> */}
        <Title>Do you know this {'\n'}Font Image name?</Title>
      </Titleconatainer>
      <CardContainer>
        <CardAnimated style={{transform: [{scale: secondScale}]}}>
          <Ionicons name={icons[index + 1]} color="#192a56" size={98} />
        </CardAnimated>
        <CardAnimated2
          style={{opacity: opcaityText, transform: [{scale: scaleText}]}}>
          <Cardtext>{icons[index]}</Cardtext>
        </CardAnimated2>
        <CardAnimated
          {...panResponder.panHandlers}
          style={{
            transform: [{scale}, {translateX: position}, {rotateZ: rotation}],
          }}>
          {/* AnimatedCard ???????????? ?????? ?????? ???????????? auto complited ??? ????????? ????????? ?????? ????????? ???????????? ????????? ???????????? ?????? ??????!! */}
          {/* ????????? CardAnimated ???????????? ?????????????????? ???????????? ???????????? auto complited ??????????????? ?????? ???  */}
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
