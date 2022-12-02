import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, Text, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import WebView from 'react-native-webview';
import styled from 'styled-components/native';

const FullScreenContainer = styled.View`
  flex: 1;
  background-color: #fdd22c;
`;

const ContentContainer = styled(SafeAreaView)`
  flex: 1;
`;

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <FullScreenContainer>
      <StatusBar backgroundColor={'#fdd22c'} />
      <ContentContainer>
        <WebView source={{ uri: 'https://www.naver.com/' }} />
      </ContentContainer>
    </FullScreenContainer>
  );
};

export default App;
