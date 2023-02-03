import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, Text, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import WebView from 'react-native-webview';
import styled from 'styled-components/native';

const FullScreenContainer = styled.View`
  flex: 1;
  background-color: #ffffff;
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
        <WebView
          source={{ uri: 'https://dev.doact.co.kr/' }}
          onLoad={syntheticEvent => {
            const { nativeEvent } = syntheticEvent;
            console.log('onLoad', nativeEvent);
          }}
          onLoadProgress={({ nativeEvent }) => {
            console.log('onLoadProgress', nativeEvent.progress);
            if (nativeEvent.progress === 1) {
              SplashScreen.hide();
            }
          }}
          onLoadStart={syntheticEvent => {
            const { nativeEvent } = syntheticEvent;
            console.log('onLoadStart', nativeEvent);
          }}
          onLoadEnd={syntheticEvent => {
            // update component to be aware of loading status
            const { nativeEvent } = syntheticEvent;
            console.log('onLoadEnd', nativeEvent);
          }}
        />
      </ContentContainer>
    </FullScreenContainer>
  );
};

export default App;
