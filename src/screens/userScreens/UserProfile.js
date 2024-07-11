import {
  Image,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import config from '../../config';
import AppHeader from '../../components/AppHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {goToTopNavigation} from '../../components/NavigationRef';
import { UserGetProfileReducer, UserHomeScreenReducer } from '../../redux/reducers';
import { useSelector } from 'react-redux';
import AppButton from '../../components/AppButton';
import Toast from 'react-native-toast-message';

const UserProfile = ({navigation}) => {
  const [showSuccessModal ,setShowSuccessModal] = useState(false);
  const userGetProfileResponse = useSelector(
    UserGetProfileReducer.selectUserGetProfileData,
  );
  const handleLogout = () => {
    setShowSuccessModal(false)
   const subscribe =  setTimeout(() => {
    AsyncStorage.removeItem(config.AsyncKeys.USER_LOGGED_IN);
    AsyncStorage.removeItem(config.AsyncKeys.USER_DATA);
    AsyncStorage.removeItem(config.AsyncKeys.USER_TOKEN);

    goToTopNavigation(config.routes.ONBOARDING,{from:'logout'});
  }, 100);

  return ()=> clearTimeout(subscribe)
  };



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
                source={config.images.LOGOUT_IMG}
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
                }}>{`Logout`}</Text>
              <Text
                style={{
                  marginTop: 15,
                  textAlign: 'center',
                  fontFamily: config.fonts.MediumFont,
                  fontSize: 16,
                  lineHeight: 18,
                  color: config.colors.lightGrey2Color,
                }}>{` Are you sure you want to logout?`}</Text>
            </ScrollView>

            <View style={{
              paddingHorizontal:20,
              marginVertical:30,
              flexDirection:'row',
              justifyContent:'space-between'
            }}>
              <TouchableOpacity style={{
                width: '45%',
                height:44,
                justifyContent:'center',
                alignItems:'center',
                borderWidth:1,
                borderColor: config.colors.yellowColor,
                borderRadius:14
              }} onPress={() => {
                setShowSuccessModal(false);
              }}>
                <Text style={{
                  fontFamily:config.fonts.HeadingFont,
                  fontSize:16,
                  lineHeight:24,
                  color:config.colors.yellowColor
                }}>{`No`}</Text>
              </TouchableOpacity>
                <TouchableOpacity style={{
                width: '45%',
                height:44,
                justifyContent:'center',
                alignItems:'center',
                backgroundColor: config.colors.yellowColor,
                borderRadius:14
              }} onPress={() => {
                handleLogout()
              }}>
                <Text style={{
                  fontFamily:config.fonts.HeadingFont,
                  fontSize:16,
                  lineHeight:24,
                  color:config.colors.white
                }}>{`Yes`}</Text>
              </TouchableOpacity>
            </View>
            {/* <AppButton
              text={'Back to Home'}
              onPress={() => {
                setShowSuccessModal(false);
              }}
              buttonStyle={{marginVertical: 20, marginHorizontal: 20}}
            /> */}
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
        navigation={navigation}
        title={'My Account'}
        tintColor={config.colors.white}
        backgroundColor={config.colors.primaryColor}
        onPress={() => navigation.goBack()}
      />

      <View
        style={{
          flex: 1,
          backgroundColor: config.colors.white,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{marginHorizontal: 20}}>
          <View
            style={{
              marginTop: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={config.images.DUMMY_PROFILE}
              style={{
                height: 90,
                width: 90,
                borderRadius: 45,
                resizeMode: 'contain',
              backgroundColor:config.colors.whiteSmokeColor

              }}/>
            <Text
              style={{
                marginTop: 10,
                fontFamily: config.fonts.SemiboldFont,
                fontSize: 20,
                lineHeight: 24,
                color: config.colors.black,
              }}>{`${userGetProfileResponse?.results?.user?.fullName}`}</Text>
            <Text
              style={{
                fontFamily: config.fonts.MediumFont,
                fontSize: 15,
                lineHeight: 24,
                color: config.colors.lightGrey2Color,
              }}>{`${userGetProfileResponse?.results?.user?.email}`}</Text>
          </View>

          <Text
            style={{
              marginTop: 50,
              fontFamily: config.fonts.HeadingFont,
              fontSize: 14,
              lineHeight: 21,
              color: config.colors.black,
            }}>{`Profile`}</Text>

          <View
            style={{
              marginTop: 20,
              borderRadius: 10,
              paddingVertical: 10,
              paddingHorizontal: 10,
              backgroundColor: config.colors.whiteSmokeColor,
            }}>
            <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => {
             navigation.navigate(config.routes.USER_EDIT_PROFILE)
            }}>
              <Image
                source={config.images.USER_ICON}
                style={{
                  height: 19,
                  width: 19,
                  // marginRight:7,
                  resizeMode: 'contain',
                  tintColor: config.colors.yellowColor,
                }}
              />
              <Text
                style={{
                  fontFamily: config.fonts.primaryColor,
                  fontSize: 15,
                  lineHeight: 18,
                  color: config.colors.lightGrey2Color,
                }}>
                {`  Edit Profile`}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{marginTop: 15, flexDirection: 'row'}} onPress={() => {
             navigation.navigate(config.routes.MY_TRIP)
            }}>
              <Image
                source={config.images.TRIP_ICON}
                style={{
                  height: 19,
                  width: 19,
                  // marginRight:7,
                  resizeMode: 'contain',
                  tintColor: config.colors.yellowColor,
                }}
              />
              <Text
                style={{
                  fontFamily: config.fonts.primaryColor,
                  fontSize: 15,
                  lineHeight: 18,
                  color: config.colors.lightGrey2Color,
                }}>
                {`  My Trips`}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{marginTop: 15, flexDirection: 'row'}} onPress={() => {
              Toast.show({
                 type: 'custom',
                text1:'Coming Soon'
              })
            }}>
              <Image
                source={config.images.BACK_ARROW}
                style={{
                  height: 19,
                  width: 19,
                  // marginRight:7,
                  resizeMode: 'contain',
                  transform: [{rotate: '180deg'}],
                  tintColor: config.colors.yellowColor,
                }}
              />
              <Text
                style={{
                  fontFamily: config.fonts.primaryColor,
                  fontSize: 15,
                  lineHeight: 18,
                  color: config.colors.lightGrey2Color,
                }}>
                {`  Switch to Local`}
              </Text>
            </TouchableOpacity>
          </View>

          <Text
            style={{
              marginVertical: 18,
              fontFamily: config.fonts.HeadingFont,
              fontSize: 14,
              lineHeight: 21,
              color: config.colors.black,
            }}>{`Settings`}</Text>

          <View
            style={{
              borderRadius: 10,
              paddingVertical: 10,
              paddingHorizontal: 10,
              backgroundColor: config.colors.whiteSmokeColor,
            }}>
            <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => {
              Toast.show({
                 type: 'custom',
                text1:'Coming Soon'
              })
            }}>
              <Image
                source={config.images.GLOBE_ICON}
                style={{
                  height: 19,
                  width: 19,
                  // marginRight:7,
                  resizeMode: 'contain',
                  tintColor: config.colors.yellowColor,
                }}
              />
              <Text
                style={{
                  fontFamily: config.fonts.primaryColor,
                  fontSize: 15,
                  lineHeight: 18,
                  color: config.colors.lightGrey2Color,
                }}>
                {`  Language`}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{marginTop: 15, flexDirection: 'row'}} onPress={() => {
              Toast.show({
                 type: 'custom',
                text1:'Coming Soon'
              })
            }}>
              <Image
                source={config.images.UPDATE_PASSWORD}
                style={{
                  height: 19,
                  width: 19,
                  // marginRight:7,
                  resizeMode: 'contain',
                  tintColor: config.colors.yellowColor,
                }}
              />
              <Text
                style={{
                  fontFamily: config.fonts.primaryColor,
                  fontSize: 15,
                  lineHeight: 18,
                  color: config.colors.lightGrey2Color,
                }}>
                {`  Update Password`}
              </Text>
            </TouchableOpacity>
          </View>

          <Text
            style={{
              marginTop: 18,
              fontFamily: config.fonts.HeadingFont,
              fontSize: 14,
              lineHeight: 21,
              color: config.colors.black,
            }}>{`Other Information`}</Text>

          <View
            style={{
              marginVertical:18,
              borderRadius: 10,
              paddingVertical: 10,
              paddingHorizontal: 10,
              backgroundColor: config.colors.whiteSmokeColor,
            }}>
            <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => {
              Toast.show({
                 type: 'custom',
                text1:'Coming Soon'
              })
            }}>
              <Image
                source={config.images.GLOBE_ICON}
                style={{
                  height: 19,
                  width: 19,
                  // marginRight:7,
                  resizeMode: 'contain',
                  tintColor: config.colors.yellowColor,
                }}
              />
              <Text
                style={{
                  fontFamily: config.fonts.primaryColor,
                  fontSize: 15,
                  lineHeight: 18,
                  color: config.colors.lightGrey2Color,
                }}>
                {`  About Us`}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{marginTop: 15, flexDirection: 'row'}} onPress={() => {
              Toast.show({
                 type: 'custom',
                text1:'Coming Soon'
              })
            }}>
              <Image
                source={config.images.T_AND_C_ICON}
                style={{
                  height: 19,
                  width: 19,
                  // marginRight:7,
                  resizeMode: 'contain',
                  tintColor: config.colors.yellowColor,
                }}
              />
              <Text
                style={{
                  fontFamily: config.fonts.primaryColor,
                  fontSize: 15,
                  lineHeight: 18,
                  color: config.colors.lightGrey2Color,
                }}>
                {`  Term & Conditions`}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{marginTop: 15,flexDirection: 'row'}} onPress={() => {
              Toast.show({
                 type: 'custom',
                text1:'Coming Soon'
              })
            }}>
              <Image
                source={config.images.PRIVACY_ICON}
                style={{
                  height: 19,
                  width: 19,
                  // marginRight:7,
                  resizeMode: 'contain',
                  tintColor: config.colors.yellowColor,
                }}
              />
              <Text
                style={{
                  fontFamily: config.fonts.primaryColor,
                  fontSize: 15,
                  lineHeight: 18,
                  color: config.colors.lightGrey2Color,
                }}>
                {`  Privacy & Policy`}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{marginTop: 15, flexDirection: 'row'}} onPress={() => {
              Toast.show({
                 type: 'custom',
                text1:'Coming Soon'
              })
            }}>
              <Image
                source={config.images.SUPPORT_ICON}
                style={{
                  height: 19,
                  width: 19,
                  // marginRight:7,
                  resizeMode: 'contain',
                  tintColor: config.colors.yellowColor,
                }}
              />
              <Text
                style={{
                  fontFamily: config.fonts.primaryColor,
                  fontSize: 15,
                  lineHeight: 18,
                  color: config.colors.lightGrey2Color,
                }}>
                {`  Help & Support`}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
            style={{marginTop: 15, flexDirection: 'row'}} onPress={() => {
              // handleLogout()
              setShowSuccessModal(true)
            }}>
              <Image
                source={config.images.LOGOUT_ICON}
                style={{
                  height: 19,
                  width: 19,
                  // marginRight:7,
                  resizeMode: 'contain',
                  tintColor: config.colors.yellowColor,
                }}
              />
              <Text
                style={{
                  fontFamily: config.fonts.primaryColor,
                  fontSize: 15,
                  lineHeight: 18,
                  color: config.colors.lightGrey2Color,
                }}>
                {`  Logout`}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      {renderSuccessModal()}
    </SafeAreaView>
  );
};

export default UserProfile;

const styles = StyleSheet.create({});
