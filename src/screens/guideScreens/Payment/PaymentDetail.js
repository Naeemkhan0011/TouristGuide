import {
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import config from '../../../config';
import AppHeader from '../../../components/AppHeader';
import AppButton from '../../../components/AppButton';
import {months} from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { GuideGetProfileReducer, GuidePayStatusReducer } from '../../../redux/reducers';
import Toast from 'react-native-toast-message';
import { SagaActions } from '../../../redux/sagas/SagaActions';
import { goToTopNavigation } from '../../../components/NavigationRef';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PaymentDetail = ({navigation}) => {
  const dispatch = useDispatch();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cvvNumber, setCvvNumber] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  console.log('showSuccessModal', showSuccessModal);

  const [localId, setLocalId] = useState('');
 
  const guidePaymentMethodResponse = useSelector(
    GuidePayStatusReducer.selectGuidePayStatusData,
  );
  const guidePaymentMethodErrorResponse = useSelector(
    GuidePayStatusReducer.selectGuidePayStatusResponse,
  );
 
  useFocusEffect(
    useCallback(() => {
      getData()
    },[])
  )

  // hooks call
 const getData = async() => {
  const data = JSON.parse(
    await AsyncStorage.getItem(config.AsyncKeys.USER_DATA),
  );
  setLocalId(data?._id)
  console.log('dataa',data?._id);
 }
 

  useEffect(() => {
    if (guidePaymentMethodResponse != null) {
      if (guidePaymentMethodResponse?.error == false) {
        setShowSuccessModal(true);
        console.log('guidePaymentMethodResponse', guidePaymentMethodResponse);
        dispatch(GuidePayStatusReducer.removeGuidePayStatusResponse())
      }
    }
  }, [guidePaymentMethodResponse]);

  useEffect(() => {
    if (guidePaymentMethodErrorResponse != null) {
      if (guidePaymentMethodErrorResponse?.error != '') {
        Toast.show({
          type: 'custom',
          text1: guidePaymentMethodErrorResponse?.message,
        });
        dispatch(GuidePayStatusReducer.removeGuidePayStatusResponse())
      }
    }
  }, [guidePaymentMethodErrorResponse]);


  // api call


  const callPayStatusApi = () => {
    const payload ={
        uri: '/' + localId,
        // pay: true

    }
    dispatch({type:SagaActions.GUIDE_PAY_STATUS, payload})
  }




  const renderSuccessModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={showSuccessModal}
        onRequestClose={() => {
          setShowSuccessModal(!showSuccessModal);
        }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="rgba(60, 61, 62, 0.8)"
        />
        <View
          // activeOpacity={0.8}
          // onPress={() => setSelectUserModal(false)}
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
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 25,
                paddingVertical: 10,
              }}
              nestedScrollEnabled>
              <Image
                source={config.images.SUCCESS_IMG}
                style={{
                  height: 100,
                  width: 100,
                  marginTop: 15,
                  resizeMode: 'contain',
                }}
              />

              <Text
                style={{
                  marginTop: 15,
                  fontFamily: config.fonts.SemiboldFont,
                  fontSize: 22,
                  lineHeight: 26,
                  color: config.colors.blackColor,
                }}>{`Thank You!`}</Text>
              <Text
                style={{
                  marginTop: 15,
                  textAlign: 'center',
                  fontFamily: config.fonts.MediumFont,
                  fontSize: 14,
                  lineHeight: 18,
                  color: config.colors.lightGrey2Color,
                }}>{` Your payment for ------- has been successfully made.`}</Text>
            </ScrollView>
            <AppButton
              text={'Back to Home'}
              onPress={() => {
                setShowSuccessModal(false);
                setTimeout(() => {
                  goToTopNavigation(config.routes.TAB_NAVIGATOR,{userRole: 'Local'})
                }, 100);
              }}
              buttonStyle={{marginVertical: 20, marginHorizontal: 20}}
            />
          </View>
        </View>
      </Modal>
    );
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: config.colors.primaryColor,
      }}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={config.colors.primaryColor}
      />
      <AppHeader
        title={'Payment'}
        backgroundColor={config.colors.primaryColor}
        navigation={navigation}
        onPress={() => navigation.goBack()}
        tintColor={config.colors.white}
      />

      <View
        style={{
          flex: 1,
          marginTop: 20,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          backgroundColor: config.colors.white,
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginHorizontal: 20,
          }}>
          <Text
            style={{
              marginTop: 18,
              fontFamily: config.fonts.SemiboldFont,
              fontSize: 24,
              lineHeight: 28,
              color: config.colors.blackColor,
            }}>{`Credit card details`}</Text>

          <View
            style={{
              height: 74,
              marginTop: 20,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: config.colors.lightGreyColor,
            }}>
            <View
              style={{
                height: 40,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  marginLeft: 15,
                  fontFamily: config.fonts.SemiboldFont,
                  fontSize: 14,
                  lineHeight: 18,
                  color: config.colors.lightGrey2Color,
                }}>{`1 Month`}</Text>
              <View
                style={{
                  height: 18,
                  justifyContent: 'center',
                  borderTopLeftRadius: 12,
                  borderBottomLeftRadius: 12,
                  width: '30%',
                  backgroundColor: config.colors.yellowColor,
                }}>
                <Text
                  style={{
                    fontFamily: config.fonts.MediumFont,
                    fontSize: 12,
                    textAlign: 'center',
                    lineHeight: 14,
                    color: config.colors.white,
                  }}>{`Recommended`}</Text>
              </View>
            </View>
            <Text
              style={{
                marginLeft: 15,
                fontFamily: config.fonts.SemiboldFont,
                fontSize: 20,
                lineHeight: 24,
                color: config.colors.blackColor,
              }}>
              {`SAR 100 `}
              <Text
                style={{
                  marginLeft: 15,
                  fontFamily: config.fonts.primaryColor,
                  fontSize: 14,
                  lineHeight: 24,
                  color: config.colors.blackColor,
                }}>{`/ month`}</Text>
            </Text>
          </View>

          <View
            style={{
              marginTop: 20,
              height: 206,
              paddingHorizontal: 20,
              borderRadius: 16,
              backgroundColor: config.colors.lightColor,
            }}>
            <Text
              style={{
                fontFamily: config.fonts.MediumFont,
                marginTop: 20,
                fontSize: 15,
                lineHeight: 18,
                color: config.colors.blackColor,
              }}>{`Card Number`}</Text>
            <View
              style={{
                marginTop: 12,
                borderRadius: 8,
                flexDirection: 'row',
                height: 36,
                paddingHorizontal: 12,
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: config.colors.white,
              }}>
              <TextInput
                style={{
                  fontFamily: config.fonts.MediumFont,
                  fontSize: 16,
                  lineHeight: 18,
                  color: config.colors.blackColor,
                }}
                placeholder=""
                keyboardType="number-pad"
                maxLength={14}
                value={cardNumber}
                onChangeText={val => {
                  setCardNumber(val);
                }}
              />
              <Image
                source={config.images.CAMERA_ICON}
                style={{height: 18, width: 18, resizeMode: 'contain'}}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  width: '65%',
                }}>
                <Text
                  style={{
                    fontFamily: config.fonts.MediumFont,
                    marginTop: 30,
                    fontSize: 15,
                    lineHeight: 18,
                    color: config.colors.blackColor,
                  }}>{`Expiry Date`}</Text>
                <View
                  style={{
                    marginTop: 15,
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      height: 42,
                      marginRight: 15,
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '30%',
                      backgroundColor: config.colors.white,
                      borderRadius: 8,
                    }}>
                    <TextInput
                      style={{
                        fontFamily: config.fonts.MediumFont,
                        fontSize: 16,
                        lineHeight: 18,
                        color: config.colors.blackColor,
                      }}
                      placeholder="MM"
                      keyboardType="number-pad"
                      maxLength={2}
                      value={month}
                      onChangeText={val => {
                        setMonth(val);
                      }}
                    />
                  </View>
                  <View
                    style={{
                      height: 42,
                      width: '30%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: config.colors.white,
                      borderRadius: 8,
                    }}>
                    <TextInput
                      style={{
                        fontFamily: config.fonts.MediumFont,
                        fontSize: 16,
                        lineHeight: 18,
                        color: config.colors.blackColor,
                      }}
                      placeholder="YY"
                      keyboardType="number-pad"
                      maxLength={4}
                      value={year}
                      onChangeText={val => {
                        setYear(val);
                      }}
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: '35%',
                }}>
                <Text
                  style={{
                    fontFamily: config.fonts.MediumFont,
                    marginTop: 30,
                    fontSize: 15,
                    lineHeight: 18,
                    color: config.colors.blackColor,
                  }}>{`CVV`}</Text>
                <View
                  style={{
                    marginTop: 15,
                    height: 42,
                    width: '50%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: config.colors.white,
                    borderRadius: 8,
                  }}>
                  <TextInput
                    style={{
                      fontFamily: config.fonts.MediumFont,
                      fontSize: 16,
                      lineHeight: 18,
                      color: config.colors.blackColor,
                    }}
                    placeholder="CVV"
                    keyboardType="number-pad"
                    maxLength={3}
                    value={cvvNumber}
                    onChangeText={val => {
                      setCvvNumber(val);
                    }}
                  />
                </View>
              </View>
            </View>
          </View>

          <View style={{
            marginTop:25,
            flexDirection:'row'
          }}>
            <TouchableOpacity>
            <Image 
            source={config.images.CHECK_ICON}
            style={{
              height:20,
              width:20,
              marginRight:12,
              resizeMode:'contain'
            }}
            />
            </TouchableOpacity>
            <Text style={{
              fontFamily: config.fonts.MediumFont,
              fontSize:12,
              lineHeight:14,
              color:config.colors.lightGrey2Color,
            }}>{'Securely save card details'}</Text>
          </View>
        </ScrollView>

        <AppButton
          text={'Pay'}
          onPress={() => {
            callPayStatusApi()
          }}
          buttonStyle={{
            marginHorizontal: 20,
            marginVertical: 20,
          }}
        />
      </View>
      {renderSuccessModal()}
    </SafeAreaView>
  );
};

export default PaymentDetail;

const styles = StyleSheet.create({});
