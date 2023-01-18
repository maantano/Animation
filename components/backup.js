// import React, {useRef, useState} from 'react';
// import {Animated, Easing, PanResponder, Text, View} from 'react-native';
// import styled from 'styled-components/native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import icons from '../icons';
// import arrow from '../arrow';

// const BLACK_COLOR = '#1e272e';
// const GREY = '#485460';
// const GREEN = '#2ecc71';
// const RED = '#e74c3c';

// const Root = styled.View`
//   flex: 1;
//   flex-direction: row;
// `;
// const Container = styled.View`
//   flex: 1;
//   background-color: ${BLACK_COLOR};
//   /* flex-direction: row; */
// `;

// const Edge = styled.View`
//   flex: 1;
//   /* background-color: red; */
//   justify-content: center;
//   align-items: center;
// `;
// const EdgeEast = styled.View`
//   flex: 1;
//   /* background-color: red; */
//   justify-content: center;
//   align-items: flex-end;
//   margin-right: 15px;
// `;
// const EdgeWest = styled.View`
//   flex: 1;
//   /* background-color: red; */
//   justify-content: center;
//   align-items: flex-start;
//   margin-left: 15px;
// `;
// /* const WordContainer = styled.View` */
// const WordContainer = styled(Animated.createAnimatedComponent(View))`
//   width: 40px;
//   height: 40px;
//   justify-content: center;
//   align-items: center;
//   background-color: ${GREY};
//   border-radius: 50px;
// `;

// const Word = styled.Text`
//   font-size: 15px;
//   font-weight: 500;
//   color: ${props => props.color};
// `;
// const Center = styled.View`
//   flex: 1;
//   justify-content: center;
//   align-items: center;
//   z-index: 100;
// `;
// const IconCard = styled(Animated.createAnimatedComponent(View))`
//   background-color: white;
//   padding: 5px 10px;
//   border-radius: 10px;
//   position: absolute;
//   z-index: 100;
// `;

// const Ewns = () => {
//   //values
//   const [index, setIndex] = useState(0);
//   const [index2, setIndex2] = useState(0);
//   //   const nextIdx = () => {
//   //     const sPick2 = Math.floor(Math.random() * arrow.length);
//   //     setIndex2(sPick2);
//   //   };

//   const nextIcon = () => {
//     Animated.parallel([
//       Animated.spring(scale, {toValue: 1, useNativeDriver: true}),
//       Animated.spring(opacity, {toValue: 1, useNativeDriver: true}),
//     ]).start();
//     const sPick = Math.floor(Math.random() * arrow.length);
//     setIndex(sPick);
//     setIndex2(sPick);
//   };

//   const opacity = useRef(new Animated.Value(1)).current;
//   const scale = useRef(new Animated.Value(1)).current;
//   const position = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
//   //Animations
//   const scaleOne = position.y.interpolate({
//     inputRange: [-300, -80],
//     outputRange: [2, 1],
//     extrapolate: 'clamp',
//   });
//   const scaleTwo = position.y.interpolate({
//     inputRange: [80, 300],
//     outputRange: [1, 2],
//     extrapolate: 'clamp',
//   });

//   const scaleThree = position.x.interpolate({
//     inputRange: [-120, -25],
//     outputRange: [2, 1],
//     extrapolate: 'clamp',
//   });
//   const scaleFour = position.x.interpolate({
//     inputRange: [25, 120],
//     outputRange: [1, 2],
//     extrapolate: 'clamp',
//   });

//   const onPressIn = Animated.spring(scale, {
//     toValue: 0.9,
//     useNativeDriver: true,
//   });
//   const onPressOut = Animated.spring(scale, {
//     toValue: 1,
//     useNativeDriver: true,
//   });
//   const goCenter = Animated.spring(position, {
//     toValue: 0,
//     useNativeDriver: true,
//   });

//   const onDropScale = Animated.timing(scale, {
//     toValue: 0,
//     useNativeDriver: true,
//     duration: 50,
//     easing: Easing.linear,
//   });
//   const onDropOpacity = Animated.timing(opacity, {
//     toValue: 0,
//     duration: 50,
//     easing: Easing.linear,
//     useNativeDriver: true,
//   });
//   //Pan Responders
//   const panResponder = useRef(
//     PanResponder.create({
//       // 손가락 이벤트를 감지할 것인가 말 것인가를 정하는 것
//       onStartShouldSetPanResponder: () => true,
//       // 손가락 이벤트를 감지할 것인가 말 것인가를 정하는 것
//       // panResponder가 움직이기 시작하면 이 함수 실행 시킨다.
//       onPanResponderGrant: () => {
//         // Animated.spring(scale, {
//         //   toValue: 0.9,
//         //   useNativeDriver: true,
//         // }).start();
//         onPressIn.start();
//       },
//       // panResponder가 움직이기 시작하면 이 함수 실행 시킨다.
//       onPanResponderMove: (_, {dx, dy}) => {
//         // console.log(dx);
//         position.setValue({x: dx, y: dy});
//         setTimeout(() => {
//           //   Animated.sequence([
//           //     // Animated.parallel([onDropOpacity, onDropScale]),
//           //     Animated.timing(position, {
//           //       toValue: 0,
//           //       duration: 50,
//           //       easing: Easing.linear,
//           //       useNativeDriver: true,
//           //     }),
//           //   ]).start();
//         }, 1000);
//       },

