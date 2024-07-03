import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import config from '../../config';
import AppButton from '../../components/AppButton';
import { goToTopNavigation } from '../../components/NavigationRef';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountSuccess = ({route}) => {

  const handleSuccess = () => {
    AsyncStorage.setItem(
      config.AsyncKeys.USER_LOGGED_IN,
      JSON.stringify(true),
    );
    AsyncStorage.setItem(
      config.AsyncKeys.USER_DATA,
      JSON.stringify(route?.params?.userData),
    );
    AsyncStorage.setItem(
      config.AsyncKeys.USER_TOKEN,
      JSON.stringify(route?.params?.token),
    );
    setTimeout(() => {
      goToTopNavigation(config.routes.TAB_NAVIGATOR, {
        userRole: 'Local',
      });
    }, 100);
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: config.colors.primaryColor,
      }}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={config.colors.primaryColor}
      />

      <ScrollView
        contentContainerStyle={{flex:1,marginHorizontal: 20, justifyContent:'center',alignItems:'center'}}
        showsVerticalScrollIndicator={false}>
        <Image
          source={config.images.LOCATION}
          style={{height: 100, width: 100, resizeMode: 'contain'}}
        />
        <Text
          style={{
            fontFamily: config.fonts.HeadingFont,
            color: config.colors.white,
            lineHeight: 40,
            fontSize: 29,
            marginTop: 20,
          }}>{`Successfully`}</Text>
        <Text
          style={{
            fontFamily: config.fonts.HeadingFont,
            color: config.colors.white,
            lineHeight: 40,
            fontSize: 29,
          }}>{`created an account`}</Text>
        <Text
          style={{
            marginTop: 12,
            textAlign: 'center',
            fontFamily: config.fonts.primaryColor,
            color: config.colors.white,
            lineHeight: 18,
            fontSize: 14,
          }}>{`After this you can explore any place you want \nenjoy it!`}</Text>
      </ScrollView>
      <AppButton 
      text={'Let’s Explore'}
      onPress={() => {
        handleSuccess()
        // goToTopNavigation(config.routes.GUIDE_LOGIN_SCREEN)
    }}
    buttonStyle={{
        // width:'90%',
        marginHorizontal:20,
        marginVertical: 30
    }}
      />
    </SafeAreaView>
  );
};

export default AccountSuccess;

const styles = StyleSheet.create({});
