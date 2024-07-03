import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import config from '../../config';
import AppHeader from '../../components/AppHeader';
import {goToTopNavigation} from '../../components/NavigationRef';
import AppButton from '../../components/AppButton';
import {
  GuideGetProfileReducer,
  GuidePayStatusReducer,
} from '../../redux/reducers';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {SagaActions} from '../../redux/sagas/SagaActions';
import AppIntroSlider from 'react-native-app-intro-slider';

const SubscriptionPlan = ({navigation}) => {
  const dispatch = useDispatch();
  const guideGetProfileResponse = useSelector(
    GuideGetProfileReducer.selectGuideGetProfileData,
  );
  const guidePaymentMethodResponse = useSelector(
    GuidePayStatusReducer.selectGuidePayStatusData,
  );
  const guidePaymentMethodErrorResponse = useSelector(
    GuidePayStatusReducer.selectGuidePayStatusResponse,
  );
  const [guideData, setGuideData] = useState(null);
  const [localId, setLocalId] = useState('');

  useEffect(() => {
    if (guideGetProfileResponse != null) {
      if (guideGetProfileResponse?.error == false) {
        setGuideData(guideGetProfileResponse?.results?.details);
        setLocalId(guideGetProfileResponse?.results?.details?._id)
        console.log('guideGetProfileResponse', guideGetProfileResponse);
        dispatch(GuideGetProfileReducer.removeGuideGetProfileResponse());
      }
    }
  }, [guideGetProfileResponse]);
  useEffect(() => {
    if (guidePaymentMethodResponse != null) {
      if (guidePaymentMethodResponse?.error == false) {
        if (guideData?.isCompletedProfile == true) {
          goToTopNavigation(config.routes.TAB_NAVIGATOR, {userRole: 'Local'});
        } else {
          navigation.navigate(config.routes.GUIDE_COMPLETE_PROFILE);
        }
        console.log('guidePaymentMethodResponse', guidePaymentMethodResponse);
        dispatch(GuidePayStatusReducer.removeGuidePayStatusResponse());
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
        dispatch(GuidePayStatusReducer.removeGuidePayStatusResponse());
      }
    }
  }, [guidePaymentMethodErrorResponse]);

  useFocusEffect(
    useCallback(() => {
      callGetGuideProfile();
    }, []),
  );

  // api call
  const callPayStatusApi = () => {
    const payload = {
      uri: '/' + localId,
      // pay: true
    };
    dispatch({type: SagaActions.GUIDE_PAY_STATUS, payload});
  };

  const callGetGuideProfile = () => {
    dispatch({type: SagaActions.GUIDE_GET_PROFILE, payload: ''});
  };

  const slides = [
    {
      key: 's1',
      component: (
        <>
           <View
                style={{
                  marginTop: 20,
                  borderRadius: 12,
                  height: 593,
                  backgroundColor: config.colors.white,
                }}>
                <View
                  style={{
                    height: 61,
                    backgroundColor: config.colors.yellowColor,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopRightRadius: 12,
                    borderTopLeftRadius: 12,
                  }}>
                  <Text
                    style={{
                      fontFamily: config.fonts.MediumFont,
                      fontSize: 14,
                      lineHeight: 18,
                      color: config.colors.white,
                    }}>
                    {`★ Most Popular`}
                  </Text>
                </View>

                <Text
                  style={{
                    marginTop: 12,
                    textAlign: 'center',
                    fontFamily: config.fonts.SemiboldFont,
                    fontSize: 20,
                    lineHeight: 24,
                    color: config.colors.blackColor,
                  }}>
                  {`Basic Plan`}
                </Text>

                <Text
                  style={{
                    marginTop: 22,
                    textAlign: 'center',
                    fontFamily: config.fonts.HeadingFont,
                    fontSize: 40,
                    lineHeight: 44,
                    color: config.colors.primaryColor,
                  }}>
                  {`Free`}
                </Text>

                <View
                  style={{
                    // justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={config.images.RIGHT_ICON}
                    style={{
                      height: 15,
                      width: 15,
                      marginRight: 8,
                      resizeMode: 'contain',
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: config.fonts.SemiboldFont,
                      fontSize: 12,
                      lineHeight: 16,
                      color: config.colors.lightGrey2Color,
                    }}>
                    {`Arrangements for transportation during your trip.`}
                  </Text>
                </View>

                <View
                  style={{
                    // justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={config.images.RIGHT_ICON}
                    style={{
                      height: 15,
                      width: 15,
                      marginRight: 8,
                      resizeMode: 'contain',
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: config.fonts.SemiboldFont,
                      fontSize: 12,
                      lineHeight: 16,
                      color: config.colors.lightGrey2Color,
                    }}>
                    {`Provision of travel insurance to cover unexpected events such as trip cancellations.`}
                  </Text>
                </View>

                <View
                  style={{
                    // justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={config.images.RIGHT_ICON}
                    style={{
                      height: 15,
                      width: 15,
                      marginRight: 8,
                      resizeMode: 'contain',
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: config.fonts.SemiboldFont,
                      fontSize: 12,
                      lineHeight: 16,
                      color: config.colors.lightGrey2Color,
                    }}>
                    {`Guidance and support with obtaining necessary visas for international travel.`}
                  </Text>
                </View>

                <View
                  style={{
                    // justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={config.images.RIGHT_ICON}
                    style={{
                      height: 15,
                      width: 15,
                      marginRight: 8,
                      resizeMode: 'contain',
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: config.fonts.SemiboldFont,
                      fontSize: 12,
                      lineHeight: 16,
                      color: config.colors.lightGrey2Color,
                    }}>
                    {`24/7 Customer Support`}
                  </Text>
                </View>

                <View
                  style={{
                    // justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={config.images.RIGHT_ICON}
                    style={{
                      height: 15,
                      width: 15,
                      marginRight: 8,
                      resizeMode: 'contain',
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: config.fonts.SemiboldFont,
                      fontSize: 12,
                      lineHeight: 16,
                      color: config.colors.lightGrey2Color,
                    }}>
                    {`Etiam hendrerit massa`}
                  </Text>
                </View>

                <View
                  style={{
                    // justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={config.images.RIGHT_ICON}
                    style={{
                      height: 15,
                      width: 15,
                      marginRight: 8,
                      resizeMode: 'contain',
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: config.fonts.SemiboldFont,
                      fontSize: 12,
                      lineHeight: 16,
                      color: config.colors.lightGrey2Color,
                    }}>
                    {`Travel Rewards Programs`}
                  </Text>
                </View>

                <View
                  style={{
                    // justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={config.images.RIGHT_ICON}
                    style={{
                      height: 15,
                      width: 15,
                      marginRight: 8,
                      resizeMode: 'contain',
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: config.fonts.SemiboldFont,
                      fontSize: 12,
                      lineHeight: 16,
                      color: config.colors.lightGrey2Color,
                    }}>
                    {`Transportation Services:`}
                  </Text>
                </View>

                <View
                  style={{
                    // justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={config.images.RIGHT_ICON}
                    style={{
                      height: 15,
                      width: 15,
                      marginRight: 8,
                      resizeMode: 'contain',
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: config.fonts.SemiboldFont,
                      fontSize: 12,
                      lineHeight: 16,
                      color: config.colors.lightGrey2Color,
                    }}>
                    {`Hotel Accommodation`}
                  </Text>
                </View>

                <AppButton
                  text={'Choose Plan'}
                  onPress={() => {
                    navigation.navigate(config.routes.CHOOSE_PAYMENT_METHOD);
                  }}
                  buttonStyle={{marginHorizontal: 20, marginVertical: 30}}
                />
              </View>
              <View style={{height:70}}></View>
        </>
      ),
    },
    {
      key: 's2',
      component: (
        <>
        <View
                style={{
                  marginTop: 20,
                  borderRadius: 12,
                  height: 593,
                  backgroundColor: config.colors.white,
                }}>
                <View
                  style={{
                    height: 61,
                    backgroundColor: config.colors.yellowColor,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopRightRadius: 12,
                    borderTopLeftRadius: 12,
                  }}>
                  <Text
                    style={{
                      fontFamily: config.fonts.MediumFont,
                      fontSize: 14,
                      lineHeight: 18,
                      color: config.colors.white,
                    }}>
                    {`★ Most Popular`}
                  </Text>
                </View>

                <Text
                  style={{
                    marginTop: 12,
                    textAlign: 'center',
                    fontFamily: config.fonts.SemiboldFont,
                    fontSize: 20,
                    lineHeight: 24,
                    color: config.colors.blackColor,
                  }}>
                  {`Basic Plan`}
                </Text>

                <Text
                  style={{
                    marginTop: 22,
                    textAlign: 'center',
                    fontFamily: config.fonts.HeadingFont,
                    fontSize: 40,
                    lineHeight: 44,
                    color: config.colors.primaryColor,
                  }}>
                  {`Free`}
                </Text>

                <View
                  style={{
                    // justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={config.images.RIGHT_ICON}
                    style={{
                      height: 15,
                      width: 15,
                      marginRight: 8,
                      resizeMode: 'contain',
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: config.fonts.SemiboldFont,
                      fontSize: 12,
                      lineHeight: 16,
                      color: config.colors.lightGrey2Color,
                    }}>
                    {`Arrangements for transportation during your trip.`}
                  </Text>
                </View>

                <View
                  style={{
                    // justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={config.images.RIGHT_ICON}
                    style={{
                      height: 15,
                      width: 15,
                      marginRight: 8,
                      resizeMode: 'contain',
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: config.fonts.SemiboldFont,
                      fontSize: 12,
                      lineHeight: 16,
                      color: config.colors.lightGrey2Color,
                    }}>
                    {`Provision of travel insurance to cover unexpected events such as trip cancellations.`}
                  </Text>
                </View>

                <View
                  style={{
                    // justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={config.images.RIGHT_ICON}
                    style={{
                      height: 15,
                      width: 15,
                      marginRight: 8,
                      resizeMode: 'contain',
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: config.fonts.SemiboldFont,
                      fontSize: 12,
                      lineHeight: 16,
                      color: config.colors.lightGrey2Color,
                    }}>
                    {`Guidance and support with obtaining necessary visas for international travel.`}
                  </Text>
                </View>

                <View
                  style={{
                    // justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={config.images.RIGHT_ICON}
                    style={{
                      height: 15,
                      width: 15,
                      marginRight: 8,
                      resizeMode: 'contain',
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: config.fonts.SemiboldFont,
                      fontSize: 12,
                      lineHeight: 16,
                      color: config.colors.lightGrey2Color,
                    }}>
                    {`24/7 Customer Support`}
                  </Text>
                </View>

                <View
                  style={{
                    // justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={config.images.RIGHT_ICON}
                    style={{
                      height: 15,
                      width: 15,
                      marginRight: 8,
                      resizeMode: 'contain',
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: config.fonts.SemiboldFont,
                      fontSize: 12,
                      lineHeight: 16,
                      color: config.colors.lightGrey2Color,
                    }}>
                    {`Etiam hendrerit massa`}
                  </Text>
                </View>

                <View
                  style={{
                    // justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={config.images.RIGHT_ICON}
                    style={{
                      height: 15,
                      width: 15,
                      marginRight: 8,
                      resizeMode: 'contain',
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: config.fonts.SemiboldFont,
                      fontSize: 12,
                      lineHeight: 16,
                      color: config.colors.lightGrey2Color,
                    }}>
                    {`Travel Rewards Programs`}
                  </Text>
                </View>

                <View
                  style={{
                    // justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={config.images.RIGHT_ICON}
                    style={{
                      height: 15,
                      width: 15,
                      marginRight: 8,
                      resizeMode: 'contain',
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: config.fonts.SemiboldFont,
                      fontSize: 12,
                      lineHeight: 16,
                      color: config.colors.lightGrey2Color,
                    }}>
                    {`Transportation Services:`}
                  </Text>
                </View>

                <View
                  style={{
                    // justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={config.images.RIGHT_ICON}
                    style={{
                      height: 15,
                      width: 15,
                      marginRight: 8,
                      resizeMode: 'contain',
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: config.fonts.SemiboldFont,
                      fontSize: 12,
                      lineHeight: 16,
                      color: config.colors.lightGrey2Color,
                    }}>
                    {`Hotel Accommodation`}
                  </Text>
                </View>

                <AppButton
                  text={'Choose Plan'}
                  onPress={() => {
                    navigation.navigate(config.routes.CHOOSE_PAYMENT_METHOD);
                  }}
                  buttonStyle={{marginHorizontal: 20, marginVertical: 30}}
                />
              </View>
              <View style={{height:70}}></View>
        </>
      ),
    },
    {
      key: 's3',
      component: (
        <>
          <View
                style={{
                  marginTop: 20,
                  borderRadius: 12,
                  height: 593,
                  backgroundColor: config.colors.white,
                }}>
                <View
                  style={{
                    height: 61,
                    backgroundColor: config.colors.yellowColor,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopRightRadius: 12,
                    borderTopLeftRadius: 12,
                  }}>
                  <Text
                    style={{
                      fontFamily: config.fonts.MediumFont,
                      fontSize: 14,
                      lineHeight: 18,
                      color: config.colors.white,
                    }}>
                    {`★ Most Popular`}
                  </Text>
                </View>

                <Text
                  style={{
                    marginTop: 12,
                    textAlign: 'center',
                    fontFamily: config.fonts.SemiboldFont,
                    fontSize: 20,
                    lineHeight: 24,
                    color: config.colors.blackColor,
                  }}>
                  {`Basic Plan`}
                </Text>

                <Text
                  style={{
                    marginTop: 22,
                    textAlign: 'center',
                    fontFamily: config.fonts.HeadingFont,
                    fontSize: 40,
                    lineHeight: 44,
                    color: config.colors.primaryColor,
                  }}>
                  {`Free`}
                </Text>

                <View
                  style={{
                    // justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={config.images.RIGHT_ICON}
                    style={{
                      height: 15,
                      width: 15,
                      marginRight: 8,
                      resizeMode: 'contain',
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: config.fonts.SemiboldFont,
                      fontSize: 12,
                      lineHeight: 16,
                      color: config.colors.lightGrey2Color,
                    }}>
                    {`Arrangements for transportation during your trip.`}
                  </Text>
                </View>

                <View
                  style={{
                    // justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={config.images.RIGHT_ICON}
                    style={{
                      height: 15,
                      width: 15,
                      marginRight: 8,
                      resizeMode: 'contain',
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: config.fonts.SemiboldFont,
                      fontSize: 12,
                      lineHeight: 16,
                      color: config.colors.lightGrey2Color,
                    }}>
                    {`Provision of travel insurance to cover unexpected events such as trip cancellations.`}
                  </Text>
                </View>

                <View
                  style={{
                    // justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={config.images.RIGHT_ICON}
                    style={{
                      height: 15,
                      width: 15,
                      marginRight: 8,
                      resizeMode: 'contain',
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: config.fonts.SemiboldFont,
                      fontSize: 12,
                      lineHeight: 16,
                      color: config.colors.lightGrey2Color,
                    }}>
                    {`Guidance and support with obtaining necessary visas for international travel.`}
                  </Text>
                </View>

                <View
                  style={{
                    // justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={config.images.RIGHT_ICON}
                    style={{
                      height: 15,
                      width: 15,
                      marginRight: 8,
                      resizeMode: 'contain',
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: config.fonts.SemiboldFont,
                      fontSize: 12,
                      lineHeight: 16,
                      color: config.colors.lightGrey2Color,
                    }}>
                    {`24/7 Customer Support`}
                  </Text>
                </View>

                <View
                  style={{
                    // justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={config.images.RIGHT_ICON}
                    style={{
                      height: 15,
                      width: 15,
                      marginRight: 8,
                      resizeMode: 'contain',
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: config.fonts.SemiboldFont,
                      fontSize: 12,
                      lineHeight: 16,
                      color: config.colors.lightGrey2Color,
                    }}>
                    {`Etiam hendrerit massa`}
                  </Text>
                </View>

                <View
                  style={{
                    // justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={config.images.RIGHT_ICON}
                    style={{
                      height: 15,
                      width: 15,
                      marginRight: 8,
                      resizeMode: 'contain',
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: config.fonts.SemiboldFont,
                      fontSize: 12,
                      lineHeight: 16,
                      color: config.colors.lightGrey2Color,
                    }}>
                    {`Travel Rewards Programs`}
                  </Text>
                </View>

                <View
                  style={{
                    // justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={config.images.RIGHT_ICON}
                    style={{
                      height: 15,
                      width: 15,
                      marginRight: 8,
                      resizeMode: 'contain',
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: config.fonts.SemiboldFont,
                      fontSize: 12,
                      lineHeight: 16,
                      color: config.colors.lightGrey2Color,
                    }}>
                    {`Transportation Services:`}
                  </Text>
                </View>

                <View
                  style={{
                    // justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={config.images.RIGHT_ICON}
                    style={{
                      height: 15,
                      width: 15,
                      marginRight: 8,
                      resizeMode: 'contain',
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: config.fonts.SemiboldFont,
                      fontSize: 12,
                      lineHeight: 16,
                      color: config.colors.lightGrey2Color,
                    }}>
                    {`Hotel Accommodation`}
                  </Text>
                </View>

                <AppButton
                  text={'Choose Plan'}
                  onPress={() => {
                    navigation.navigate(config.routes.CHOOSE_PAYMENT_METHOD);
                  }}
                  buttonStyle={{marginHorizontal: 20, marginVertical: 30}}
                />
              </View>
              <View style={{height:70}}></View>
        </>
      ),
    },
  ];

  const RenderItem = ({item}) => {
    return <View style={styles.slideCss}>{item.component}</View>;
  };

  const onDone = () => {
    Alert.alert('hii');
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: config.colors.primaryColor,
        }}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={config.colors.primaryColor}
          translucent={false}
        />

        <AppHeader
          title={'Subscription Plan'}
          navigation={navigation}
          backgroundColor={config.colors.primaryColor}
          onPress={() => navigation.goBack()}
          tintColor={config.colors.white}
          rightText={'Skip'}
          onRightTextPress={() => {
            callPayStatusApi();
          }}
        />

        <ScrollView contentContainerStyle={{marginHorizontal: 20}}>
          <AppIntroSlider
            // ref={sliderRef}
            data={slides}
            renderItem={RenderItem}
            onDone={onDone}
            showSkipButton={false}
            showNextButton={false}
            showDoneButton={false}
            bottomButton={false}
            // onSlideChange={item => onSlideChange(item)}
            // renderNextButton={ renderSkipButton}
            // renderDoneButton={ RenderDoneButton}
            dotStyle={{
              // bottom: 6,
              // top:38,
              backgroundColor: '#a47acc',
              width: 8,
              height: 8,
            }}
            activeDotStyle={{
              //  marginRight:120,
              // bottom: 6,
              // top:55,
              backgroundColor: config.colors.white,
              height: 8,
              width: 8,
            }}
          />
        </ScrollView>
      </View>
    </>
  );
};

export default SubscriptionPlan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slideCss: {
    flex: 1,
    backgroundColor: config.colors.primaryColor,
  },
});
