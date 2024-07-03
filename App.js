import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import Apploader from './src/components/AppLoader';
import {Dimensions, StatusBar, Text, View} from 'react-native';
import config from './src/config';
import Toast, {
  BaseToast,
  ErrorToast,
  InfoToast,
  SuccessToast,
} from 'react-native-toast-message';
import RootNavigation from './src/navigation/RootNavigation';

const App = () => {
 
  const toastConfig = {
    custom: ({text1, text2}) => (
      <View
        style={{
          shadowColor: '#000000',
          elevation:5,
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.8,
          shadowRadius: 1,  
          height:65,
          width:'90%',
          borderRadius:8,
          backgroundColor: config.colors.white,
          shadowColor: config.colors.black,
          shadowOpacity:0.5
        }}>
          <View style={{
            flexDirection:'row',
            alignItems:'center'
            // justifyContent:'space-between'

          }}>
            <View style={{
              height:65,
              justifyContent:'center',
              borderTopLeftRadius:8,
              borderBottomLeftRadius:8,
              width:6,
              backgroundColor:config.colors.yellowColor
            }}></View>
            <Text
          style={{
            marginLeft:15,
            fontFamily: config.fonts.HeadingFont,
            fontSize: 14,
            lineHeight: 20,
            color: config.colors.blackColor,
          }}>
          {text1}
        </Text>
          </View>
        
        <Text
          style={{
            fontFamily: config.fonts.HeadingFont,
            fontSize: 12,
            lineHeight: 20,
            color: config.colors.white,
          }}>
          {text2}
        </Text>
      </View>
    ),
  };
  return (
    <>
    <Provider store={store}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={config.colors.white}
      />
      <RootNavigation />
      <Apploader />
      <Toast
        config={toastConfig}
        position="bottom"
        bottomOffset={Dimensions.get('window').height / 2}
      />
    </Provider>
    </>
  );
};

export default App;
