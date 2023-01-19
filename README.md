# Animated Function

React Natvie Animated 관련해서 만들어봤다.
재미도 있고, 어렵기도 하지만, 꽤 잘 사용할 수 있을거같다.
아주 기본적인 애니메이션이지만 도움이 되면 좋겠다 : )🧚‍♂️

## Component

-      Ewns : 카드 방향과 맞는 버튼으로 움직이는 게임(동서남북이면 동서남북이지,,,동서북남 뭐냐…ㅎㅎ)
- CardAni : 카드의 폰트 이름을 마추기 게임 (API 받아서 체크하는 내용은 어느것이든 적용 가능하지 않을까..)
- AnimatedDrag : 드래그 앤 드롭 에니메이션
- AnimatedMove : 상하 + 회전 에니메이션
- Animated_ValueXY : 상하좌우 이동 에니메이션

## Demo

## Built with

- React Native
- TypeScript
- styled-component

## 기억할것

- console.log(panResponder.panHandlers) 하면 터치 이벤트를 줄수있는 함수들이 출력됨
  - onResponderRelease, onResponderMove 이런식으로 출력되는데, 사이에 Pan을 넣어주면 되는거 같다.
- styled-components로 Animated 컴포넌트 만드는 방법
- useNativeDriver : true | false
- interpolate({extrapolate})
- PanResponder.create({})
  - onStartShouldSetPanResponder, onPanResponderGrant, onPanResponderMove, onPanResponderRelease

## 아쉬움

- 나는 각 방향 버튼 마다 키 값을 주고 그 값에 맞는 다음 카드가 나왔을때 그 카드 값이랑 비교 해서 맞고 틀린 에니메이션을 주고싶었는데, useRef 안에서 state를 받아오지 못해서, nextIcon 안에서 다음 카드의 값과 버튼의 값을 비교하는것이 안되었는데, 포기하긴 아까워서, 조금더 알아봐야할것같다.. :(
