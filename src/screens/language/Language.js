import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import config from '../../config'
import AppButton from '../../components/AppButton'
import Toast from 'react-native-toast-message'


const Language = ({ navigation }) => {
    const [language, setLanguage] = useState('English');
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: config.colors.white
        }}>
            <ScrollView contentContainerStyle={{ marginHorizontal: 20, marginVertical:30}}>
                <Text style={{
                    marginTop: 60,
                    fontFamily: config.fonts.BigHeadingFont,
                    // fontWeight:'700',
                    fontSize: 24,
                    lineHeight: 32,
                    color: config.colors.blackColor
                }}>{`Choose the language `}</Text>
                <Text style={{
                    marginTop: 8,
                    fontFamily: config.fonts.MediumFont,
                    fontSize: 16,
                    lineHeight: 24,
                    color: config.colors.greyColor
                }}>{`Lorem Ipsum is simply dummy text of the printing and typesetting industry.  `}</Text>

                <TouchableOpacity style={{
                    marginTop: 50,
                    height: 50,
                    borderWidth:1,
                    borderColor: config.colors.borderColor,
                    borderRadius: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }} onPress={() =>{
                    setLanguage('English')
                }}>
                    <View style={{
                        height: 50,
                        width: '15%',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                    }}>
                        <Image
                            source={config.images.US_FLAG}
                            style={{ height: 21, width: 26, resizeMode: 'contain' }}
                        />
                    </View>
                    <View style={{
                        height: 50,
                        width: '60%',
                        justifyContent: 'center',
                    }}>
                        <Text style={{
                            fontFamily: config.fonts.MediumFont,
                            fontSize: 16,
                            lineHeight: 21,
                            color: config.colors.blackColor
                        }}>{`English`}</Text>
                    </View>
                    <View style={{
                        height: 50,
                        width: '20%',
                        alignItems: 'center',
                        justifyContent: 'center',

                    }}>
                        <Image
                            source={language == 'English' ? config.images.CHECK_ICON : config.images.UNCHECK_ICON}
                            style={{ height:language == 'English' ? 28 : 21, width:language == 'English' ? 28 : 21, resizeMode: 'contain', tintColor: language == 'English' ? config.colors.yellowColor : config.colors.lightGrey2Color }}
                        />
                    </View>
                </TouchableOpacity>


                <TouchableOpacity style={{
                    marginTop:20,
                    height: 50,
                    borderRadius:10,
                    borderWidth:1, 
                    borderColor: config.colors.borderColor,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }} onPress={() => {
                    setLanguage('عربي')
                    Toast.show({
                        type: 'custom',
                        text1: 'Coming Soon'
                    })
                }}>
                    <View style={{
                        height: 50,
                        width: '15%',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                    }}>
                        <Image
                            source={config.images.SAUDI_FLAG}
                            style={{ height: 26, width: 26, resizeMode: 'contain' }}
                        />
                    </View>
                    <View style={{
                        height: 50,
                        width: '60%',
                        justifyContent: 'center',
                    }}>
                        <Text style={{
                            textAlign: 'left',
                            fontFamily: config.fonts.MediumFont,
                            fontSize: 16,
                            lineHeight: 21,
                            color: config.colors.blackColor
                        }}>{`Arabic `}</Text>
                    </View>
                    <View style={{
                        height: 50,
                        width: '20%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Image
                            source={language == 'عربي' ? config.images.CHECK_ICON : config.images.UNCHECK_ICON}
                            style={{ height:language == 'عربي' ? 28 : 21, width:language == 'عربي' ? 28 : 26, resizeMode: 'contain', tintColor:language == 'عربي' ? config.colors.yellowColor : config.colors.lightBlackColor }}
                        />
                    </View>
                </TouchableOpacity>

                <View style={{height:200}}></View>
               
            </ScrollView>
            <AppButton
                text={'Next'}
                onPress={() => {
                   if(language == 'English'){

                       navigation.navigate(config.routes.ONBOARDING)
                   }else{
                    Toast.show({
                        type: 'custom',
                        text1: 'Please Select English To Continue.',
                    })
                   }
                }}
                buttonStyle={{marginHorizontal:20, marginVertical:25}}
                />
            </SafeAreaView>

    )
}

export default Language

const styles = StyleSheet.create({})