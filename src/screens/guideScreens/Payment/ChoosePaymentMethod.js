import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import config from '../../../config';
import AppHeader from '../../../components/AppHeader';
import AppButton from '../../../components/AppButton';
import {useDispatch, useSelector} from 'react-redux';
import {
  GuideGetProfileReducer,
  GuidePayStatusReducer,
} from '../../../redux/reducers';
import Toast from 'react-native-toast-message';
import { SagaActions } from '../../../redux/sagas/SagaActions';

const ChoosePaymentMethod = ({navigation}) => {
    const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState('');
  
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
            }}>{`Choose payment method`}</Text>

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

          <TouchableOpacity
            style={{
              height: 56,
              marginTop: 20,
              borderRadius: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderWidth: 1,
              borderColor: config.colors.lightGreyColor,
            }}
            onPress={() => {
              setPaymentMethod('Debit/Credit Card');
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}>
              <Image
                source={config.images.DEBIT_CARD_ICON}
                style={{
                  height: 28,
                  width: 28,
                  marginHorizontal: 10,
                  resizeMode: 'cover',
                }}
              />
              <Text
                style={{
                  fontFamily: config.fonts.MediumFont,
                  fontSize: 14,
                  lineHeight: 16,
                  color: config.colors.blackColor,
                }}>{`Debit/Credit Card`}</Text>
            </View>

            <Image
              source={
                paymentMethod == 'Debit/Credit Card'
                  ? config.images.CHECK_ICON
                  : config.images.UNCHECK_ICON
              }
              style={{
                height: 20,
                width: 20,
                resizeMode: 'contain',
                marginRight: 10,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              height: 56,
              marginTop: 20,
              borderRadius: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderWidth: 1,
              borderColor: config.colors.lightGreyColor,
            }}
            onPress={() => {
              setPaymentMethod('Apple Pay');
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}>
              <Image
                source={config.images.APPLE_ICON}
                style={{
                  height: 28,
                  width: 28,
                  marginHorizontal: 12,
                  resizeMode: 'cover',
                }}
              />
              <Text
                style={{
                  fontFamily: config.fonts.MediumFont,
                  fontSize: 14,
                  lineHeight: 16,
                  color: config.colors.blackColor,
                }}>{`Apple Pay`}</Text>
            </View>

            <Image
              source={
                paymentMethod == 'Apple Pay'
                  ? config.images.CHECK_ICON
                  : config.images.UNCHECK_ICON
              }
              style={{
                height: 20,
                width: 20,
                resizeMode: 'contain',
                marginRight: 10,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              height: 56,
              marginTop: 20,
              borderRadius: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderWidth: 1,
              borderColor: config.colors.lightGreyColor,
            }}
            onPress={() => {
              setPaymentMethod('Paypal');
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}>
              <Image
                source={config.images.PAYPAL_ICON}
                style={{
                  height: 28,
                  width: 28,
                  marginHorizontal: 12,
                  resizeMode: 'cover',
                }}
              />
              <Text
                style={{
                  fontFamily: config.fonts.MediumFont,
                  fontSize: 14,
                  lineHeight: 16,
                  color: config.colors.blackColor,
                }}>{`Paypal`}</Text>
            </View>

            <Image
              source={
                paymentMethod == 'Paypal'
                  ? config.images.CHECK_ICON
                  : config.images.UNCHECK_ICON
              }
              style={{
                height: 20,
                width: 20,
                resizeMode: 'contain',
                marginRight: 10,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              height: 56,
              marginTop: 20,
              borderRadius: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderWidth: 1,
              borderColor: config.colors.lightGreyColor,
            }}
            onPress={() => {
              setPaymentMethod('Mada Payment');
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}>
              <Image
                source={config.images.WALLET_ICON}
                style={{
                  height: 28,
                  width: 28,
                  marginHorizontal: 12,
                  resizeMode: 'cover',
                }}
              />
              <Text
                style={{
                  fontFamily: config.fonts.MediumFont,
                  fontSize: 14,
                  lineHeight: 16,
                  color: config.colors.blackColor,
                }}>{`Mada Payment`}</Text>
            </View>

            <Image
              source={
                paymentMethod == 'Mada Payment'
                  ? config.images.CHECK_ICON
                  : config.images.UNCHECK_ICON
              }
              style={{
                height: 20,
                width: 20,
                resizeMode: 'contain',
                marginRight: 10,
              }}
            />
          </TouchableOpacity>
        </ScrollView>

        <AppButton
          text={'Continue'}
          onPress={() => {
            navigation.navigate(config.routes.PAYMENT_DETAIL);
          }}
          buttonStyle={{
            marginHorizontal: 20,
            marginVertical: 20,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChoosePaymentMethod;

const styles = StyleSheet.create({});
