import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
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
import Toast from 'react-native-toast-message';
import {SagaActions} from '../../redux/sagas/SagaActions';
import {CountryPicker} from 'react-native-country-codes-picker';
import DeviceInfo from 'react-native-device-info';
import {useFocusEffect} from '@react-navigation/native';
import {removeUserLoginResponse} from '../../redux/reducers/UserReducer/UserLoginReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserLoginScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(true);
  const [mobileNumber, setMobileNumber] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [password, setPassword] = useState('');
  const [checkBoxSelected, setCheckBoxSelected] = useState(false);
  const [showCountryCode, setShowCountryCode] = useState(false);
  const [countryCode, setCountryCode] = useState('');
  const [countryFlag, setCountryFlag] = useState('');
  const [test1, setTest1] = useState('');
  const [test2, setTest2] = useState('');
  const [selectUserModal, setSelectUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [test3, setTest3] = useState('');
  const [focusPassword, setFocusPassword] = useState(false);
  const userLoginResponse = useSelector(UserLoginReducer.selectUserLoginData);
  const userLoginErrorResponse = useSelector(
    UserLoginReducer.selectUserLoginResponse,
  );
  // alert(route?.params?.from)

  //hooks call
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
          userRole: 'Guest',
        });
        console.log('userLoginResponse', JSON.stringify(userLoginResponse));
        dispatch(UserLoginReducer.removeUserLoginResponse())
      }
    }
  }, [userLoginResponse]);

  useEffect(() => {
    if (userLoginErrorResponse != null) {
      if (userLoginErrorResponse?.message != '') {
        Toast.show({
          type: 'custom',
          text1: userLoginErrorResponse?.message,
        });
        dispatch(UserLoginReducer.removeUserLoginResponse());
      }
    }
  }, [userLoginErrorResponse]);

