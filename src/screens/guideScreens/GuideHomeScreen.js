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
import React, {useCallback, useEffect, useState} from 'react';
import config from '../../config';
import {useDispatch, useSelector} from 'react-redux';
import {GuideGetProfileReducer} from '../../redux/reducers';
import { SagaActions } from '../../redux/sagas/SagaActions';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GuideHomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [guideData, setGuideData] = useState(null);
  const guideGetProfileResponse = useSelector(
    GuideGetProfileReducer.selectGuideGetProfileData,
  );

  // hooks call
  useEffect(() => {
    if (guideGetProfileResponse != null) {
      if (guideGetProfileResponse?.error == false) {
        setGuideData(guideGetProfileResponse?.results?.details)
        if(guideGetProfileResponse?.results?.details?.pay == false){
          navigation.navigate(config.routes.SUBSCRIPTION_PLAN)
        }
        console.log('guideGetProfileResponse', guideGetProfileResponse);
        dispatch(GuideGetProfileReducer.removeGuideGetProfileResponse())
      }
    }
  }, [guideGetProfileResponse]);

  useFocusEffect(
    useCallback(() => {
      callGetGuideProfile()
    },[])
  )

  // api call
const callGetGuideProfile = () => {
  dispatch({type:SagaActions.GUIDE_GET_PROFILE, payload: ''})
}

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: config.colors.primaryColor,
      }}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={config.colors.primaryColor}
        translucent={false}
      />
      <View
        style={{
          height: 60,
          marginHorizontal: 20,
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text
            style={{
              fontFamily: config.fonts.SemiboldFont,
              fontSize: 20,
              lineHeight: 26,
              color: config.colors.white,
            }}>
            {`Ahlain, `}
            <Text
              style={{
                fontFamily: config.fonts.SemiboldFont,
                fontSize: 13,
                lineHeight: 26,
                color: config.colors.white,
              }}>{`${guideData?.fullName}`}</Text>
          </Text>
        </View>
        <TouchableOpacity
        style={{
          marginTop:3,
        }}
        onPress={() => {
          Toast.show({
            type: 'custom',
            text1: 'Coming Soon'
          })
        }}>
          <Image
            source={config.images.NOTIFICATION}
            style={{height: 26, width: 26, resizeMode: 'contain'}}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 1,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          backgroundColor: config.colors.white,
        }}>
        <ScrollView contentContainerStyle={{marginHorizontal: 20}}>
          <View
            style={{
              height: 171,
              marginVertical: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: config.colors.primaryColor,
              borderRadius: 20,
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '50%',
              }}>
              <Text
                style={{
                  fontFamily: config.fonts.SemiboldFont,
                  fontSize: 20,
                  lineHeight: 26,
                  color: config.colors.white,
                }}>{`Manage your \nGuests with \nus.`}</Text>
            </View>
            <View
              style={{
                width: '50%',
              }}>
              <Image
                source={config.images.BANNER_IMG}
                style={{
                  height: 170,
                  width: 170,
                  resizeMode: 'contain',
                }}
              />
            </View>
          </View>

          <TouchableOpacity
            style={{
              height: 70,
              borderRadius: 10,
              borderWidth: 1,
              paddingHorizontal: 20,
              flexDirection: 'row',
              alignItems: 'center',
              borderColor: config.colors.borderColor,
            }}
            onPress={() => {
              Toast.show({
                 type: 'custom',
                text1:'Coming Soon'
              })
              // navigation.navigate(config.routes.SUBSCRIPTION_PLAN);
            }}>
            <Image
              style={{
                height: 26,
                width: 26,
                marginRight: 10,
                resizeMode: 'contain',
                tintColor: config.colors.yellowColor,
              }}
              source={config.images.TRIP_ICON}
            />
            <Text
              style={{
                fontFamily: config.fonts.SemiboldFont,
                fontSize: 20,
                lineHeight: 26,
                color: config.colors.blackColor,
              }}>{`Bookings`}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              height: 70,
              marginTop: 20,
              borderRadius: 10,
              borderWidth: 1,
              paddingHorizontal: 20,
              flexDirection: 'row',
              alignItems: 'center',
              borderColor: config.colors.borderColor,
            }}
            onPress={() => {
              Toast.show({
                 type: 'custom',
                text1:'Coming Soon'
              })
            }}>
            <Image
              style={{
                height: 26,
                width: 26,
                marginRight: 10,
                resizeMode: 'contain',
                tintColor: config.colors.yellowColor,
              }}
              source={config.images.TRIP_ICON}
            />
            <Text
              style={{
                fontFamily: config.fonts.SemiboldFont,
                fontSize: 20,
                lineHeight: 26,
                color: config.colors.blackColor,
              }}>{`Trips Management`}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              height: 70,
              marginTop: 20,
              borderRadius: 10,
              borderWidth: 1,
              paddingHorizontal: 20,
              flexDirection: 'row',
              alignItems: 'center',
              borderColor: config.colors.borderColor,
            }}
            onPress={() => {
              Toast.show({
                 type: 'custom',
                text1:'Coming Soon'
              })
            }}>
            <Image
              style={{
                height: 26,
                width: 26,
                marginRight: 10,
                resizeMode: 'contain',
                tintColor: config.colors.yellowColor,
              }}
              source={config.images.TRIP_ICON}
            />
            <Text
              style={{
                fontFamily: config.fonts.SemiboldFont,
                fontSize: 20,
                lineHeight: 26,
                color: config.colors.blackColor,
              }}>{`Explore Guests`}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              height: 70,
              marginTop: 20,
              borderRadius: 10,
              borderWidth: 1,
              paddingHorizontal: 20,
              flexDirection: 'row',
              alignItems: 'center',
              borderColor: config.colors.borderColor,
            }}
            onPress={() => {
              Toast.show({
                 type: 'custom',
                text1:'Coming Soon'
              })
            }}>
            <Image
              style={{
                height: 26,
                width: 26,
                marginRight: 10,
                resizeMode: 'contain',
                tintColor: config.colors.yellowColor,
              }}
              source={config.images.TRIP_ICON}
            />
            <Text
              style={{
                fontFamily: config.fonts.SemiboldFont,
                fontSize: 20,
                lineHeight: 26,
                color: config.colors.blackColor,
              }}>{`My Earnings`}</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default GuideHomeScreen;

const styles = StyleSheet.create({});