//       // panResponder가 움직임이 끝낫을떄! 즉 터치가 끝났을때!
//       onPanResponderRelease: (_, {dx, dy}) => {
//         if (dy < -250 && -30 < dx < 30) {
//           Animated.sequence([
//             Animated.parallel([onDropOpacity, onDropScale]),
//             Animated.timing(position, {
//               toValue: 0,
//               duration: 50,
//               easing: Easing.linear,
//               useNativeDriver: true,
//             }),
//           ]).start(nextIcon);
//         } else if (dy > 250 && -30 < dx < 30) {
//           const arrowIdx = 1;
//           Animated.sequence([
//             Animated.parallel([onDropOpacity, onDropScale]),
//             Animated.timing(position, {
//               toValue: 0,
//               duration: 50,
//               easing: Easing.linear,
//               useNativeDriver: true,
//             }),
//           ]).start(nextIcon);
//         } else if (dx > 120 && -30 < dy < 30) {
//           const arrowIdx = 2;
//           Animated.sequence([
//             Animated.parallel([onDropOpacity, onDropScale]),
//             Animated.timing(position, {
//               toValue: 0,
//               duration: 50,
//               easing: Easing.linear,
//               useNativeDriver: true,
//             }),
//           ]).start(nextIcon);
//         } else if (dx < -120 && -30 < dy < 30) {
//           const arrowIdx = 3;
//           Animated.sequence([
//             Animated.parallel([onDropOpacity, onDropScale]),
//             Animated.timing(position, {
//               toValue: 0,
//               duration: 50,
//               easing: Easing.linear,
//               useNativeDriver: true,
//             }),
//           ]).start(nextIcon);
//         } else {
//           Animated.parallel([onPressOut, goCenter]).start(); // ==> 안에 실행될 함수가 동시에 실행 되는것
//         }

//         // Animated.spring(scale, {
//         //   toValue: 1,
//         //   useNativeDriver: true,
//         // }).start();
//         // onPressOut.start();
//         // goCenter.start();
//         // ==
//         // Animated.parallel([onPressOut, goCenter]).start(); // ==> 안에 실행될 함수가 동시에 실행 되는것
//         // Animated.sequence([onPressOut, goCenter]).start(); ==> 안에 실행될 함수가 하나씩 실행 되는것
//         // if(nowarrow == )
//       },
//       // panResponder가 움직임이 끝낫을떄! 즉 터치가 끝났을때!
//     }),
//   ).current;
//   // state

//   position.getTranslateTransform();

//   return (
//     <Root>
//       <Container>
//         <EdgeWest>
//           <WordContainer style={{transform: [{scale: scaleThree}]}}>
//             <Word color={GREEN}>←</Word>
//           </WordContainer>
//         </EdgeWest>
//       </Container>
//       <Container>
//         <Edge>
//           <WordContainer style={{transform: [{scale: scaleOne}]}}>
//             <Word color={GREEN}>↑</Word>
//           </WordContainer>
//         </Edge>
//         <Center>
//           <IconCard
//             // 위에서 선언한 panResponder 의 panHandlers를 반드시 연결해줘야함
//             {...panResponder.panHandlers}
//             style={{
//               opacity: opacity,
//               transform: [
//                 ...position.getTranslateTransform(),
//                 {
//                   scale,
//                 },
//               ],
//             }}>
//             <AntDesign name={arrow[index]} color={BLACK_COLOR} size={76} />
//             {/* <AntDesign name={arrow[index]} color={BLACK_COLOR} size={76} /> */}
//           </IconCard>
//         </Center>
//         <Edge>
//           <WordContainer style={{transform: [{scale: scaleTwo}]}}>
//             <Word color={RED}>↓</Word>
//           </WordContainer>
//         </Edge>
//       </Container>
//       <Container style={{zIndex: -1}}>
//         <EdgeEast>
//           <WordContainer style={{transform: [{scale: scaleFour}]}}>
//             <Word color={RED}>→</Word>
//           </WordContainer>
//         </EdgeEast>
//       </Container>
//     </Root>
//   );
// };
// export default Ewns;

