import {
  Alert,
  FlatList,
  Image,
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
import config from '../../config';
import AppHeader from '../../components/AppHeader';
import {launchImageLibrary} from 'react-native-image-picker';
import AppButton from '../../components/AppButton';
import {useDispatch, useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import {
  GuideCompleteProfileReducer,
  UserTripMemoriesCountReducer,
} from '../../redux/reducers';
import Toast from 'react-native-toast-message';
import {SagaActions} from '../../redux/sagas/SagaActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import VideoPlayer from 'react-native-video';
import {goToTopNavigation} from '../../components/NavigationRef';

const GuideCompleteProfile = ({navigation}) => {
  const dispatch = useDispatch();
  const userTripMemoriesCountResponse = useSelector(
    UserTripMemoriesCountReducer.selectUserTripMemoriesCountData,
  );
  const guideCompleteProfileResponse = useSelector(
    GuideCompleteProfileReducer.selectGuideCompleteProfileData,
  );
  const guideCompleteProfileErrorResponse = useSelector(
    GuideCompleteProfileReducer.selectGuideCompleteProfileResponse,
  );
  const [filePathArray, setFilePathArray] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [aboutText, setAboutText] = useState('');
  const [numberOfGuest, setNumberOfGuest] = useState('');
  const [activity, setActivity] = useState('');
  const [spatialNeed, setSpatialNeed] = useState([]);
  const [userData, setUserData] = useState('');
  const [memoriesCount, setMemoriesCount] = useState('');
  const [activityDropDown, setActivityDropDown] = useState(false);
  var imgArray = [];
  console.log('filePathArray', filePathArray);
  console.log('spatialNeed', spatialNeed);

  // hooks call
  useEffect(() => {
    if (userTripMemoriesCountResponse != null) {
      if (userTripMemoriesCountResponse?.error == false) {
        setMemoriesCount(userTripMemoriesCountResponse?.results?.tripMemoriesCount);
        console.log(
          'userTripMemoriesCountResponse',
          userTripMemoriesCountResponse,
        );
        dispatch(
          UserTripMemoriesCountReducer.removeUserTripMemoriesCountResponse(),
        );
      }
    }
  }, [userTripMemoriesCountResponse]);
  useEffect(() => {
    if (guideCompleteProfileResponse != null) {
      if (guideCompleteProfileResponse?.error == false) {
        console.log(
          'guideCompleteProfileResponse',
          guideCompleteProfileResponse,
        );
        goToTopNavigation(config.routes.TAB_NAVIGATOR, {userRole: 'Local'});
        dispatch(
          GuideCompleteProfileReducer.removeGuideCompleteProfileResponse(),
        );
      }
    }
  }, [guideCompleteProfileResponse]);

  useEffect(() => {
    if (guideCompleteProfileErrorResponse != null) {
      if (guideCompleteProfileErrorResponse?.error != '') {
        Toast.show({
          type: 'custom',
          text1: guideCompleteProfileErrorResponse?.message,
        });
        dispatch(
          GuideCompleteProfileReducer.removeGuideCompleteProfileResponse(),
        );
      }
    }
  }, [guideCompleteProfileErrorResponse]);

  useFocusEffect(
    useCallback(() => {
      getData();
      callUserTripMemoriesCountApi()
    }, []),
  );

  // function call

  const addSelectSpatialNeed = val => {
    var tempArray = [...spatialNeed];
    var newIndex = tempArray.indexOf(val);
    if (newIndex !== -1) {
      tempArray.splice(newIndex, 1);
    } else {
      tempArray.push(val);
    }

    setSpatialNeed(tempArray);
  };

  const getData = async () => {
    const data = JSON.parse(
      await AsyncStorage.getItem(config.AsyncKeys.USER_DATA),
    );
    setUserData(data);
    console.log('dataa', data?._id);
  };
  const selectImage = () => {
    const options = {
      selectionLimit: 0,
      mediaType: 'mixed',
      includeBase64: false,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const imgArray = response.assets.map(item => ({
          uri: item.uri,
          type: item.type,
          name: item.fileName,
        }));

        // setFilePathArray(prevState => [...prevState, ...imgArray]);
        setFilePathArray(imgArray);
        console.log('imgArray', imgArray);
        console.log('filePathArray', filePathArray);
      }
    });
  };

  // const selectImage = async () => {
  //   try {
  //     const selectedImages = await ImagePicker.openPicker({
  //       multiple: true,
  //       cropping: true,
  //     });

  //     const croppedImages = await Promise.all(
  //       selectedImages.map(async (image) => {
  //         try {
  //           const croppedImage = await ImagePicker.openCropper({
  //             path: image.path,
  //             width: 300, // Adjust the cropping dimensions as needed
  //             height: 300,
  //           });
  //           console.log('cropped');
  //           return {
  //             uri: croppedImage.path,
  //             width: croppedImage.width,
  //             height: croppedImage.height,
  //             mime: croppedImage.mime, // Add mime type to check image type
  //           };
  //         } catch (error) {
  //           console.error(`Error cropping image: ${error.message}`);
  //           return null; // Return null if cropping fails
  //         }
  //       })
  //     );

  //     // Filter out null values
  //     const filteredCroppedImages = croppedImages.filter((image) => image !== null);
  // console.log('filteredCroppedImages',filteredCroppedImages);
  //     setFilePathArray(filteredCroppedImages);
  //   } catch (error) {
  //     if (error.code === 'E_PICKER_CANCELLED') {
  //       // User cancelled the picker
  //       Alert.alert('Picker cancelled');
  //     } else {
  //       // Error while selecting or cropping images
  //       Alert.alert('Error', error.message);
  //     }
  //   }
  // };

  //api call
  const callUserTripMemoriesCountApi = () => {
    dispatch({type:SagaActions.USER_TRIP_MEMORIES_COUNT, payload: ''})
  }
  const callCompleteProfileApi = () => {
    if (aboutText == '') {
      return Toast.show({
        type: 'custom',
        text1: 'Please provide About',
      });
    }

    if (activity == '') {
      return Toast.show({
        type: 'custom',
        text1: 'Please select  activity',
      });
    }
    if (spatialNeed == '') {
      return Toast.show({
        type: 'custom',
        text1: 'Please select spatial Need ',
      });
    }
    if (numberOfGuest == '') {
      return Toast.show({
        type: 'custom',
        text1: 'Please provide no. of guest  ',
      });
    }
    const payload = {
      bio: aboutText,
      activities: activity,
      specialNeed: spatialNeed,
      maxGuest: numberOfGuest,
      tripMemories: filePathArray,
    };
    dispatch({type: SagaActions.GUIDE_COMPLETE_PROFILE, payload});
  };

  const ImageItem = ({item}) => {
    if (item?.type == 'image/jpeg') {
      return (
        <View
          style={{
            flex: 1,
            margin: 5,
            backgroundColor: '#f8f8f8',
            borderRadius: 8,
            overflow: 'hidden',
            alignItems: 'center',
          }}>
          <Image
            source={{uri: item.uri}}
            style={{
              width: '100%',
              height: 150,
            }}
          />
          {/* <Text style={styles.text}>{item.name}</Text> */}
        </View>
      );
    } else if (item?.type == 'video/mp4') {
      return (
        <View
          style={{
            flex: 1,
            margin: 5,
            backgroundColor: '#f8f8f8',
            borderRadius: 8,
            overflow: 'hidden',
            alignItems: 'center',
          }}>
          <VideoPlayer
            style={{
              width: '100%',
              height: 150,
            }}
            source={{uri: item.uri}}
            resizeMode={'cover'}
            paused={!isPlaying}
            controls={true}
            onError={e => console.error('Video error:', e)}
          />
          {/* <Text style={styles.text}>{item.name}</Text> */}
        </View>
      );
    }
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
        title={'Complete your Profile'}
        onPress={() => navigation.goBack()}
        backgroundColor={config.colors.primaryColor}
        tintColor={config.colors.white}
      />

      <View
        style={{
          marginTop: 15,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          flex: 1,
          backgroundColor: config.colors.white,
        }}>
        <ScrollView
          nestedScrollEnabled={true}
          contentContainerStyle={{
            marginHorizontal: 20,
          }}
          showsVerticalScrollIndicator={false}>
          <Text
            style={{
              marginTop: 15,
              fontFamily: config.fonts.SemiboldFont,
              fontSize: 20,
              textAlign: 'center',
              lineHeight: 26,
              color: config.colors.blackColor,
            }}>{`Ahlain,  ${userData?.fullName}`}</Text>

          <Text
            style={{
              marginTop: 35,
              fontFamily: config.fonts.SemiboldFont,
              fontSize: 15,
              lineHeight: 26,
              color: config.colors.blackColor,
            }}>{`About you`}</Text>

          <View
            style={{
              height: 45,
              borderBottomWidth: 0.5,
              blackColor: config.colors.borderColor,
            }}>
            <TextInput
              style={{
                fontFamily: config.fonts.primaryColor,
                fontSize: 13,
                lineHeight: 16,
                color: config.colors.blackColor,
              }}
              placeholder={'Type here....'}
              placeholderTextColor={config.colors.lightGrey2Color}
              keyboardType="default"
              onChangeText={val => setAboutText(val)}
              value={aboutText}
            />
          </View>

          <TouchableOpacity
            style={{
              marginTop: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
            onPress={() => setActivityDropDown(!activityDropDown)}>
            <Text
              style={{
                fontFamily: config.fonts.SemiboldFont,
                fontSize: 15,
                lineHeight: 18,
                color: config.colors.blackColor,
              }}>{`Select Activities`}</Text>
            <Image
              source={config.images.RIGHT_ARROW}
              style={{
                height: 20,
                width: 20,
                resizeMode: 'contain',
                transform: [{rotate: activityDropDown ? '-90deg' : '90deg'}],
              }}
            />
          </TouchableOpacity>
          {/* {activityDropDown && (
            <> */}
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
                  setActivity('Rock Climbing');
                }}>
                <Text
                  style={{
                    marginLeft: 12,
                    fontFamily: config.fonts.MediumFont,
                    fontSize: 14,
                    lineHeight: 16,
                    color: config.colors.blackColor,
                  }}>{`Rock Climbing`}</Text>

                <Image
                  source={
                    activity == 'Rock Climbing'
                      ? config.images.CHECK_ICON
                      : config.images.UNCHECK_ICON
                  }
                  style={{
                    height: activity == 'Rock Climbing' ? 24 : 20,
                    width: activity == 'Rock Climbing' ? 24 : 20,
                    tintColor:
                      activity == 'Rock Climbing'
                        ? config.colors.yellowColor
                        : config.colors.lightGrey2Color,
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
                  setActivity('Hiking');
                }}>
                <Text
                  style={{
                    marginLeft: 12,
                    fontFamily: config.fonts.MediumFont,
                    fontSize: 14,
                    lineHeight: 16,
                    color: config.colors.blackColor,
                  }}>{`Hiking`}</Text>

                <Image
                  source={
                    activity == 'Hiking'
                      ? config.images.CHECK_ICON
                      : config.images.UNCHECK_ICON
                  }
                  style={{
                    height: activity == 'Hiking' ? 24 : 20,
                    width: activity == 'Hiking' ? 24 : 20,
                    tintColor:
                      activity == 'Hiking'
                        ? config.colors.yellowColor
                        : config.colors.lightGrey2Color,
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
                  setActivity('Wildlife Viewing');
                }}>
                <Text
                  style={{
                    marginLeft: 12,
                    fontFamily: config.fonts.MediumFont,
                    fontSize: 14,
                    lineHeight: 16,
                    color: config.colors.blackColor,
                  }}>{`Wildlife Viewing`}</Text>

                <Image
                  source={
                    activity == 'Wildlife Viewing'
                      ? config.images.CHECK_ICON
                      : config.images.UNCHECK_ICON
                  }
                  style={{
                    tintColor:
                      activity == 'Wildlife Viewing'
                        ? config.colors.yellowColor
                        : config.colors.lightGrey2Color,
                    height: activity == 'Wildlife Viewing' ? 24 : 20,
                    width: activity == 'Wildlife Viewing' ? 24 : 20,
                    resizeMode: 'contain',
                    marginRight: 10,
                  }}
                />
              </TouchableOpacity>
            {/* </>
          )} */}

          <Text
            style={{
              marginTop: 20,
              fontFamily: config.fonts.SemiboldFont,
              fontSize: 15,
              lineHeight: 26,
              color: config.colors.blackColor,
            }}>{`Maximum No. of Guests`}</Text>
          <View
            style={{
              height: 45,
              borderBottomWidth: 0.5,
              blackColor: config.colors.borderColor,
            }}>
            <TextInput
              style={{
                fontFamily: config.fonts.primaryColor,
                fontSize: 13,
                lineHeight: 16,
                color: config.colors.blackColor,
              }}
              placeholder={'Enter number here...'}
              placeholderTextColor={config.colors.lightGrey2Color}
              keyboardType="number-pad"
              onChangeText={val => setNumberOfGuest(val)}
              value={numberOfGuest}
            />
          </View>

          <Text
            style={{
              marginTop: 20,
              fontFamily: config.fonts.SemiboldFont,
              fontSize: 15,
              lineHeight: 26,
              color: config.colors.blackColor,
            }}>{`I can assist with`}</Text>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            <TouchableOpacity
              style={{
                marginTop: 8,
                marginVertical: 7,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderWidth: 1,
                marginRight: 8,
                flexDirection: 'row',
                borderColor: config.colors.yellowColor,
                borderRadius: 15,
                backgroundColor: spatialNeed?.includes('Wheelchair')
                  ? config.colors.yellowColor
                  : config.colors.white,
              }}
              onPress={() => {
                addSelectSpatialNeed('Wheelchair');
              }}>
              <Image
                source={config.images.WHEELCHAIR_ICON}
                style={{
                  height: 20,
                  width: 20,
                  resizeMode: 'contain',
                  tintColor: spatialNeed?.includes('Wheelchair')
                    ? config.colors.white
                    : config.colors.yellowColor,
                  marginRight: 7,
                }}
              />

              <Text
                style={{
                  fontFamily: config.fonts.SemiboldFont,
                  fontSize: 12,
                  lineHeight: 18,
                  color: spatialNeed?.includes('Wheelchair')
                    ? config.colors.white
                    : config.colors.yellowColor,
                }}>{`Wheelchair`}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                marginVertical: 7,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderWidth: 1,
                marginRight: 8,
                flexDirection: 'row',
                borderColor: config.colors.yellowColor,
                borderRadius: 15,
                backgroundColor: spatialNeed?.includes('Blind')
                  ? config.colors.yellowColor
                  : config.colors.white,
              }}
              onPress={() => {
                addSelectSpatialNeed('Blind');
              }}>
              <Image
                source={config.images.CLOSE_EYE_ICON}
                style={{
                  height: 20,
                  width: 20,
                  resizeMode: 'contain',
                  tintColor: spatialNeed?.includes('Blind')
                    ? config.colors.white
                    : config.colors.yellowColor,
                  marginRight: 7,
                }}
              />

              <Text
                style={{
                  fontFamily: config.fonts.SemiboldFont,
                  fontSize: 12,
                  lineHeight: 18,
                  color: spatialNeed?.includes('Blind')
                    ? config.colors.white
                    : config.colors.yellowColor,
                }}>{`Blind`}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                marginVertical: 7,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderWidth: 1,
                marginRight: 8,
                flexDirection: 'row',
                borderColor: config.colors.yellowColor,
                borderRadius: 15,
                backgroundColor: spatialNeed?.includes('Any Injuries')
                  ? config.colors.yellowColor
                  : config.colors.white,
              }}
              onPress={() => {
                addSelectSpatialNeed('Any Injuries');
              }}>
              <Image
                source={config.images.BANDAIDS_ICON}
                style={{
                  height: 20,
                  width: 20,
                  resizeMode: 'contain',
                  tintColor: spatialNeed?.includes('Any Injuries')
                    ? config.colors.white
                    : config.colors.yellowColor,
                  marginRight: 7,
                }}
              />

              <Text
                style={{
                  fontFamily: config.fonts.SemiboldFont,
                  fontSize: 12,
                  lineHeight: 18,
                  color: spatialNeed?.includes('Any Injuries')
                    ? config.colors.white
                    : config.colors.yellowColor,
                }}>{`Any Injuries`}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                marginVertical: 7,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderWidth: 1,
                marginRight: 8,
                flexDirection: 'row',
                borderColor: config.colors.yellowColor,
                borderRadius: 15,
                backgroundColor: spatialNeed?.includes('Deaf')
                  ? config.colors.yellowColor
                  : config.colors.white,
              }}
              onPress={() => {
                addSelectSpatialNeed('Deaf');
              }}>
              <Image
                source={config.images.CLOSE_EAR_ICON}
                style={{
                  height: 20,
                  width: 20,
                  resizeMode: 'contain',
                  tintColor: spatialNeed?.includes('Deaf')
                    ? config.colors.white
                    : config.colors.yellowColor,
                  marginRight: 7,
                }}
              />

              <Text
                style={{
                  fontFamily: config.fonts.SemiboldFont,
                  fontSize: 12,
                  lineHeight: 18,
                  color: spatialNeed?.includes('Deaf')
                    ? config.colors.white
                    : config.colors.yellowColor,
                }}>{`Deaf`}</Text>
            </TouchableOpacity>
          </View>

          <Text
            onPress={() => selectImage()}
            style={{
              marginTop: 20,
              fontFamily: config.fonts.HeadingFont,
              fontSize: 18,
              lineHeight: 26,
              color: config.colors.blackColor,
            }}>{`Trip Memories: ${memoriesCount}`}</Text>

          <TouchableOpacity
            style={{
              // height:60,
              marginVertical: 20,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: config.colors.yellowColor,
            }}
            onPress={() => {
              selectImage();
            }}>
            {filePathArray?.length != 0 ? (
              <FlatList
                data={filePathArray?.slice(0, 50)}
                renderItem={({item}) => <ImageItem item={item} />}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                columnWrapperStyle={styles.row}
              />
            ) : (
              <Text
                style={{
                  marginVertical: 20,
                  fontFamily: config.fonts.PrimaryFont,
                  fontSize: 12,
                  lineHeight: 14,
                  textAlign: 'center',
                  color: config.colors.greyColor,
                }}>
                {' '}
                {`Upload more trip memories (min. 2)`}
              </Text>
            )}
          </TouchableOpacity>

          <AppButton
            text={'Confirm'}
            onPress={() => {
              callCompleteProfileApi();
            }}
            buttonStyle={{
              // marginHorizontal:20,
              marginVertical: 20,
            }}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default GuideCompleteProfile;

const styles = StyleSheet.create({});