//   useEffect(() => {
// if(route?.params?.from == 'logout'){
//   setSelectUserModal(true)
// }
//   },[])

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

  const callLoginApi = () => {
    var passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/;
    const result = passwordRegex.test(password)
    if (mobileNumber == '') {
      return Toast.show({
        type: 'custom',
        text1: 'Please enter mobile number',
      });
    }

    if (countryCode == '') {
      return Toast.show({
        type: 'custom',
        text1: 'Please select country code',
      });
    }

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

    if (!checkBoxSelected) {
      return Toast.show({
        type: 'custom',
        text1: 'Please select checkbox to continue',
      });
    }

    const payload = {
      countryCode: countryCode,
      mobileNumber: mobileNumber,
      password: password,
      deviceOS: Platform.OS,
      deviceId: deviceId,
      type: 'guest',
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
      <SafeAreaView style={{flex:1}}>
      <CountryPicker
      onRequestClose={() => {
        setShowCountryCode(!showCountryCode)
      }}
      style={{
        modal: {
          height: config.constants.Height/2.5
        }
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
      </SafeAreaView>
    );
  };

  const SelectUserModalView = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={selectUserModal}
        onRequestClose={() => {
          setSelectUserModal(!selectUserModal);
        }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="rgba(60, 61, 62, 0.8)"
        />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setSelectUserModal(false)}
          style={{
            flex: 1,
            width: `100%`,
            justifyContent: 'center',
            paddingHorizontal: 20,
            backgroundColor: 'rgba(60, 61, 62, 0.8)',
          }}>
          <View
            style={{
              maxHeight: config.constants.Height / 1.5,

              borderRadius: 24,
              backgroundColor: config.colors.white,
            }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 25,
                paddingVertical: 10,
              }}
              nestedScrollEnabled>
              <Text
                style={{
                  marginVertical: 20,
                  fontFamily: config.fonts.HeadingFont,
                  fontSize: 20,
                  color: config.colors.blackColor,
                  lineHeight: 23,
                }}>{`You Are`}</Text>
              <View
                style={{
                  height: 200,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  backgroundColor: config.colors.white,
                }}>
                <TouchableOpacity
                  style={{
                    height: 190,
                    width: '45%',
                    borderRadius: 16,
                    borderWidth: 1,
                    borderColor:
                      selectedUser == 'guest'
                        ? config.colors.primaryColor
                        : config.colors.lightGreyColor,
                    backgroundColor: config.colors.white,
                  }}
                  onPress={() => {
                    setSelectedUser('guest');
                    AsyncStorage.setItem(
                      config.AsyncKeys.USER_ROLE,
                      JSON.stringify('guest'),
                    );
                  }}>
                  <Image
                    source={
                      selectedUser == 'guest'
                        ? config.images.CHECK_ICON
                        : config.images.UNCHECK_ICON
                    }
                    style={{
                      height: 20,
                      width: 20,
                      resizeMode: 'cover',
                      marginTop: 15,
                      tintColor:
                        selectedUser == 'guest'
                          ? config.colors.primaryColor
                          : config.colors.lightGreyColor,
                      alignSelf: 'flex-end',
                      marginRight: 15,
                    }}
                  />

                  <Image
                    source={config.images.GUEST_IMG}
                    style={{
                      height: 42,
                      width: 42,
                      resizeMode: 'cover',
                      marginTop: 15,
                      marginLeft: 10,
                    }}
                  />
                  <Text
                    style={{
                      marginLeft: 10,
                      marginVertical: 10,
                      fontFamily: config.fonts.HeadingFont,
                      fontSize: 16,
                      color: config.colors.blackColor,
                      lineHeight: 18,
                    }}>{`A Guest`}</Text>
                  <Text
                    style={{
                      marginLeft: 10,
                      fontFamily: config.fonts.PrimaryFont,
                      fontSize: 14,
                      lineHeight: 16,
                      color: config.colors.lightGrey2Color,
                    }}>{`Experience \nSaudi with a \nLocal`}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    height: 190,
                    width: '45%',
                    borderRadius: 16,
                    borderWidth: 1,
                    borderColor:
                      selectedUser == 'local'
                        ? config.colors.primaryColor
                        : config.colors.lightGreyColor,
                    backgroundColor: config.colors.white,
                  }}
                  onPress={() => {
                    setSelectedUser('local');
                    AsyncStorage.setItem(
                      config.AsyncKeys.USER_ROLE,
                      JSON.stringify('local'),
                    );
                  }}>
                  <Image
                    source={
                      selectedUser == 'local'
                        ? config.images.CHECK_ICON
                        : config.images.UNCHECK_ICON
                    }
                    style={{
                      height: 20,
                      width: 20,
                      resizeMode: 'cover',
                      marginTop: 15,
                      tintColor:
                        selectedUser == 'local'
                          ? config.colors.primaryColor
                          : config.colors.lightGreyColor,
                      alignSelf: 'flex-end',
                      marginRight: 15,
                    }}
                  />

                  <Image
                    source={config.images.LOCAL_IMG}
                    style={{
                      height: 42,
                      width: 42,
                      resizeMode: 'cover',
                      marginTop: 15,
                      marginLeft: 10,
                    }}
                  />
                  <Text
                    style={{
                      marginLeft: 10,
                      marginVertical: 10,
                      fontFamily: config.fonts.HeadingFont,
                      fontSize: 16,
                      color: config.colors.blackColor,
                      lineHeight: 18,
                    }}>{`A Local`}</Text>
                  <Text
                    style={{
                      marginLeft: 10,
                      fontFamily: config.fonts.PrimaryFont,
                      fontSize: 14,
                      lineHeight: 16,
                      color: config.colors.lightGrey2Color,
                    }}>{`Guide your \nGuests the \nSaudi Way`}</Text>
                </TouchableOpacity>
              </View>
              <AppButton
                text={'Continue'}
                textStyle={{fontSize: 16}}
                onPress={() => {
                  if (selectedUser == '') {
                    Toast.show({
                      type: 'custom',
                      text1: 'Please select a user to continue',
                      position: 'top',
                    });
                  } else {
                    if (selectedUser == 'Local') {
                      setSelectUserModal(false);
                    } else {
                      setSelectUserModal(false);
                    }
                  }
                }}
                buttonStyle={{marginVertical: 20}}
              />
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <SafeAreaView
      style={{
         height:600,
        backgroundColor: config.colors.white,
      }}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={config.colors.white}
      />

      <Text
        style={{
          marginTop: 40,
          fontFamily: config.fonts.HeadingFont,
          fontSize: 30,
          lineHeight: 36,
          textAlign: 'center',
          color: config.colors.blackColor,
        }}>{`Login `}</Text>
        {/* <ScrollView 
        contentContainerStyle={{
          flex:1
        }}
        showsVerticalScrollIndicator={false}
        > */}
      <Text
        style={{
          marginTop:10,
          marginHorizontal:20,
          fontFamily: config.fonts.PrimaryFont,
          fontSize: 18,
          lineHeight: 28,
          textAlign: 'center',
          color: config.colors.blackColor,
        }}>{`Please enter your registered mobile number to login`}</Text>

      <View
        style={{
          marginTop: 30,
          borderTopRightRadius: 24,
          borderTopLeftRadius: 24,
          paddingHorizontal: 20,
          height: config.constants.Height,
          backgroundColor: config.colors.white,
        }}>
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
                fontFamily: config.fonts.PrimaryFont,
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
            <TouchableOpacity
              style={{paddingHorizontal:6, flexDirection: 'row'}}
              onPress={() => {
                setShowCountryCode(true);
              }}>
              <Text
                style={{
                  fontFamily: config.fonts.MediumFont,
                  fontSize: 14,
                  lineHeight: 16,
                  color: config.colors.lightGrey2Color,
                }}>
                {countryFlag ? countryFlag : '🇮🇳'}
              </Text>
              <Text
                style={{
                  marginHorizontal: 6,
                  fontFamily: config.fonts.MediumFont,
                  fontSize: 14,
                  lineHeight: 16,
                  color: config.colors.lightGrey2Color,
                }}>
                {countryCode ? countryCode : '+91'}
              </Text>
              <Image
                source={config.images.RIGHT_ARROW}
                style={{
                  height: 20,
                  width: 20,
                  resizeMode: 'contain',
                  tintColor: config.colors.lightGrey2Color,
                  transform: [{rotate: '90deg'}],
                }}
              />
            </TouchableOpacity>
            <View style={{width: '65%'}}>
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
                maxLength={16}
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
            lineHeight:18,
            fontSize: 14,
            color: config.colors.blackColor,
            fontFamily: config.fonts.LatoRegularFont,
          }}
            inputTextLabel={'Password'}
            placeholderTextColor={config.colors.blackColor}
            onChangeText={val =>{
              setPassword(val.replace(/[^0-9a-zA-Z!@#$%^&*()]/g, ''))
              validatePassword(val)
            }}
            value={password}
            onFocus={() => setFocusPassword(true)}
            onBlur={() => setFocusPassword(false)}
            secureTextEntry={showPassword}
            keyboardType={'default'}
            maxLength={16}
            placeholder="*********"
            rightIconStyle={{
              tintColor: config.colors.greyColor
            }}
            rightIcon={showPassword ? config.images.CLOSE_EYE_ICON : config.images.EYE_ICON}
            rightIconPress={() => setShowPassword(!showPassword)}
          />
        </View>
        {focusPassword && (
          <View style={{
            height:100,
            paddingHorizontal:8,
            paddingVertical:6,
            width: '100%',
            borderWidth:1,
            borderRadius:12,
            borderColor: (test1 && test2 && test3) ? config.colors.greenColor : config.colors.red
          }}>
            <Text style={{
              marginTop:7,
              fontFamily: config.fonts.MediumFont,
              fontSize:17,
              lineHeight:21,
              color:config.colors.blackColor
            }}>{`Your password needs to:`}</Text>
            <Text style={{
              fontFamily: config.fonts.PrimaryFont,
              fontSize:14,
              lineHeight:18,
              color:test1 ? config.colors.greenColor : config.colors.red
            }}>{test1 ? '✔' : 'X'} {` include both lower and upper case characters.`}</Text>
            <Text style={{
              fontFamily: config.fonts.PrimaryFont,
              fontSize:14,
              lineHeight:18,
              color:test2 ? config.colors.greenColor : config.colors.red
            }}>{test2 ? '✔' : 'X'}{` include at least one number or symbol.`}</Text>
            <Text style={{  
              fontFamily: config.fonts.PrimaryFont,
              fontSize:14,
              lineHeight:18,
              color:test3 ? config.colors.greenColor : config.colors.red
            }}>{test3 ? '✔' : 'X'}{` be at least 8 characters long.`}</Text>
          </View>
        )}

        <View
          style={{
            marginTop: 20,
            width: '100%',
            marginVertical: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{
                height: 20,
                width: 20,
              }}
              onPress={() => setCheckBoxSelected(!checkBoxSelected)}>
              <Image
                source={
                  checkBoxSelected
                    ? config.images.CHECK_ICON
                    : config.images.UNCHECK_ICON
                }
                style={{
                  height: 20,
                  width: 20,
                  resizeMode: 'contain',
                  marginRight: 6,
                }}
              />
            </TouchableOpacity>
            <View style={{justifyContent:'center'}}> 
            <Text
              style={{
                fontFamily: config.fonts.MediumFont,
                fontSize: 13,
                lineHeight: 16,
                color: config.colors.lightGrey2Color,
              }}>
              {' '}
              {` Remember me `}
            </Text>
            </View>
          </View>
          <Text
            onPress={() => {
              navigation.navigate(config.routes.USER_FORGOT_PASSWORD);
            }}
            style={{
              fontFamily: config.fonts.MediumFont,
              fontSize: 14,
              lineHeight: 16,
              color: config.colors.blackColor,
            }}>{`Forgot Password`}</Text>
        </View>

        <AppButton
          text={'Login'}
          onPress={() => {
            callLoginApi();
            // goToTopNavigation(config.routes.TAB_NAVIGATOR, {userRole: route?.params?.userRole})
            // alert('Coming Soon')
          }}
          buttonStyle={{marginVertical: 30}}
        />

        <View style={{
          height:40,
          marginHorizontal:20,
          justifyContent:'flex-end',
          alignItems:'center',
          borderBottomWidth:0.5,
          borderColor: config.colors.lightGrey2Color
        }}>
          <Text style={{
            top:8,
            shadowColor: config.colors.white,
            backgroundColor: config.colors.white,
            fontFamily: config.fonts.primaryColor,
            fontSize:14,
            lineHeight:16,
            color: config.colors.lightGrey2Color
          }}>{`   Or   `}</Text>
        </View>

        <View 
        style={{
          marginVertical:30,
          flexDirection:'row',
          justifyContent:'space-between',
          alignSelf:'center',
          width:'35%'
        }}>
          <TouchableOpacity onPress={(() =>{
            Toast.show({
              type: 'custom',
              text1:'Coming Soon'
            })
          })}> 
          <Image 
          source={config.images.APPLE_LOGO}
          style={{height:40,width:40,resizeMode:'contain'}}
          />
          </TouchableOpacity>
          <TouchableOpacity onPress={(() =>{
             Toast.show({
              type: 'custom',
              text1:'Coming Soon'
            })
          })}> 
          <Image 
          source={config.images.GOOGLE_ICON}
          style={{height:40,width:40,resizeMode:'contain'}}
          />
          </TouchableOpacity>
        </View>

        <Text
          style={{
            textAlign: 'center',
            fontFamily: config.fonts.MediumFont,
            fontSize: 16,
            lineHeight: 26,
            color: config.colors.blackColor,
          }}>
          {`Don’t have an account?`}
          <Text
            style={{
              fontFamily: config.fonts.MediumFont,
              fontSize: 16,
              lineHeight: 26,
              color: config.colors.primaryColor,
            }}
            onPress={() => {
              navigation.navigate(config.routes.USER_SIGNUP_SCREEN, {
                userRole: route?.params?.userRole,
              });
            }}>
            {' '}
            {`Register Now`}
          </Text>
        </Text>
      </View>
      {/* </ScrollView> */}
      {CountryCodeModal()}
      {SelectUserModalView()}
    </SafeAreaView>
  );
};

export default UserLoginScreen;

const styles = StyleSheet.create({});
