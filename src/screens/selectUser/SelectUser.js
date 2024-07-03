import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import config from '../../config'
import AppHeader from '../../components/AppHeader'
import AppButton from '../../components/AppButton'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SelectUser = ({navigation}) => {
    const [userType, setUserType] = useState('');
    console.log(userType);
  return (
    <View style={{
        flex: 1,
        backgroundColor: config.colors.white
    }}>
        <SafeAreaView>
     <AppHeader 
     title={'Select Profile'}
     navigation={navigation}
     backgroundColor={config.colors.white}
     />

<ScrollView>
     <View style={{
        height:45,
        marginTop:30,
        marginHorizontal:20,
        flexDirection:'row',
        justifyContent:'space-between',
     }}>
        <TouchableOpacity 
        style={{
            height:43,
            width:'45%',
            alignItems:'center',
            borderRadius:15,
            justifyContent:'center',
            borderWidth:1,
            borderColor: userType !== 'Traveler' && config.colors.blackColor ,
            backgroundColor: userType == 'Traveler' ? config.colors.blackColor : config.colors.white
        }} onPress={() => {
            setUserType('Traveler')
            AsyncStorage.setItem(
                config.AsyncKeys.USER_ROLE,
                JSON.stringify('Traveler')
              );
            
            }}>
            <Text style={{
                fontFamily:config.fonts.PrimaryFont,
                fontSize:17,
                lineHeight:20,
                color: userType == 'Traveler' ? config.colors.white : config.colors.blackColor
            }}>{`Traveler`}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={{
            height:43,
            width:'45%',
            borderRadius:15,
            alignItems:'center',
            justifyContent:'center',
            borderWidth:1,
            backgroundColor: userType == 'Guide' ? config.colors.blackColor : config.colors.white,
            borderColor: userType == 'Guide' &&  config.colors.blackColor
        }} onPress={() => {
            setUserType('Guide')
            AsyncStorage.setItem(
                config.AsyncKeys.USER_ROLE,
                JSON.stringify('Guide')
              );
        }}>
             <Text style={{
                fontFamily:config.fonts.PrimaryFont,
                fontSize:17,
                lineHeight:20,
                color: userType == 'Guide' ? config.colors.white : config.colors.blackColor,
            }}>{`Guide`}</Text>
        </TouchableOpacity>
     </View>

     <View style={{
        height:544,
        marginTop:20,
        borderBottomWidth:0.5,
        marginHorizontal:20,
        backgroundColor: config.colors.white,
        borderRadius: 24,
        padding: 35,
        shadowColor: '#000',
        shadowOffset: {
          width: 8,
          height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 2,
     }}>
        <Image 
        source={config.images.APP_LOGO}
        style={{
            height:300,
            width:300,
            resizeMode:'contain'
        }}
        />
        <Text style={{
            fontFamily:config.fonts.PrimaryFont,
            fontSize:14,
            lineHeight:16,
            textAlign:'center',
            color: config.colors.blackColor
        }}>{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,`}</Text>
     
     <AppButton 
     text={'Continue'}
     onPress={() => {
        if(userType == ''){
            Toast.show({
                type:'custom',
                text1: 'Please select user to continue.'
            })
        }else{
        navigation.navigate(config.routes.WELCOME_SCREEN, {userRole: userType})
    }}}
     buttonStyle={{ marginVertical:40}} 
     />
     </View>
    </ScrollView>
    </SafeAreaView>
    </View>
  )
}

export default SelectUser

const styles = StyleSheet.create({})