import React from 'react';
import {Text, View} from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Title = styled.Text`
  color: Black;
  font-size: 45px;
  font-weight: 500;
  text-align: center;
`;

const Home = () => {
  return (
    <Container>
      <Title>React Native Animation</Title>
    </Container>
  );
};

export default Home;
