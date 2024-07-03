import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import config from '../../config';
import AppHeader from '../../components/AppHeader';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';
import {useDispatch, useSelector} from 'react-redux';
import {UserUpdatePasswordReducer} from '../../redux/reducers';
import Toast from 'react-native-toast-message';
import { SagaActions } from '../../redux/sagas/SagaActions';

const UserUpdatePassword = ({navigation, route}) => {
  console.log('route?.params?.mobileNo',route?.params?.mobileNo);
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const updatePasswordResponse = useSelector(
    UserUpdatePasswordReducer.selectUserUpdatePasswordData,
  );
  const updatePasswordErrorResponse = useSelector(
    UserUpdatePasswordReducer.selectUserUpdatePasswordResponse,
  );

  //hooks call
  useEffect(() => {
    if (updatePasswordResponse != null) {
      if (updatePasswordResponse?.error == false) {
        console.log(
          'updatePasswordResponse',
          JSON.stringify(updatePasswordResponse),
        );
        navigation.navigate(config.routes.USER_LOGIN_SCREEN);
        dispatch(UserUpdatePasswordReducer.removeUserUpdatePasswordResponse());
      }
    }
  }, [updatePasswordResponse]);

  useEffect(() => {
    if (updatePasswordErrorResponse != null) {
      if (updatePasswordErrorResponse?.error != '') {
       Toast.show({
        type: 'custom',
        text1: updatePasswordErrorResponse?.message
       })
        dispatch(UserUpdatePasswordReducer.removeUserUpdatePasswordResponse());
      }
    }
  }, [updatePasswordErrorResponse]);

  // api call
  const callUpdatePasswordApi = () => {
    var passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/;
    const result = passwordRegex.test(password)
    var passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/;
    const confirmPasswordTest = passwordRegex.test(confirmPassword)
    if(password == ''){
      return Toast.show({
        type: 'custom',
        text1: 'Please enter password'
      })
    }
    if(result == false){
      return Toast.show({
        type: 'custom',
        text1: 'Please enter valid password'
      })
    }
    if(confirmPassword == ''){
      return Toast.show({
        type: 'custom',
        text1: 'Please enter confirm password'
      })
    }
    if(confirmPasswordTest == false){
      return Toast.show({
        type: 'custom',
        text1: 'Please enter valid confirm password'
      })
    }
    if(confirmPassword != password){
      return Toast.show({
        type: 'custom',
        text1: 'Password not Match'
      })
    }
    const payload = {
      countryCode: route?.params?.code,
      mobileNumber: route?.params?.mobileNo, 
      password: password,
      type: route?.params?.from == 'guideOtp' ?  'local' : "guest"
    }
    dispatch({type:SagaActions.USER_UPDATE_PASSWORD, payload})
  }
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

     

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{marginHorizontal: 20}}>
           <Text
          style={{
            textAlign:'center',
            marginVertical: 20,
            fontFamily: config.fonts.PrimaryFont,
            fontSize: 34,
            lineHeight: 38,
            color: config.colors.blackColor,
          }}>{`Update Password`}</Text>

        <Text
          style={{
            textAlign:'center',
            marginVertical: 20,
            fontFamily: config.fonts.PrimaryFont,
            fontSize: 16,
            lineHeight: 28,
            color: config.colors.blackColor,
          }}>{`Create a new password that is at least 8 characters long and not match with previous.`}</Text>

        <View style={styles.inputcss1}>
          <AppTextInput
           style={{
            height: 52,
            width: '90%',
            fontSize: 14,
            color: config.colors.blackColor,
            fontFamily: config.fonts.LatoBlackFont,
          }}
            onChangeText={val => setPassword(val.replace(/[^0-9a-zA-Z@#$&*]/g, ''))}
            value={password}
            keyboardType={'default'}
            placeholder="Password"
            maxLength={16}
            leftIconStyle={{
              height: 20,
              width: 20,
              resizeMode: 'contain',
            }}
            leftIcon={config.images.LOCK_ICON}
          />
        </View>

        <View style={styles.inputcss1}>
          <AppTextInput
           style={{
            height: 52,
            width: '90%',
            fontSize: 14,
            color: config.colors.blackColor,
            fontFamily: config.fonts.LatoBlackFont,
          }}
            onChangeText={val => setConfirmPassword(val.replace(/[^0-9a-zA-Z@#$&*]/g, ''))}
            value={confirmPassword}
            maxLength={16}
            keyboardType={'default'}
            placeholder="Confirm Password"
            leftIconStyle={{
              height: 20,
              width: 20,
              resizeMode: 'contain',
            }}
            leftIcon={config.images.LOCK_ICON}
          />
        </View>

        <AppButton
          text={'Apply'}
          onPress={() => {callUpdatePasswordApi()}}
          buttonStyle={{marginVertical: 30}}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserUpdatePassword;

const styles = StyleSheet.create({
  inputcss1: {
    marginTop: 12,
  },
});