import React, {useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  PanResponder,
  Text,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
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
  /* flex-direction: row; */
`;

const Edge = styled.View`
  flex: 1;
  /* background-color: red; */
  justify-content: center;
  align-items: center;
`;
const EdgeEast = styled.View`
  flex: 1;
  /* background-color: red; */
  justify-content: center;
  align-items: flex-end;
  margin-right: 15px;
`;
const EdgeWest = styled.View`
  flex: 1;
  /* background-color: red; */
  justify-content: center;
  align-items: flex-start;
  margin-left: 15px;
`;
/* const WordContainer = styled.View` */
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
  flex: 1;
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
      Animated.spring(scale2, {toValue: 2, useNativeDriver: true}),
      Animated.spring(opacity2, {toValue: 1, useNativeDriver: true}),
      Animated.spring(position2, {
        toValue: {
          x: -SCREEN_WIDTH / 2 + 200,
          y: -SCREEN_HEIGHT / 2 - 600,
        },
        useNativeDriver: true,
      }),
    ]).start();
    const sPick = Math.floor(Math.random() * arrow.length);
    setIndex(sPick);
    return sPick;
  };

  const opacity = useRef(new Animated.Value(1)).current;
  const opacity2 = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const scale2 = useRef(new Animated.Value(10)).current;

  const position = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  //   const position2 = useRef(new Animated.ValueXY({x: 100, y: 1000})).current;

  //   const correct = useRef(new Animated.Value(0)).current;
  //   const worng = useRef(new Animated.Value(0)).current;
  const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
  //Animations
  const position2 = useRef(
    new Animated.ValueXY({
      x: -SCREEN_WIDTH / 2 + 200,
      y: -SCREEN_HEIGHT / 2 - 600,
    }),
  ).current;
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
    toValue: 0.9,
    useNativeDriver: true,
  });

  //   ------------------------------------------------

  const onCorrect = Animated.spring(position2, {
    toValue: 3,
    duration: 500,
    useNativeDriver: true,
  });

  const onScaleCorrect = Animated.spring(scale2, {
    toValue: 0,
    duration: 500,
    easing: Easing.linear,
    useNativeDriver: true,
  });

  //   ------------------------------------------------
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
      // 손가락 이벤트를 감지할 것인가 말 것인가를 정하는 것
      onStartShouldSetPanResponder: () => true,

      // panResponder가 움직이기 시작하면 이 함수 실행 시킨다.
      onPanResponderGrant: () => {
        onPressIn.start();
      },
      // panResponder가 움직이기 시작하면 이 함수 실행 시킨다.
      onPanResponderMove: (_, {dx, dy}) => {
        // onReset.start(nextIcon);
        position.setValue({x: dx, y: dy});
      },

      // panResponder가 움직임이 끝낫을떄! 즉 터치가 끝났을때!
      onPanResponderRelease: (_, {dx, dy}) => {
        if (dy < -250 && -30 < dx < 30) {
          Animated.sequence([
            Animated.parallel([onDropOpacity, onDropScale]),
            Animated.timing(position, {
              toValue: 0,
              duration: 50,
              easing: Easing.linear,
              useNativeDriver: true,
            }),

            Animated.parallel([onCorrect, onScaleCorrect]),
            Animated.timing(position2, {
              toValue: 0,
              duration: 50,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
          ]).start(() => {
            nextIcon();
          });
        }
        // if (dy < -250 && -30 < dx < 30) {
        //   Animated.sequence([
        //     Animated.parallel([onDropOpacity, onDropScale]),
        //     Animated.timing(position, {
        //       toValue: 0,
        //       duration: 50,
        //       easing: Easing.linear,
        //       useNativeDriver: true,
        //     }),
        //   ]).start(nextIcon);
        else if (dy > 250 && -30 < dx < 30) {
          Animated.sequence([
            Animated.parallel([onDropOpacity, onDropScale]),
            Animated.timing(position, {
              toValue: 0,
              duration: 50,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
          ]).start(nextIcon);
        } else if (dx > 120 && -30 < dy < 30) {
          Animated.sequence([
            Animated.parallel([onDropOpacity, onDropScale]),
            Animated.timing(position, {
              toValue: 0,
              duration: 50,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
          ]).start(nextIcon);
        } else if (dx < -120 && -30 < dy < 30) {
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
      },
    }),
  ).current;
  // state

  const correctPan = useRef(
    PanResponder.create({
      // 손가락 이벤트를 감지할 것인가 말 것인가를 정하는 것
      onStartShouldSetPanResponder: () => true,
      // panResponder가 움직이기 시작하면 이 함수 실행 시킨다.
      onPanResponderGrant: () => {
        onPressIn.start();
      },
    }),
  ).current;

  position.getTranslateTransform();

  return (
    <Root>
      <Container>
        <EdgeWest>
          <WordContainer style={{transform: [{scale: scaleThree}]}}>
            <Word color={GREEN}>←</Word>
          </WordContainer>
        </EdgeWest>
      </Container>
      <Container>
        <Edge>
          <WordContainer style={{transform: [{scale: scaleOne}]}}>
            <Word color={GREEN}>↑</Word>
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
            <AntDesign name={arrow[index]} color={BLACK_COLOR} size={76} />
            {/* <AntDesign name={arrow[index]} color={BLACK_COLOR} size={76} /> */}
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
            <AntDesign name={arrow[index]} color={BLACK_COLOR} size={76} />
          </IconCorrect>
        </Center>
        <Edge>
          <WordContainer style={{transform: [{scale: scaleTwo}]}}>
            <Word color={RED}>↓</Word>
          </WordContainer>
        </Edge>
      </Container>
      <Container style={{zIndex: -1}}>
        <EdgeEast>
          <WordContainer style={{transform: [{scale: scaleFour}]}}>
            <Word color={RED}>→</Word>
          </WordContainer>
        </EdgeEast>
      </Container>
    </Root>
  );
};
export default Ewns;
