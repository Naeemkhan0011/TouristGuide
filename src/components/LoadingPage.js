import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import config from '../config';

const LoadingPage = ({navigation}) => {
  useEffect(() => {
    loadingPageTimeOut();
  }, []);

  const loadingPageTimeOut =  () => {
   
    
    setTimeout(function () {
      navigation.replace(config.routes.CHOOSE_USER);
    }, 3000);
  };
  return (
    <View style={styles.bgImg}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={config.colors.primaryColor}
      />
      <Image
        style={styles.logoimg}
        source={config.images.LOADING_ICON}
      />
      <Text
        style={
          styles.primaryTextStyle
        }>{`We believe that mental wellness does not always have to be therapy or a long treatment plan.`}</Text>
      <Text
        style={
          styles.headingTextStyle
        }>{`When faced with life's ups and down, being able to talk to someone can be a wonderful source of relief.`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bgImg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: config.colors.primaryColor,
    paddingHorizontal:40
  },
  logoimg: {
    height: 31,
    width: 35,
    marginBottom:30
  },
  headingTextStyle: {
    fontFamily: config.fonts.HeadingFont,
    fontSize: 20,
    color: config.colors.blackColor,
    lineHeight: 32,
    marginBottom:15,
    textAlign:'center'
  },
  primaryTextStyle: {
    fontFamily: config.fonts.PrimaryFont,
    fontSize: 20,
    color: config.colors.blackColor,
    lineHeight: 32,
    marginBottom:30,
    textAlign:'center'
  },
});

export default LoadingPage;
