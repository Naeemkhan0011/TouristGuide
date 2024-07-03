import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  I18nManager,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  Modal,
  Platform,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import config from '../../config';
import AppButton from '../../components/AppButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

const Onboarding = ({navigation}) => {
  const sliderRef = useRef(null);
  const [selectUserModal, setSelectUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const onSlideChange = index => {
    setCurrentSlideIndex(index);
    // console.log(`Current slide index: ${index}`);
  };

  const handleJumpToLastSlide = () => {
    sliderRef.current.goToSlide(slides.length - 1, true); // Jump to the last slide
  };

  const slides = [
    {
      key: 's1',
      component: (
        <>
          <View style={{alignItems: 'center', flex: 1}}>
            <View
              style={{
                marginTop: 10,
                height: 60,
                width: '90%',
                alignItems: 'flex-end',
                // flexDirection:'row',
                // justifyContent:'space-between'
              }}>
              {/* <Image
        source={config.images.BACK_ARROW}
        style={{height:24,width:24,resizeMode:'contain'}}
        /> */}
              <Text
              onPress={() => {
               handleJumpToLastSlide()
              }}
                style={{
                  marginTop: Platform.OS == 'android' ? 0 : 60,
                  fontFamily: config.fonts.SemiboldFont,
                  fontSize: 16,
                  lineHeight: 18,
                  color: config.colors.blackColor,
                }}>{`Skip`}</Text>
            </View>
            <Image
              style={{
                marginTop: 80,
                height: 323,
                width: 323,
                resizeMode: 'cover',
              }}
              source={config.images.ONBOARDING1}></Image>
            <View
              style={{
                backgroundColor: config.colors.white,
                position: 'absolute',
                bottom: 150,
                width: config.constants.Width,
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '90%',
                  marginTop: 20,
                  // alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: config.fonts.HeadingFont,
                    fontSize: 24,
                    color: config.colors.blackColor,
                    lineHeight: 32,
                    marginTop: 15,
                    // textAlign: 'center',
                  }}>
                  {'Experience the World Through Our Eyes '}
                </Text>
                <Text
                  style={{
                    fontFamily: config.fonts.MediumFont,
                    fontSize: config.constants.PrimaryFontSize,
                    color: config.colors.lightGreenColor,
                    lineHeight: 20,
                    marginTop: 15,
                    // textAlign: 'center',
                  }}>
                  {
                    'Lorem ipsum dolor sit amet consectetur. Mi ultricies ultrices fermentum a. Duis neque lectus pharetra ac sed lorem.'
                  }
                </Text>
              </View>
            </View>
          </View>
        </>
      ),
    },
    {
      key: 's2',
      component: (
        <>
          <View style={{alignItems: 'center', flex: 1}}>
            <View
              style={{
                marginTop: 10,
                height: 60,
                width: '90%',
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
              {/* <Image
        source={config.images.BACK_ARROW}
        style={{height:24,width:24,resizeMode:'contain'}}
        /> */}
              <Text
                style={{
                  fontFamily: config.fonts.SemiboldFont,
                  fontSize: 16,
                  lineHeight: 18,
                  color: config.colors.blackColor,
                }}
                onPress={() => {
                  handleJumpToLastSlide()
                  }}>{`Skip`}</Text>
            </View>
            <Image
              style={{
                marginTop: 80,
                height: 323,
                width: 323,
                resizeMode: 'cover',
              }}
              source={config.images.ONBOARDING2}></Image>
            <View
              style={{
                backgroundColor: config.colors.white,
                position: 'absolute',
                bottom: 150,
                width: config.constants.Width,
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '90%',
                  marginTop: 20,
                }}>
                <Text
                  style={{
                    fontFamily: config.fonts.HeadingFont,
                    fontSize: 24,
                    color: config.colors.blackColor,
                    lineHeight: 32,
                    marginTop: 15,
                    // textAlign: 'center',
                  }}>
                  {'Lead the Way with Our \nExpert Guides '}
                </Text>
                <Text
                  style={{
                    fontFamily: config.fonts.MediumFont,
                    fontSize: config.constants.PrimaryFontSize,
                    color: config.colors.lightGreenColor,
                    lineHeight: 20,
                    marginTop: 15,
                    // textAlign: 'center',
                  }}>
                  {
                    'Lorem ipsum dolor sit amet consectetur. Mi ultricies ultrices fermentum a. Duis neque lectus pharetra ac sed lorem.'
                  }
                </Text>
              </View>
            </View>
          </View>
        </>
      ),
    },
    {
      key: 's3',
      component: (
        <>
          <View style={{alignItems: 'center', flex: 1}}>
            <Image
              style={{
                marginTop: 80,
                height: 323,
                width: 323,
                resizeMode: 'cover',
              }}
              source={config.images.ONBOARDING3}></Image>
            <View
              style={{
                backgroundColor: config.colors.white,
                position: 'absolute',
                bottom: 150,
                width: config.constants.Width,
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '90%',
                  marginTop: 20,
                }}>
                <Text
                  style={{
                    fontFamily: config.fonts.HeadingFont,
                    fontSize: 24,
                    color: config.colors.blackColor,
                    lineHeight: 32,
                    marginTop: 15,
                    // textAlign: 'center',
                  }}>
                  {'Join Us on a Voyage of \nWonder and Excitement '}
                </Text>
                <Text
                  style={{
                    fontFamily: config.fonts.MediumFont,
                    fontSize: config.constants.PrimaryFontSize,
                    color: config.colors.lightGreenColor,
                    lineHeight: 20,
                    marginTop: 15,
                    // textAlign: 'center',
                  }}>
                  {
                    'Lorem ipsum dolor sit amet consectetur. Mi ultricies ultrices fermentum a. Duis neque lectus pharetra ac sed lorem.'
                  }
                </Text>
              </View>
            </View>
          </View>
        </>
      ),
    },
  ];

  const onDone = () => {
    setSelectUserModal(true);
  };
 

  const RenderDoneButton = () => {
    return (
      <View style={{width: '90%', bottom: 16}}>
        <AnimatedCircularProgress
          rotation={90 -90}
          size={60}
          width={5}
          fill={100}
          tintColor={config.colors.yellowColor}
          onAnimationComplete={() => console.log('onAnimationComplete')}
          backgroundColor={config.colors.lightYellowColor}
        >
          {
            (fill) => (
              <View
              style={{
                height: 36,
                width: 36,
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: config.colors.yellowColor,
              }}>
              <Image
                source={config.images.RIGHT_ARROW}
                style={{
                  width: 10,
                  height: 16,
                  resizeMode: 'cover',
                  tintColor: config.colors.white,
                }}
              />
            </View>
            )
          }
        </AnimatedCircularProgress>
       
      </View>
    );
  };
  const renderSkipButton = () => {
    return (
      <View style={{width: '90%', bottom: 16}}>
        <AnimatedCircularProgress
        rotation={90 -90}
          size={60}
          width={5}
          fill={currentSlideIndex < 1 ? 35 : currentSlideIndex == 1 && 65}
          tintColor={config.colors.yellowColor}
          onAnimationComplete={() => console.log('onAnimationComplete')}
          backgroundColor={config.colors.lightYellowColor}
        >
          {
            (fill) => (
              <View
              style={{
                height: 36,
                width: 36,
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: config.colors.yellowColor,
              }}>
              <Image
                source={config.images.RIGHT_ARROW}
                style={{
                  width: 10,
                  height: 16,
                  resizeMode: 'cover',
                  tintColor: config.colors.white,
                }}
              />
            </View>
            )
          }
        </AnimatedCircularProgress>
       
      </View>
    );
  };
  const RenderItem = ({item}) => {
    return <View style={styles.slideCss}>{item.component}</View>;
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
                      selectedUser == 'Guest'
                        ? config.colors.primaryColor
                        : config.colors.lightGreyColor,
                    backgroundColor: config.colors.white,
                  }}
                  onPress={() => {
                    setSelectedUser('Guest');
                    AsyncStorage.setItem(
                      config.AsyncKeys.USER_ROLE,
                      JSON.stringify('Guest'),
                    );
                  }}>
                  <Image
                    source={
                      selectedUser == 'Guest'
                        ? config.images.CHECK_ICON
                        : config.images.UNCHECK_ICON
                    }
                    style={{
                      height: 20,
                      width: 20,
                      resizeMode: 'cover',
                      marginTop: 15,
                      tintColor:
                        selectedUser == 'Guest'
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
                      selectedUser == 'Local'
                        ? config.colors.primaryColor
                        : config.colors.lightGreyColor,
                    backgroundColor: config.colors.white,
                  }}
                  onPress={() => {
                    setSelectedUser('Local');
                    AsyncStorage.setItem(
                      config.AsyncKeys.USER_ROLE,
                      JSON.stringify('Local'),
                    );
                  }}>
                  <Image
                    source={
                      selectedUser == 'Local'
                        ? config.images.CHECK_ICON
                        : config.images.UNCHECK_ICON
                    }
                    style={{
                      height: 20,
                      width: 20,
                      resizeMode: 'cover',
                      marginTop: 15,
                      tintColor:
                        selectedUser == 'Local'
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
                      navigation.navigate(config.routes.GUIDE_LOGIN_SCREEN);
                    } else {
                      setSelectUserModal(false);
                      navigation.navigate(config.routes.USER_LOGIN_SCREEN);
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
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={config.colors.white}
        translucent={false}
      />

      <AppIntroSlider
      ref={sliderRef}
        data={slides}
        renderItem={RenderItem}
        onDone={onDone}
        
        showSkipButton={false}
        showNextButton={true}
        showDoneButton={true}
        bottomButton={false}
        onSlideChange={item => onSlideChange(item)}
        renderNextButton={ renderSkipButton}
        renderDoneButton={ RenderDoneButton}
        dotStyle={{
          bottom: 16,
          backgroundColor: config.colors.lightYellowColor,
          width: 8,
          height: 8,
        }}
        activeDotStyle={{
          //  marginRight:120,
          bottom: 16,
          backgroundColor: config.colors.yellowColor,
          height: 8,
          width: 24,
        }}
      />
      {SelectUserModalView()}
    </>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slideCss: {
    flex: 1,
    backgroundColor: config.colors.white,
  },
  logoImg: {
    alignSelf: 'center',
    height: 51,
    width: 130,
    marginTop: 20,
  },
  nextText: {
    fontSize: 16,
    // textAlign: 'center',
    color: config.colors.white,
    fontFamily: config.fonts.Poppins_Medium,
  },
  introImageStyle: {
    width: 268,
    height: 264,
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 0.5,
  },
  introTextStyle: {
    // textAlign: 'center',
    fontSize: 22,
    lineHeight: 25,
    color: '#000',
    fontFamily: config.fonts.Poppins_SemiBold,
  },
  text1: {
    color: config.colors.fullBlack,
    // textAlign: 'center',
    fontSize: 18,
    lineHeight: 24,
    marginTop: 15,
    fontFamily: config.fonts.Poppins_Regular,
  },
  buttonCircle: {
    width: 180,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 5,
    backgroundColor: config.colors.buttonColor,
    alignSelf: 'center',
    // marginTop:10
  },
  next_icon: {
    marginHorizontal: 5,
    height: 8,
    width: 23,
    transform: [{rotate: I18nManager.isRTL ? '180deg' : '0deg'}],
    // marginTop:5
  },
  skipText: {
    color: config.colors.fullBlack,
    fontSize: 16,
    // textAlign: 'center',
    fontFamily: config.fonts.Poppins_Medium,
  },
  getstartText: {
    color: config.colors.white,
    fontSize: 16,
    // textAlign: 'center',
  },
  firstcomponentcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  findListener_style: {
    fontFamily: config.fonts.HeadingFont,
    fontSize: 24,
    color: config.colors.blackColor,
    lineHeight: 32,
    // textAlign: 'center',
  },
  stepOne_style: {
    backgroundColor: config.colors.whiteSmokeColor,
    height: 54,
    width: 48,
    marginTop: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: config.colors.blackColor,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  onetet_style: {
    fontFamily: config.fonts.MediumFont,
    fontSize: config.constants.HeadingFontSize,
    color: config.colors.lightBlackColor,
    lineHeight: 24,
  },
  selectListener_style: {
    fontFamily: config.fonts.HeadingFont,
    fontSize: 24,
    color: config.colors.blackColor,
    lineHeight: 32,
    marginTop: 15,
    // textAlign: 'center',
  },
  browseListener_style: {
    fontFamily: config.fonts.MediumFont,
    fontSize: config.constants.PrimaryFontSize,
    color: config.colors.blackColor,
    lineHeight: 20,
    marginTop: 15,
    // textAlign: 'center',
  },
  setptwo_style: {
    backgroundColor: config.colors.whiteSmokeColor,
    height: 54,
    width: 48,
    marginTop: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: config.colors.blackColor,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  steptwo_heading: {
    fontFamily: config.fonts.HeadingFont,
    fontSize: 24,
    color: config.colors.blackColor,
    lineHeight: 32,
    marginTop: 15,
    // textAlign: 'center',
  },
  steptwo_primerytet: {
    fontFamily: config.fonts.MediumFont,
    fontSize: config.constants.PrimaryFontSize,
    color: config.colors.blackColor,
    lineHeight: 20,
    marginTop: 15,
    // textAlign: 'center',
  },
  two_style: {
    fontFamily: config.fonts.MediumFont,
    fontSize: config.constants.HeadingFontSize,
    color: config.colors.lightBlackColor,
    lineHeight: 24,
  },
  stepthree_container: {
    backgroundColor: config.colors.whiteSmokeColor,
    height: 54,
    width: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: config.colors.lightGreenColor,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    marginTop: 15,
  },
});
