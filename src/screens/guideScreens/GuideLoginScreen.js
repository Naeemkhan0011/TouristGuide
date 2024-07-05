import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import config from '../../config';
import AppHeader from '../../components/AppHeader';
import AppTextInput from '../../components/AppTextInput';
import {removeListener} from '@reduxjs/toolkit';
import AppButton from '../../components/AppButton';
import {goToTopNavigation} from '../../components/NavigationRef';
import {useDispatch, useSelector} from 'react-redux';
import {UserLoginReducer} from '../../redux/reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {SagaActions} from '../../redux/sagas/SagaActions';
import DeviceInfo from 'react-native-device-info';
import {CountryPicker} from 'react-native-country-codes-picker';
import {useFocusEffect} from '@react-navigation/native';

const GuideLoginScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const userLoginResponse = useSelector(UserLoginReducer.selectUserLoginData);
  const userLoginErrorResponse = useSelector(
    UserLoginReducer.selectUserLoginResponse,
  );
  const [mobileNumber, setMobileNumber] = useState('');
  const [togglePassword, setTogglePassword] = useState(true);
  const [password, setPassword] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [toggle, setToggle] = useState(false);
  const [test1, setTest1] = useState('');
  const [test2, setTest2] = useState('');
  const [test3, setTest3] = useState('');
  const [showCountryCode, setShowCountryCode] = useState(false);
  const [countryCode, setCountryCode] = useState('');
  const [countryFlag, setCountryFlag] = useState('');
  //hook  call
  useEffect(() => {
    if (userLoginResponse != null) {
      if (userLoginResponse?.error == false) {
        AsyncStorage.setItem(
          config.AsyncKeys.USER_LOGGED_IN,
          JSON.stringify(true),
        );
        AsyncStorage.setItem(
          config.AsyncKeys.USER_DATA,
          JSON.stringify(userLoginResponse?.results?.user),
        );
        AsyncStorage.setItem(
          config.AsyncKeys.USER_TOKEN,
          JSON.stringify(userLoginResponse?.results?.token),
        );
        goToTopNavigation(config.routes.TAB_NAVIGATOR, {
          userRole: 'Local',
        });
        console.log('userLoginResponse', JSON.stringify(userLoginResponse));
        dispatch(UserLoginReducer.removeUserLoginResponse());
      }
    }
  }, [userLoginResponse]);

  useEffect(() => {
    if (userLoginErrorResponse != null) {
      if (userLoginErrorResponse?.error != '') {
        Toast.show({
          type: 'custom',
          text1: userLoginErrorResponse?.message,
        });
        dispatch(UserLoginReducer.removeUserLoginResponse());
      }
    }
  }, [userLoginErrorResponse]);

  useFocusEffect(
    useCallback(() => {
      getDeviceInfo();
    }, []),
  );

  //function call
  const validatePassword = (val) => {
    let result1 = /[a-z]/.test(val) && /[A-Z]/.test(val)
    let result2 = /\d/.test(val) && /[!@#$%^&*(),.?":{}|<>]/.test(val)
    let result3 = val.length >= 8
    setTest1(result1)
    setTest2(result2)
    setTest3(result3)
  };

  //api call

  const callGuideLoginApi = () => {
    var passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/;
    const result = passwordRegex.test(password)
    if (mobileNumber == '') {
      return Toast.show({
        type: 'custom',
        text1: 'Please enter mobile number',
      });
    }

    // if (countryCode == '') {
    //   return Toast.show({
    //     type: 'custom',
    //     text1: 'Please select country code ',
    //   });
    // }

    if (password == '') {
      return Toast.show({
        type: 'custom',
        text1: 'Please enter password ',
      });
    }
    if (result == false) {
      return Toast.show({
        type: 'custom',
        text1: 'Please enter valid password ',
      });
    }

    if (!toggle) {
      return Toast.show({
        type: 'custom',
        text1: 'Please select checkbox to continue',
      });
    }
    const payload = {
      countryCode: '+966',
      mobileNumber: mobileNumber,
      password: password,
      deviceOS: Platform.OS,
      deviceId: deviceId,
      type: 'local',
    };
    dispatch({type: SagaActions.USER_LOGIN, payload});
  };

  const getDeviceInfo = async () => {
    const deviceId = await DeviceInfo.getUniqueId();
    setDeviceId(deviceId);
    console.log('Device ID:', deviceId, 'type', typeof deviceId);
  };

  const CountryCodeModal = () => {
    return (
      <CountryPicker
        onRequestClose={() => {
          setShowCountryCode(!showCountryCode);
        }}
        style={{
          modal: {
            height: config.constants.Height / 2.5,
          },
        }}
        show={showCountryCode}
        // when picker button press you will get the country object with dial code
        pickerButtonOnPress={item => {
          setCountryCode(item.dial_code);
          setCountryFlag(item?.flag);
          console.log('code', item);
          setShowCountryCode(false);
        }}
      />
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: config.colors.white,
      }}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={config.colors.white}
      />

      <Text
        style={{
          marginTop: 60,
          fontFamily: config.fonts.HeadingFont,
          fontSize: 34,
          lineHeight: 36,
          textAlign: 'center',
          color: config.colors.blackColor,
        }}>{`Login `}</Text>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
          flex:1
        }}>
      <Text
        style={{
          marginTop: 20,
          marginHorizontal: 20,
          fontFamily: config.fonts.PrimaryFont,
          fontSize: 18,
          lineHeight: 26,
          textAlign: 'center',
          color: config.colors.blackColor,
        }}>{`Please enter your registered mobile \nnumber to login`}</Text>

      <View
        style={{
          marginTop: 30,
          borderTopRightRadius: 24,
          borderTopLeftRadius: 24,
          paddingHorizontal: 20,
          height: config.constants.Height,
          backgroundColor: config.colors.white,
        }}>
        {/* <View style={{
            marginTop:32
        }}>
          <AppTextInput
          inputTextLabel={'Phone number'}
            onChangeText={(val) => setMobileNumber(val.replace(/[^0-9]/g, ''))}
            value={mobileNumber}
            keyboardType={'numeric'}
            placeholder="+966 | Phone Number"
            leftIcon={config.images.SAUDI_FLAG}
          />
        </View> */}

        <View
          style={{
            marginTop: 12,
          }}>
          <View
            style={{
              backgroundColor: 'white',
              alignSelf: 'flex-start',
              paddingHorizontal: 3,
              marginStart: 10,
              zIndex: 1,
              elevation: 1,
              shadowColor: 'white',
              position: 'absolute',
              top: -5,
            }}>
            <Text
              style={{
                fontFamily: config.fonts.SemiboldFont,
                color: config.colors.blackColor,
                fontSize: 13,
              }}>{`Mobile Phone`}</Text>
          </View>
          <View
            style={{
              padding: 8, // Also used to make it look nicer
              zIndex: 0,
              flexDirection: 'row',
              height: 52,
              borderRadius: 4,
              alignItems: 'center',
              marginVertical: 5,
              borderColor: config.colors.lightGreyColor,
              borderWidth: 1,
              borderRadius: 12,
              paddingHorizontal: 12,
            }}>
            <View
              style={{width: '20%', flexDirection: 'row'}}
              // onPress={() => {
              //   setShowCountryCode(true);
              // }}
              >
              {/* <Image
                source={config.images.SAUDI_FLAG}
                style={{
                  height: 24,
                  width: 24,
                  resizeMode: 'contain',
                }}
              /> */}
              <Text
                style={{
                  fontFamily: config.fonts.MediumFont,
                  fontSize: 14,
                  lineHeight: 16,
                  color: config.colors.lightGrey2Color,
                }}>
               { '🇸🇦'}
              </Text>
              <Text
                style={{
                  marginHorizontal: 6,
                  fontFamily: config.fonts.MediumFont,
                  fontSize: 14,
                  lineHeight: 16,
                  color: config.colors.lightGrey2Color,
                }}>
                {'+966 '}
              </Text>
              {/* <Image
                source={config.images.RIGHT_ARROW}
                style={{
                  height: 20,
                  width: 20,
                  resizeMode: 'contain',
                  tintColor: config.colors.lightGrey2Color,
                  transform: [{rotate: '90deg'}],
                }}
              /> */}
            </View>
            <View style={{width: '75%'}}>
              <TextInput
                style={{
                  height: 52,
                  width: '90%',
                  fontSize: 14,
                  color: config.colors.blackColor,
                  fontFamily: config.fonts.LatoRegularFont,
                }}
                placeholder="9999999999"
                placeholderTextColor={config.colors.lightGrey2Color}
                keyboardType="numeric"
                maxLength={9}
                returnKeyType="done"
                value={mobileNumber}
                onChangeText={val => setMobileNumber(val)}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            marginTop: 12,
          }}>
          <AppTextInput
            style={{
              height: 52,
              width: '90%',
              fontSize: 14,
              color: config.colors.blackColor,
              fontFamily: config.fonts.LatoRegularFont,
            }}
            inputTextLabel={'Password'}
            secureTextEntry={togglePassword}
            onChangeText={val =>{
              setPassword(val.replace(/[^0-9a-zA-Z!@#$%^&*()]/g, ''))
              validatePassword(val)
            }}
            value={password}
            keyboardType={'default'}
            placeholder="**********"
            rightIconPress={() => setTogglePassword(!togglePassword)}
            rightIconStyle={{
              tintColor: config.colors.greyColor,
            }}
            rightIcon={
              togglePassword
                ? config.images.CLOSE_EYE_ICON
                : config.images.EYE_ICON
            }
          />
        </View>
      

        <View
          style={{
            marginTop: 20,
            width: '100%',
            marginVertical: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                height: 20,
                width: 20,
              }}
              onPress={() => setToggle(!toggle)}>
              <Image
                source={
                  toggle ? config.images.CHECK_ICON : config.images.UNCHECK_ICON
                }
                style={{
                  height: 18,
                  width: 18,
                  marginTop:2,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                marginTop:2,
                fontFamily: config.fonts.MediumFont,
                fontSize: 13,
                lineHeight: 16,
                color: config.colors.lightGrey2Color,
              }}>
              {' '}
              {`Remember me `}
            </Text>
          </View>
          <Text
            onPress={() => {
              navigation.navigate(config.routes.GUIDE_FORGOT_PASSWORD);
            }}
            style={{
              fontFamily: config.fonts.MediumFont,
              fontSize: 14,
              marginTop:2,
              lineHeight: 16,
              color: config.colors.blackColor,
            }}>{`Forgot Password`}</Text>
        </View>

        <AppButton
          text={'Login'}
          onPress={() => {
            callGuideLoginApi();
          }}
          buttonStyle={{marginVertical: 30}}
        />

        <View
          style={{
            height: 40,
            marginHorizontal: 20,
            justifyContent: 'flex-end',
            alignItems: 'center',
            borderBottomWidth: 0.5,
            borderColor: config.colors.lightGrey2Color,
          }}>
          <Text
            style={{
              top: 8,
              shadowColor: config.colors.white,
              backgroundColor: config.colors.white,
              fontFamily: config.fonts.primaryColor,
              fontSize: 14,
              lineHeight: 16,
              color: config.colors.lightGrey2Color,
            }}>{`   Or   `}</Text>
        </View>

        <View
          style={{
            marginVertical: 30,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignSelf: 'center',
            width: '35%',
          }}>
          <TouchableOpacity
            onPress={() => {
              Toast.show({
                type: 'custom',
                text1: 'Coming Soon',
              });
            }}>
            <Image
              source={config.images.APPLE_LOGO}
              style={{height: 40, width: 40, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Toast.show({
                type: 'custom',
                text1: 'Coming Soon',
              });
            }}>
            <Image
              source={config.images.GOOGLE_ICON}
              style={{height: 40, width: 40, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
        </View>

        <Text
          style={{
            textAlign: 'center',
            fontFamily: config.fonts.SemiboldFont,
            fontSize: 12,
            lineHeight: 16,
            color: config.colors.lightGrey2Color,
          }}>
          {`Don’t have an account?`}
          <Text
            style={{
              fontFamily: config.fonts.SemiboldFont,
              fontSize: 13,
              lineHeight: 26,
              color: config.colors.primaryColor,
            }}
            onPress={() => {
              navigation.navigate(config.routes.GUIDE_SIGNUP_SCREEN);
            }}>
            {' '}
            {`Register Now`}
          </Text>
        </Text>
      </View>
      </ScrollView>
      {CountryCodeModal()}
    </SafeAreaView>
  );
};

export default GuideLoginScreen;

const styles = StyleSheet.create({});
