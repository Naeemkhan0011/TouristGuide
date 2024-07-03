import {
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import config from '../../config';
import AppHeader from '../../components/AppHeader';
import OTPTextInput from 'react-native-otp-textinput';
import AppButton from '../../components/AppButton';
import { UserForgotPasswordReducer, UserVerifyOtpReducer } from '../../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SagaActions } from '../../redux/sagas/SagaActions';
import Toast from 'react-native-toast-message';

const GuideOtpVerification = ({navigation, route}) => {
  const dispatch = useDispatch();
  const otpInput = useRef(null);
  const [otpvalue, setOtpValue] = useState('');
  const [secs, setSecs] = useState(30);
  const userOtpVerifyResponse = useSelector(
    UserVerifyOtpReducer.selectUserVerifyOtpData,
  );
  const userOtpVerifyErrorResponse = useSelector(
    UserVerifyOtpReducer.selectUserVerifyOtpResponse,
  );
  const forgotPasswordResponse = useSelector(
    UserForgotPasswordReducer.selectUserForgotPasswordData,
  );
  const forgotPasswordErrorResponse = useSelector(
    UserForgotPasswordReducer.selectUserForgotPasswordResponse,
  );
   //hooks call
   useEffect(() => {
    route?.params?.otp &&
      Alert.alert('OTP', `Your otp is: ${route?.params?.otp}`, [
        {text: 'Ok', onPress: () => console.log('OK Pressed')},
      ]);
  }, []);

  useEffect(() => {
    if (forgotPasswordResponse != null) {
      if (forgotPasswordResponse?.error == false) {
        Alert.alert('OTP', `Your otp is: ${forgotPasswordResponse?.results?.otp}`, [
          {text: 'Ok', onPress: () => console.log('OK Pressed')},
        ]);
        console.log(
          'forgotPasswordResponse',
          JSON.stringify(forgotPasswordResponse),
        );
      }
    }
  }, [forgotPasswordResponse]);

  useEffect(() => {
    if (forgotPasswordErrorResponse != null) {
      if (forgotPasswordErrorResponse?.error != '') {
        Toast.show({
          type: 'custom',
          text1: forgotPasswordErrorResponse?.message,
        });
      }
    }
  }, [forgotPasswordErrorResponse]);

  useEffect(() => {
    if (userOtpVerifyResponse != null) {
      if (userOtpVerifyResponse?.error == false) {
        // navigation.navigate(config.routes.USER_LOGIN_SCREEN)
        console.log('userOtpVerifyResponse', userOtpVerifyResponse);
        Toast.show({
          type: 'custom',
          text1: userOtpVerifyResponse?.message,
        });
        if (route?.params?.from == 'forgot') {
          return navigation.navigate(config.routes.USER_UPDATE_PASSWORD, {
            mobileNo: route?.params?.mobileNo,
            code: route?.params?.code,
            from: 'guideOtp'
          });
        }
        goToTopNavigation(config.routes.TAB_NAVIGATOR, {
          userRole: route?.params?.userRole,
        });

        AsyncStorage.setItem(
          config.AsyncKeys.USER_LOGGED_IN,
          JSON.stringify(true),
        );
        AsyncStorage.setItem(
          config.AsyncKeys.USER_DATA,
          JSON.stringify(userOtpVerifyResponse?.results?.user),
        );
        AsyncStorage.setItem(
          config.AsyncKeys.USER_TOKEN,
          JSON.stringify(userOtpVerifyResponse?.results?.token),
        );
        dispatch(UserVerifyOtpReducer.removeUserVerifyOtpResponse())
      }
    }
  }, [userOtpVerifyResponse]);

  useEffect(() => {
    if (userOtpVerifyErrorResponse != null) {
      if (userOtpVerifyErrorResponse?.error == false) {
        Toast.show({
          type: 'custom',
          text1: userOtpVerifyErrorResponse?.message,
        });
        dispatch(UserVerifyOtpReducer.removeUserVerifyOtpResponse());
      }
    }
  }, [userOtpVerifyErrorResponse]);



  useEffect(() => {
    const timerId = setInterval(() => {
      if (secs <= 0) {
        //console.log('end')
      } else setSecs(s => s - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [secs]);
  const onResendPress = async () => {
    setSecs(30);
    setOtpValue('');
    otpInput.current.clear();
  };

  // api call
  const callForgotPasswordApi = () => {
  
    const payload = {
      mobileNumber: route?.params?.mobileNo,
      countryCode: route?.params?.code,
      type: "local"
    };
    dispatch({type: SagaActions.USER_FORGOT_PASSWORD, payload});
  };


  const callVerifyOtpApi = () => {
    const payload = {
      otp: otpvalue,
      deviceId: '1234',
      countryCode: route?.params?.code,
      mobileNumber: route?.params?.mobileNo,
      type: 'local',
    };
    dispatch({type: SagaActions.USER_VERIFY_OPT, payload});
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
          lineHeight: 38,
          textAlign: 'center',
          color: config.colors.blackColor,
        }}>{`Verification`}</Text>
      <Text
        style={{
          marginHorizontal: 20,
          fontFamily: config.fonts.PrimaryFont,
          fontSize: 16,
          lineHeight: 26,
          textAlign: 'center',
          color: config.colors.blackColor,
        }}>{`Please enter the OTP sent on your \nmobile number `}</Text>

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
            paddingHorizontal: 10,
          }}>
          <Text
            style={{
              marginLeft: 7,
              fontFamily: config.fonts.MediumFont,
              fontSize: 13,
              lineHeight: 16,
              color: config.colors.blackColor,
            }}>{`Code`}</Text>
          <OTPTextInput
            ref={otpInput}
            inputCount={6}
            defaultValue={otpvalue}
            handleTextChange={value => {
              setOtpValue(value);
            }}
            tintColor={config.colors.primaryColor}
            textInputStyle={styles.Otpinput}
            containerStyle={styles.containerStyle}
          />
        </View>

        <AppButton
          text={'Verify'}
          onPress={() => {
            callVerifyOtpApi()
          }}
          buttonStyle={{marginVertical: 30}}
        />

        <TouchableOpacity 
        style={{flexDirection: 'row', alignSelf: 'center'}} 
        onPress={()=>{callForgotPasswordApi()}}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: config.fonts.MediumFont,
              fontSize: 16,
              //  textDecorationLine:'underline',
              //  textDecorationColor: config.colors.blackColor,
              lineHeight: 26,
              color: config.colors.blackColor,
            }}>{` I didn’t receive a code?  `}</Text>
          <Text
            style={{
              textDecorationLine: 'none',
              textDecorationColor: config.colors.white,
              fontFamily: config.fonts.MediumFont,
              fontSize: 16,
              lineHeight: 26,
              color: config.colors.primaryColor,
            }}>
            {' '}
            {`Resend`}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default GuideOtpVerification;

const styles = StyleSheet.create({
  Otpinput: {
    backgroundColor: config.colors.white,
    height: 55,
    fontSize: 24,
    color: config.colors.fullBlack,
    width: '14%',
    borderWidth: 1,
    borderBottomWidth: 0.9,
    borderRadius: 15,
    borderColor: config.colors.fullBlack,
    fontFamily: config.fonts.HeadingFont,
  },
  containerStyle: {
    height: 67,
    alignSelf: 'center',
  },
});
