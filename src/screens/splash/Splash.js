import { Image, ImageBackground, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import config from '../../config'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation}) => {

  useEffect(() => {
    checkUserLoggedIn();
  }, []);



  const checkUserLoggedIn = async () => {
    const res = await AsyncStorage.getItem(config.AsyncKeys.USER_LOGGED_IN);
    const userRole = await AsyncStorage.getItem(config.AsyncKeys.USER_ROLE)
    const result = JSON.parse(res);
    console.log('result', result);
    console.log('role', userRole);
    setTimeout(function async() {
        if (result == true) {
          navigation.navigate(config.routes.TAB_NAVIGATOR, { userRole: JSON.parse(userRole) });
        } else {
          navigation.navigate(config.routes.LANGUAGE);
        }
    }, 3000);
  };
  
  return (
    <SafeAreaView style={{
      flex:1,
      backgroundColor: config.colors.primaryColor,
      justifyContent:'center',
      alignItems:'center'
      }}>
        <StatusBar 
        barStyle={'light-content'}
        translucent={true}
        backgroundColor={'transparent'}
        />
      <Image 
      style={{height:132, width:249, resizeMode: 'cover'}}
      source={config.images.SPLASH}
      />
        
        {/* <View style={{flex:1}}></View>
      </ImageBackground> */}
      
    </SafeAreaView>
  )
}

export default Splash

const styles = StyleSheet.create({})