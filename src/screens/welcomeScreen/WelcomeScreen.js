import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import config from '../../config'
import AppHeader from '../../components/AppHeader'
import AppButton from '../../components/AppButton'

const WelcomeScreen = ({navigation, route}) => {
    console.log('rout', route?.params?.userRole);
  return (
        <SafeAreaView style={{
        flex:1,
        backgroundColor: config.colors.white
    }}>

        <AppHeader 
        navigation={navigation}
        backgroundColor={config.colors.white}
        />

        <ScrollView
        contentContainerStyle={{marginHorizontal:20}}
        showsVerticalScrollIndicator={false}
        >
            <Image 
            source={config.images.ONBOARDING_IMG}
            style={{height:235, width:350,resizeMode:'contain', marginTop:40}}
            />

            <Text style={{
                fontSize:32,
                fontFamily: config.fonts.HeadingFont,
                lineHeight:38,
                textAlign:'center',
                color: config.colors.blackColor
            }}>{`Welcome to  App `}</Text>
             <Text style={{
                marginTop:30,
                fontSize:14,
                fontFamily: config.fonts.PrimaryFont,
                lineHeight:16,
                textAlign:'center',
                color: config.colors.blackColor
            }}>{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, `}</Text>
        
        <AppButton 
        text={  
            route?.params?.userRole == 'Traveler' ?
            'Register' : 'Register through Nafath' 
        }
        onPress={() => {{
            if(route?.params?.userRole == 'Traveler'){
            navigation.navigate(config.routes.USER_SIGNUP_SCREEN, {userRole: route?.params?.userRole})
            }else{
                navigation.navigate(config.routes.GUIDE_SIGNUP_SCREEN, {userRole: route?.params?.userRole})
            }
        }}}
        buttonStyle={{marginTop:60}}
        />
        <TouchableOpacity style={{
            height: 55,
            marginVertical:20,
            borderRadius : 15,
            justifyContent:'center',
            alignItems:'center',
            borderWidth:1,
            borderColor: config.colors.blackColor
        }} onPress={() => {
            if(route?.params?.userRole == 'Traveler'){
                navigation.navigate(config.routes.USER_LOGIN_SCREEN, {userRole: route?.params?.userRole})
                }else{
                    navigation.navigate(config.routes.GUIDE_LOGIN_SCREEN, {userRole: route?.params?.userRole})
                }
            
            }}>
            <Text style={{
                fontSize:17,
                fontFamily: config.fonts.HeadingFont,
                lineHeight:20,
                textAlign:'center',
                color: config.colors.blackColor
            }}>{`Login`}</Text>
        </TouchableOpacity>
        </ScrollView>
        </SafeAreaView>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({})