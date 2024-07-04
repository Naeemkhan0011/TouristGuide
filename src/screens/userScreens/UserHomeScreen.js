import {
  Animated,
  Image,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import config from "../../config";
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from "react-redux";
import {
  UserFilterApiReducer,
  UserGetProfileReducer,
  UserHomeScreenReducer,
  UserOffRoadTripReducer,
  UserRoadTripReducer,
} from "../../redux/reducers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { SagaActions } from "../../redux/sagas/SagaActions";
import Slider from "@react-native-community/slider";
import { debounce } from "lodash";
import Toast from "react-native-toast-message";

const UserHomeScreen = () => {
  const dispatch = useDispatch();
  const [isEnabled, setEnabled] = useState(false);
  const [animatedValue] = useState(new Animated.Value(isEnabled ? 1 : 0));
  const userFilterApiResponse = useSelector(
    UserFilterApiReducer.selectUserFilterApiData
  );
  const userFilterApiErrorResponse = useSelector(
    UserFilterApiReducer.selectUserFilterApiResponse
  );
  const userHomeScreenResponse = useSelector(
    UserHomeScreenReducer.selectUserHomeScreenData
  );
  const userRoadTripResponse = useSelector(
    UserRoadTripReducer.selectUserRoadTripData
  );
  const userOffRoadTripResponse = useSelector(
    UserOffRoadTripReducer.selectUserOffRoadTripData
  );
  const userGetProfileResponse = useSelector(
    UserGetProfileReducer.selectUserGetProfileData
  );
  const userGetProfileErrorResponse = useSelector(
    UserGetProfileReducer.selectUserGetProfileResponse
  );
  const [search, setSearch] = useState("");
  const [trip, setTrip] = useState("Popular Cities");
  const [userId, setUserId] = useState("");
  const [sliderValue, setSliderValue] = useState(55);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [gender, setGender] = useState("Male");
  const [selectActivity, setSelectActivity] = useState("All");
  const [selectSpatialCare, setSelectSpatialCare] = useState("");
  const [renderSwitch, setRenderSwitch] = useState(true);

  // hooks call

  useEffect(() => {
    if (userFilterApiResponse != null) {
      if (userFilterApiResponse?.error == false) {
        setFilterModalVisible(false);
        console.log("userFilterApiResponse", userFilterApiResponse);
      }
    }
  }, [userFilterApiResponse]);

  useEffect(() => {
    if (userFilterApiErrorResponse != null) {
      if (userFilterApiErrorResponse?.error != "") {
        Toast.show({
          type: "custom",
          text1: userFilterApiErrorResponse?.message,
        });
        dispatch(UserFilterApiReducer.removeUserFilterApiResponse());
      }
    }
  }, [userFilterApiErrorResponse]);

  useEffect(() => {
    if (userHomeScreenResponse != null) {
      if (userHomeScreenResponse?.error == false) {
        console.log("userHomeScreenResponse", userHomeScreenResponse);
      }
    }
  }, [userHomeScreenResponse]);

  useEffect(() => {
    if (userRoadTripResponse != null) {
      if (userRoadTripResponse?.error == false) {
        console.log("userRoadTripResponse", userRoadTripResponse);
      }
    }
  }, [userRoadTripResponse]);

  useEffect(() => {
    if (userOffRoadTripResponse != null) {
      if (userOffRoadTripResponse?.error == false) {
        console.log("userOffRoadTripResponse", userOffRoadTripResponse);
      }
    }
  }, [userOffRoadTripResponse]);

  useEffect(() => {
    if (userGetProfileResponse != null) {
      if (userGetProfileResponse?.error == false) {
        callUserHomeScreenApi(userGetProfileResponse?.results?.user?._id);
        setUserId(userGetProfileResponse?.results?.user?._id);
        console.log("userGetProfileResponse", userGetProfileResponse);
      }
    }
  }, [userGetProfileResponse]);

  useEffect(() => {
    if (userGetProfileErrorResponse != null) {
      if (userGetProfileErrorResponse?.error != "") {
        Toast.show({
          type: "custom",
          text1: userGetProfileErrorResponse?.message,
        });
      }
    }
  }, [userGetProfileErrorResponse]);

  useEffect(() => {
		// Update the animated value when the value prop changes
		Animated.timing(animatedValue, {
			toValue: isEnabled ? 1 : 0,
			duration: 300, // Adjust the animation duration
			useNativeDriver: false,
		}).start();
	}, [isEnabled]);

	const translateX = animatedValue.interpolate({
		inputRange: [0, 1],
		outputRange: [4, 28], // Adjust the distance of the switch head
	});

	const toggleSwitch = () => {
		setEnabled(!isEnabled);
	};

  useFocusEffect(
    useCallback(() => {
      callGetUserApi();
      callRoadTripApi();
      callOffRoadTripApi();
    }, [])
  );

  // function call

  const defaultStyles = {
    bgGradientColors: [config.colors.yellowColor, config.colors.yellowColor],
    headGradientColors: [config.colors.white, config.colors.white],
  };
  
  const activeStyles = {
    bgGradientColors: [config.colors.yellowColor, config.colors.yellowColor],
    headGradientColors: [config.colors.greyColor, config.colors.greyColor],
  };

  const debouncedFetchSuggestions = useCallback(
    debounce(async (query) => {
      if (query) {
        const result = await callUserHomeScreenApi(query);
        const result1 = await callRoadTripApi(query);
        const result2 = await callOffRoadTripApi(query);
        console.log("result,result1,result2", result, result1, result2);
      }
    }, 300),
    []
  );

  // api call

  const callUserFilterApi = () => {
    if (gender == "") {
      return Toast.show({
        type: "custom",
        text1: "Please Select Gender",
      });
    }

    if (selectActivity == "") {
      return Toast.show({
        type: "custom",
        text1: "Please Select Activity",
      });
    }

    if (selectSpatialCare == "") {
      return Toast.show({
        type: "custom",
        text1: "Please Select SpatialCare",
      });
    }

    const payload = {
      gender: gender,
      activities: selectActivity,
      isLicence: renderSwitch,
      specialNeed: selectSpatialCare,
      minPrice: 0,
      maxprice: sliderValue,
      //   gender:"female",
      // activities:"Off-Road Trip",
      // specialNeed:"chairs",
      //  isLicence:true,
      //  minPrice:0,
      //  maxprice:99
    };
    dispatch({ type: SagaActions.USER_FILTER_API, payload });
  };

  const callGetUserApi = () => {
    dispatch({ type: SagaActions.USER_GET_PROFILE, payload: "" });
  };

  const callUserHomeScreenApi = () => {
    const payload = {
      search: "",
    };
    dispatch({ type: SagaActions.USER_HOME_SCREEN, payload });
  };

  const callRoadTripApi = (val) => {
    const payload = {
      search: val,
    };
    dispatch({ type: SagaActions.USER_ROAD_TRIP, payload });
  };

  const callOffRoadTripApi = (val) => {
    const payload = {
      search: val,
    };
    dispatch({ type: SagaActions.USER_OFF_ROAD_TRIP, payload });
  };

  const popularCity = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginHorizontal: 20,
        }}
      >
        {userHomeScreenResponse?.results?.popularCities?.map((item, index) => {
          return (
            <View
              style={{
                marginTop: 20,
              }}
              key={index}
            >
              <Image
                source={{ uri: item?.image }}
                style={{
                  borderRadius: 10,
                  height: 231,
                  width: "100%",
                  resizeMode: "cover",
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 15,
                }}
              >
                <Image
                  source={config.images.LOCATION}
                  style={{ height: 20, width: 20, resizeMode: "contain" }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: config.fonts.HeadingFont,
                    lineHeight: 16,
                    color: config.colors.blackColor,
                  }}
                >
                  {item?.cityName} {item?.countryName}
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: config.fonts.primaryColor,
                  fontSize: 10,
                  lineHeight: 14,
                  color: config.colors.lightGrey2Color,
                }}
              >{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. `}</Text>

              <View
                style={{
                  marginTop: 10,
                  height: 45,
                  marginHorizontal: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  style={{
                    height: 25,
                    width: "30%",
                    flexDirection: "row",
                    // justifyContent:'space-between',
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={config.images.CAMPING_ICON}
                    style={{
                      height: 20,
                      width: 20,
                      marginTop: 6,
                      resizeMode: "contain",
                    }}
                  />
                  <Text
                    style={{
                      marginTop: 7,
                      marginLeft: 7,
                      fontSize: 13,
                      fontFamily: config.fonts.MediumFont,
                      lineHeight: 14,
                      color: config.colors.blackColor,
                    }}
                  >{`Camping`}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    height: 25,
                    flexDirection: "row",
                    width: "30%",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={config.images.HIKING_ICON}
                    style={{
                      height: 20,
                      width: 20,
                      marginTop: 6,
                      resizeMode: "contain",
                    }}
                  />
                  <Text
                    style={{
                      marginTop: 7,
                      marginLeft: 7,
                      fontSize: 13,
                      fontFamily: config.fonts.MediumFont,
                      lineHeight: 14,
                      color: config.colors.blackColor,
                    }}
                  >{`Hiking`}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    height: 25,
                    width: "30%",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={config.images.TREKKING_ICON}
                    style={{
                      height: 20,
                      width: 20,
                      marginTop: 6,
                      resizeMode: "contain",
                    }}
                  />
                  <Text
                    style={{
                      marginTop: 7,
                      marginLeft: 7,
                      fontSize: 12,
                      fontFamily: config.fonts.SemiboldFont,
                      lineHeight: 14,
                      color: config.colors.blackColor,
                    }}
                  >{`Trekking`}</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
    );
  };

  const roadTrip = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginHorizontal: 20,
        }}
      >
        {userRoadTripResponse?.results?.localUsersWithRoadTrips?.map(
          (item, index) => {
            return (
              <View
                style={{
                  marginTop: 20,
                }}
                key={index}
              >
                <Image
                  source={config.images.TRIP_IMG}
                  style={{
                    borderRadius: 10,
                    height: 231,
                    width: "100%",
                    resizeMode: "cover",
                    position: "absolute",
                  }}
                />
                <View
                  style={{
                    height: 241,
                    // backgroundColor:'cyan'
                  }}
                >
                  <View
                    style={{
                      height: 35,
                      marginTop: 20,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        height: 28,
                        width: "38%",
                        borderTopRightRadius: 12,
                        borderBottomRightRadius: 12,
                        flexDirection: "row",
                        alignItems: "center",
                        // justifyContent:'center',
                        backgroundColor: config.colors.yellowColor,
                      }}
                    >
                      <Image
                        source={config.images.BADGE_ICON}
                        style={{
                          marginHorizontal: 5,
                          height: 17,
                          width: 17,
                          resizeMode: "contain",
                        }}
                      />
                      <Text
                        style={{
                          fontFamily: config.fonts.MediumFont,
                          fontSize: 10,
                          lineHeight: 14,
                          color: config.colors.white,
                        }}
                      >{`Licensed Tour Guide`}</Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        height: 28,
                        width: "20%",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onPress={() => {
                        Toast.show({
                          type: "custom",
                          text1: "Coming Soon",
                        });
                      }}
                    >
                      <Image
                        source={config.images.FAVORITE}
                        style={{
                          height: 24,
                          width: 24,
                          resizeMode: "contain",
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: config.fonts.HeadingFont,
                      fontSize: 16,
                      lineHeight: 20,
                      color: config.colors.blackColor,
                    }}
                  >
                    {item?.fullName}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <Image
                        source={config.images.STAR_ICON}
                        style={{ height: 20, width: 20, resizeMode: "contain" }}
                      />
                      <Text
                        style={{
                          fontFamily: config.fonts.LatoBoldFont,
                          fontSize: 15,
                          lineHeight: 20,
                          color: config.colors.blackColor,
                        }}
                      >{` 4.8 `}</Text>
                    </View>
                    <View
                      style={{
                        marginLeft: 8,
                        flexDirection: "row",
                      }}
                    >
                      <Image
                        source={config.images.COMMENT_ICON}
                        style={{ height: 20, width: 20, resizeMode: "contain" }}
                      />
                      <Text
                        style={{
                          fontFamily: config.fonts.LatoBoldFont,
                          fontSize: 15,
                          lineHeight: 20,
                          color: config.colors.blackColor,
                        }}
                      >{` 23 `}</Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 15,
                  }}
                >
                  <Image
                    source={config.images.LOCATION}
                    style={{ height: 20, width: 20, resizeMode: "contain" }}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: config.fonts.HeadingFont,
                      lineHeight: 16,
                      color: config.colors.blackColor,
                    }}
                  >
                    {item?.countryName}
                  </Text>
                </View>
                <Text
                  style={{
                    fontFamily: config.fonts.primaryColor,
                    fontSize: 10,
                    lineHeight: 14,
                    color: config.colors.lightGrey2Color,
                  }}
                >{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. `}</Text>

                <View
                  style={{
                    marginTop: 10,
                    height: 45,
                    marginHorizontal: 20,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      height: 25,
                      width: "25%",
                      flexDirection: "row",
                      // justifyContent:'space-between',
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={config.images.CAMPING_ICON}
                      style={{
                        height: 20,
                        width: 20,
                        marginTop: 6,
                        resizeMode: "contain",
                      }}
                    />
                    <Text
                      style={{
                        marginTop: 7,
                        marginLeft: 7,
                        fontSize: 13,
                        fontFamily: config.fonts.MediumFont,
                        lineHeight: 14,
                        color: config.colors.blackColor,
                      }}
                    >{`Camping`}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      height: 25,
                      flexDirection: "row",
                      width: "25%",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={config.images.HIKING_ICON}
                      style={{
                        height: 20,
                        width: 20,
                        marginTop: 6,
                        resizeMode: "contain",
                      }}
                    />
                    <Text
                      style={{
                        marginTop: 7,
                        marginLeft: 7,
                        fontSize: 13,
                        fontFamily: config.fonts.MediumFont,
                        lineHeight: 14,
                        color: config.colors.blackColor,
                      }}
                    >{`Hiking`}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      height: 25,
                      width: "25%",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={config.images.TREKKING_ICON}
                      style={{
                        height: 20,
                        width: 20,
                        marginTop: 6,
                        resizeMode: "contain",
                      }}
                    />
                    <Text
                      style={{
                        marginTop: 7,
                        marginLeft: 7,
                        fontSize: 12,
                        fontFamily: config.fonts.SemiboldFont,
                        lineHeight: 14,
                        color: config.colors.blackColor,
                      }}
                    >{`Trekking`}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }
        )}

        {/* <View
          style={{
            marginTop: 20,
          }}>
          <Image
            source={config.images.TRIP_IMG}
            style={{
              height: 231,
              width: '100%',
              resizeMode: 'cover',
              position: 'absolute',
            }}
          />
          <View
            style={{
              height: 241,
              // backgroundColor:'cyan'
            }}>
            <View
              style={{
                height: 35,
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  height: 28,
                  width: '38%',
                  borderTopRightRadius: 12,
                  borderBottomRightRadius: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                  // justifyContent:'center',
                  backgroundColor: config.colors.yellowColor,
                }}>
                <Image
                  source={config.images.BADGE_ICON}
                  style={{
                    marginHorizontal: 5,
                    height: 17,
                    width: 17,
                    resizeMode: 'contain',
                  }}
                />
                <Text
                  style={{
                    fontFamily: config.fonts.MediumFont,
                    fontSize: 10,
                    lineHeight: 14,
                    color: config.colors.white,
                  }}>{`Licensed Tour Guide`}</Text>
              </View>
              <TouchableOpacity
                style={{
                  height: 28,
                  width: '20%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={config.images.FAVORITE}
                  style={{
                    height: 24,
                    width: 24,
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 15,
            }}>
            <Image
              source={config.images.LOCATION}
              style={{height: 20, width: 20, resizeMode: 'contain'}}
            />
            <Text
              style={{
                fontSize: 12,
                fontFamily: config.fonts.HeadingFont,
                lineHeight: 16,
                color: config.colors.black,
              }}>
              {`Riyadh, Makkah`}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: config.fonts.primaryColor,
              fontSize: 10,
              lineHeight: 14,
              color: config.colors.lightGrey2Color,
            }}>{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. `}</Text>

          <View
            style={{
              marginTop: 10,
              height: 45,
              marginHorizontal: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={{
                height: 25,
                width: '25%',
                flexDirection: 'row',
                // justifyContent:'space-between',
                alignItems: 'center',
              }}>
              <Image
                source={config.images.CAMPING_ICON}
                style={{height: 20, width: 20, resizeMode: 'contain'}}
              />
              <Text
                style={{
                  marginTop: 7,
                  marginLeft: 7,
                  fontSize: 13,
                  fontFamily: config.fonts.MediumFont,
                  lineHeight: 14,
                  color: config.colors.blackColor,
                }}>{`Camping`}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 25,
                flexDirection: 'row',
                width: '25%',
                alignItems: 'center',
              }}>
              <Image
                source={config.images.HIKING_ICON}
                style={{height: 20, width: 20, resizeMode: 'contain'}}
              />
              <Text
                style={{
                  marginTop: 7,
                  marginLeft: 7,
                  fontSize: 13,
                  fontFamily: config.fonts.MediumFont,
                  lineHeight: 14,
                  color: config.colors.blackColor,
                }}>{`Hiking`}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 25,
                width: '25%',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={config.images.TREKKING_ICON}
                style={{height: 20, width: 20, resizeMode: 'contain'}}
              />
              <Text
                style={{
                  marginTop: 7,
                  marginLeft: 7,
                  fontSize: 12,
                  fontFamily: config.fonts.SemiboldFont,
                  lineHeight: 14,
                  color: config.colors.blackColor,
                }}>{`Trekking`}</Text>
            </TouchableOpacity>
          </View>
        </View> */}
      </ScrollView>
    );
  };

  const offSiteTrip = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginHorizontal: 20,
        }}
      >
        {userOffRoadTripResponse?.results?.localUsersWithOffRoadTrips?.map(
          (item, index) => {
            return (
              <View
                style={{
                  marginTop: 20,
                }}
                key={index}
              >
                <Image
                  source={config.images.TRIP_IMG}
                  style={{
                    borderRadius: 10,
                    height: 231,
                    width: "100%",
                    resizeMode: "cover",
                  }}
                />
                <Text
                  style={{
                    marginTop: 10,
                    fontSize: 16,
                    fontFamily: config.fonts.HeadingFont,
                    lineHeight: 18,
                    color: config.colors.blackColor,
                  }}
                >
                  {item?.fullName}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 15,
                  }}
                >
                  <Image
                    source={config.images.LOCATION}
                    style={{ height: 20, width: 20, resizeMode: "contain" }}
                  />

                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: config.fonts.HeadingFont,
                      lineHeight: 16,
                      color: config.colors.blackColor,
                    }}
                  >
                    {item?.countryName}
                  </Text>
                </View>
                <Text
                  style={{
                    fontFamily: config.fonts.primaryColor,
                    fontSize: 10,
                    lineHeight: 14,
                    color: config.colors.lightGrey2Color,
                  }}
                >{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. `}</Text>

                <View
                  style={{
                    marginTop: 10,
                    height: 45,
                    marginHorizontal: 20,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      height: 25,
                      width: "25%",
                      flexDirection: "row",
                      // justifyContent:'space-between',
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={config.images.CAMPING_ICON}
                      style={{
                        height: 20,
                        width: 20,
                        marginTop: 6,
                        resizeMode: "contain",
                      }}
                    />
                    <Text
                      style={{
                        marginTop: 7,
                        marginLeft: 7,
                        fontSize: 13,
                        fontFamily: config.fonts.MediumFont,
                        lineHeight: 14,
                        color: config.colors.blackColor,
                      }}
                    >{`Camping`}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      height: 25,
                      flexDirection: "row",
                      width: "25%",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={config.images.HIKING_ICON}
                      style={{
                        height: 20,
                        width: 20,
                        marginTop: 6,
                        resizeMode: "contain",
                      }}
                    />
                    <Text
                      style={{
                        marginTop: 7,
                        marginLeft: 7,
                        fontSize: 13,
                        fontFamily: config.fonts.MediumFont,
                        lineHeight: 14,
                        color: config.colors.blackColor,
                      }}
                    >{`Hiking`}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      height: 25,
                      width: "25%",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={config.images.TREKKING_ICON}
                      style={{
                        height: 20,
                        width: 20,
                        marginTop: 6,
                        resizeMode: "contain",
                      }}
                    />
                    <Text
                      style={{
                        marginTop: 7,
                        marginLeft: 7,
                        fontSize: 12,
                        fontFamily: config.fonts.SemiboldFont,
                        lineHeight: 14,
                        color: config.colors.blackColor,
                      }}
                    >{`Trekking`}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }
        )}
      </ScrollView>
    );
  };

  const filterShowModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={filterModalVisible}
        onRequestClose={() => {
          setFilterModalVisible(!filterModalVisible);
        }}
      >
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
            justifyContent: "flex-end",
            // paddingHorizontal: 20,
            backgroundColor: "rgba(60, 61, 62, 0.8)",
          }}
        >
          <View
            style={{
              maxHeight: config.constants.Height / 1.12,

              borderRadius: 24,
              backgroundColor: config.colors.white,
            }}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                justifyContent: "center",
                paddingHorizontal: 25,
                paddingVertical: 10,
              }}
              nestedScrollEnabled
            >
              <Text
                style={{
                  marginTop: 15,
                  fontFamily: config.fonts.SemiboldFont,
                  fontSize: 20,
                  lineHeight: 26,
                  color: config.colors.blackColor,
                }}
              >{`Local Gender`}</Text>

              <View
                style={{
                  flexDirection: "row",
                  marginTop: 15,
                }}
              >
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    marginRight: 8,
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 12,
                    paddingVertical: 7,
                    borderRadius: 18,
                    borderWidth: 1,
                    borderColor: config.colors.yellowColor,
                    backgroundColor:
                      gender == "Male"
                        ? config.colors.yellowColor
                        : config.colors.white,
                  }}
                  onPress={() => {
                    setGender("Male");
                  }}
                >
                  <Image
                    source={config.images.MALE_ICON}
                    style={{
                      height: 23,
                      width: 23,
                      marginTop: 5,
                      marginRight: 5,
                      tintColor:
                        gender == "Male"
                          ? config.colors.white
                          : config.colors.yellowColor,
                      resizeMode: "contain",
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: config.fonts.SemiboldFont,
                      lineHeight: 14,
                      color:
                        gender == "Male"
                          ? config.colors.white
                          : config.colors.yellowColor,
                    }}
                  >{`Male`}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 12,
                    paddingVertical: 7,
                    borderRadius: 18,
                    borderWidth: 1,
                    borderColor: config.colors.yellowColor,
                    backgroundColor:
                      gender == "Female"
                        ? config.colors.yellowColor
                        : config.colors.white,
                  }}
                  onPress={() => {
                    setGender("Female");
                  }}
                >
                  <Image
                    source={config.images.FEMALE_ICON}
                    style={{
                      height: 20,
                      width: 20,
                      marginRight: 5,
                      tintColor:
                        gender == "Female"
                          ? config.colors.white
                          : config.colors.yellowColor,
                      resizeMode: "contain",
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: config.fonts.SemiboldFont,
                      lineHeight: 14,
                      color:
                        gender == "Female"
                          ? config.colors.white
                          : config.colors.yellowColor,
                    }}
                  >{`Female`}</Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  marginTop: 15,
                  flexDirection: "row",
                }}
              >
                <Image
                  source={config.images.CHECK_VERIFIED_ICON}
                  style={{ height: 20, width: 20, resizeMode: "contain" }}
                />
                <Text
                  style={{
                    fontFamily: config.fonts.SemiboldFont,
                    fontSize: 15,
                    lineHeight: 18,
                    marginLeft: 10,
                    color: config.colors.blackColor,
                  }}
                >{`Licenced`}</Text>
              </View>

              <Pressable onPress={toggleSwitch} style={styles.pressable}>
                <LinearGradient
                  colors={isEnabled ? defaultStyles.bgGradientColors : activeStyles.headGradientColors}
                  style={styles.backgroundGradient}
                  start={{
                    x: 0,
                    y: 0.5,
                  }}
                >
                  <View style={styles.innerContainer}>
                    <Animated.View
                      style={{
                        transform: [{ translateX }],
                      }}
                    >
                      <LinearGradient
                        colors={defaultStyles.headGradientColors}
                        style={styles.headGradient}
                      />
                    </Animated.View>
                  </View>
                </LinearGradient>
              </Pressable>
              {/* <View
                style={{
                  marginTop: 15,
                  alignItems: 'flex-start',
                }}>
                  <View style={{
                    height:24,width:46,backgroundColor:config.colors.yellowColor,borderRadius:10
                  }}>
                    <TouchableOpacity style={{
                      alignSelf: renderSwitch? 'flex-end' : 'flex-start',
                      height:24,width:26,borderRadius:15,backgroundColor:config.colors.white,
                    }} onPress={() => {
                      setRenderSwitch(!renderSwitch);
                    }}></TouchableOpacity>
                  </View>
                {/* <Switch
                  value={renderSwitch}
                  trackColor={{
                    false: '#767577',
                    true: config.colors.yellowColor,
                  }}
                  thumbColor={renderSwitch ? config.colors.white : '#f4f3f4'}
                  onValueChange={() => {
                    setRenderSwitch(!renderSwitch);
                  }}
                  style={{transform: [{scaleX: 1.5}, {scaleY: 1.5}]}}
                /> 
              </View> */}

              <Text
                style={{
                  marginTop: 20,
                  fontFamily: config.fonts.SemiboldFont,
                  fontSize: 15,
                  lineHeight: 18,
                  color: config.colors.blackColor,
                }}
              >{`Trip Price `}</Text>

              <Text
                style={{
                  marginTop: 20,
                  fontFamily: config.fonts.SemiboldFont,
                  fontSize: 15,
                  lineHeight: 18,
                  color: config.colors.blackColor,
                }}
              >{`SAR  0  -   SAR ${sliderValue}`}</Text>

              <Slider
                style={{ width: "100%", height: 40 }}
                minimumValue={1}
                maximumValue={135}
                value={sliderValue}
                step={1}
                onValueChange={(val) => setSliderValue(val)}
                thumbTintColor={config.colors.primaryColor}
                minimumTrackTintColor={config.colors.primaryColor}
                maximumTrackTintColor={config.colors.lightGrey2Color}
              />

              <Text
                style={{
                  marginTop: 8,
                  fontFamily: config.fonts.SemiboldFont,
                  fontSize: 15,
                  lineHeight: 18,
                  color: config.colors.blackColor,
                }}
              >{`Select Activities`}</Text>

              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  // marginTop: 15,
                }}
              >
                <TouchableOpacity
                  style={{
                    marginVertical: 8,
                    flexDirection: "row",
                    marginRight: 8,
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 12,
                    paddingVertical: 7,
                    borderRadius: 18,
                    borderWidth: 1,
                    borderColor: config.colors.yellowColor,
                    backgroundColor:
                      selectActivity == "All"
                        ? config.colors.yellowColor
                        : config.colors.white,
                  }}
                  onPress={() => {
                    setSelectActivity("All");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: config.fonts.SemiboldFont,
                      lineHeight: 14,
                      color:
                        selectActivity == "All"
                          ? config.colors.white
                          : config.colors.yellowColor,
                    }}
                  >{`All`}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    marginRight: 8,
                    marginVertical: 8,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 12,
                    paddingVertical: 7,
                    borderRadius: 18,
                    borderWidth: 1,
                    borderColor: config.colors.yellowColor,
                    backgroundColor:
                      selectActivity == "Camping"
                        ? config.colors.yellowColor
                        : config.colors.white,
                  }}
                  onPress={() => {
                    setSelectActivity("Camping");
                  }}
                >
                  <Image
                    source={config.images.CAMPING_ICON}
                    style={{
                      height: 20,
                      width: 20,
                      marginRight: 5,
                      tintColor:
                        selectActivity == "Camping"
                          ? config.colors.white
                          : config.colors.yellowColor,
                      resizeMode: "contain",
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: config.fonts.SemiboldFont,
                      lineHeight: 14,
                      color:
                        selectActivity == "Camping"
                          ? config.colors.white
                          : config.colors.yellowColor,
                    }}
                  >{`Camping`}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    marginVertical: 8,
                    marginRight: 8,
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 12,
                    paddingVertical: 7,
                    borderRadius: 18,
                    borderWidth: 1,
                    borderColor: config.colors.yellowColor,
                    backgroundColor:
                      selectActivity == "Wildlife Viewing"
                        ? config.colors.yellowColor
                        : config.colors.white,
                  }}
                  onPress={() => {
                    setSelectActivity("Wildlife Viewing");
                  }}
                >
                  <Image
                    source={config.images.WILDLIFE_ICON}
                    style={{
                      height: 20,
                      width: 20,
                      marginRight: 5,
                      tintColor:
                        selectActivity == "Wildlife Viewing"
                          ? config.colors.white
                          : config.colors.yellowColor,
                      resizeMode: "contain",
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: config.fonts.SemiboldFont,
                      lineHeight: 14,
                      color:
                        selectActivity == "Wildlife Viewing"
                          ? config.colors.white
                          : config.colors.yellowColor,
                    }}
                  >{`Wildlife Viewing`}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    marginRight: 8,
                    marginVertical: 8,
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 12,
                    paddingVertical: 7,
                    borderRadius: 18,
                    borderWidth: 1,
                    borderColor: config.colors.yellowColor,
                    backgroundColor:
                      selectActivity == "Bonfire"
                        ? config.colors.yellowColor
                        : config.colors.white,
                  }}
                  onPress={() => {
                    setSelectActivity("Bonfire");
                  }}
                >
                  <Image
                    source={config.images.BONFIRE_ICON}
                    style={{
                      height: 20,
                      width: 20,
                      marginRight: 5,
                      tintColor:
                        selectActivity == "Bonfire"
                          ? config.colors.white
                          : config.colors.yellowColor,
                      resizeMode: "contain",
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: config.fonts.SemiboldFont,
                      lineHeight: 14,
                      color:
                        selectActivity == "Bonfire"
                          ? config.colors.white
                          : config.colors.yellowColor,
                    }}
                  >{`Bonfire`}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    marginRight: 8,
                    marginVertical: 8,
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 12,
                    paddingVertical: 7,
                    borderRadius: 18,
                    borderWidth: 1,
                    borderColor: config.colors.yellowColor,
                    backgroundColor:
                      selectActivity == "Boat Tourink"
                        ? config.colors.yellowColor
                        : config.colors.white,
                  }}
                  onPress={() => {
                    setSelectActivity("Boat Tourink");
                  }}
                >
                  <Image
                    source={config.images.BOATING_ICON}
                    style={{
                      height: 20,
                      width: 20,
                      marginRight: 5,
                      tintColor:
                        selectActivity == "Boat Tourink"
                          ? config.colors.white
                          : config.colors.yellowColor,
                      resizeMode: "contain",
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: config.fonts.SemiboldFont,
                      lineHeight: 14,
                      color:
                        selectActivity == "Boat Tourink"
                          ? config.colors.white
                          : config.colors.yellowColor,
                    }}
                  >{`Boat Tourink`}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    marginRight: 8,
                    marginVertical: 8,
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 12,
                    paddingVertical: 7,
                    borderRadius: 18,
                    borderWidth: 1,
                    borderColor: config.colors.yellowColor,
                    backgroundColor:
                      selectActivity == "Hiking"
                        ? config.colors.yellowColor
                        : config.colors.white,
                  }}
                  onPress={() => {
                    setSelectActivity("Hiking");
                  }}
                >
                  <Image
                    source={config.images.HIKING_ICON}
                    style={{
                      height: 20,
                      width: 20,
                      marginRight: 5,
                      tintColor:
                        selectActivity == "Hiking"
                          ? config.colors.white
                          : config.colors.yellowColor,
                      resizeMode: "contain",
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: config.fonts.SemiboldFont,
                      lineHeight: 14,
                      color:
                        selectActivity == "Hiking"
                          ? config.colors.white
                          : config.colors.yellowColor,
                    }}
                  >{`Hiking`}</Text>
                </TouchableOpacity>
              </View>

              <Text
                style={{
                  marginTop: 8,
                  fontFamily: config.fonts.SemiboldFont,
                  fontSize: 15,
                  lineHeight: 18,
                  color: config.colors.blackColor,
                }}
              >{`Do you need special care?`}</Text>

              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  // marginTop: 15,
                }}
              >
                <TouchableOpacity
                  style={{
                    marginRight: 8,
                    marginVertical: 8,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 12,
                    paddingVertical: 7,
                    borderRadius: 18,
                    borderWidth: 1,
                    borderColor: config.colors.yellowColor,
                    backgroundColor:
                      selectSpatialCare == "Wheelchair"
                        ? config.colors.yellowColor
                        : config.colors.white,
                  }}
                  onPress={() => {
                    setSelectSpatialCare("Wheelchair");
                  }}
                >
                  <Image
                    source={config.images.WHEELCHAIR_ICON}
                    style={{
                      height: 20,
                      width: 20,
                      marginRight: 5,
                      tintColor:
                        selectSpatialCare == "Wheelchair"
                          ? config.colors.white
                          : config.colors.yellowColor,
                      resizeMode: "contain",
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: config.fonts.SemiboldFont,
                      lineHeight: 14,
                      color:
                        selectSpatialCare == "Wheelchair"
                          ? config.colors.white
                          : config.colors.yellowColor,
                    }}
                  >{`Wheelchair`}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    marginVertical: 8,
                    marginRight: 8,
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 12,
                    paddingVertical: 7,
                    borderRadius: 18,
                    borderWidth: 1,
                    borderColor: config.colors.yellowColor,
                    backgroundColor:
                      selectSpatialCare == "Blind"
                        ? config.colors.yellowColor
                        : config.colors.white,
                  }}
                  onPress={() => {
                    setSelectSpatialCare("Blind");
                  }}
                >
                  <Image
                    source={config.images.CLOSE_EYE_ICON}
                    style={{
                      height: 20,
                      width: 20,
                      marginRight: 5,
                      tintColor:
                        selectSpatialCare == "Blind"
                          ? config.colors.white
                          : config.colors.yellowColor,
                      resizeMode: "contain",
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: config.fonts.SemiboldFont,
                      lineHeight: 14,
                      color:
                        selectSpatialCare == "Blind"
                          ? config.colors.white
                          : config.colors.yellowColor,
                    }}
                  >{`Blind`}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    marginRight: 8,
                    marginVertical: 8,
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 12,
                    paddingVertical: 7,
                    borderRadius: 18,
                    borderWidth: 1,
                    borderColor: config.colors.yellowColor,
                    backgroundColor:
                      selectSpatialCare == "Any Injuries"
                        ? config.colors.yellowColor
                        : config.colors.white,
                  }}
                  onPress={() => {
                    setSelectSpatialCare("Any Injuries");
                  }}
                >
                  <Image
                    source={config.images.BANDAIDS_ICON}
                    style={{
                      height: 20,
                      width: 20,
                      marginRight: 5,
                      tintColor:
                        selectSpatialCare == "Any Injuries"
                          ? config.colors.white
                          : config.colors.yellowColor,
                      resizeMode: "contain",
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: config.fonts.SemiboldFont,
                      lineHeight: 14,
                      color:
                        selectSpatialCare == "Any Injuries"
                          ? config.colors.white
                          : config.colors.yellowColor,
                    }}
                  >{`Any Injuries`}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    marginRight: 8,
                    marginVertical: 8,
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 12,
                    paddingVertical: 7,
                    borderRadius: 18,
                    borderWidth: 1,
                    borderColor: config.colors.yellowColor,
                    backgroundColor:
                      selectSpatialCare == "Deaf"
                        ? config.colors.yellowColor
                        : config.colors.white,
                  }}
                  onPress={() => {
                    setSelectSpatialCare("Deaf");
                  }}
                >
                  <Image
                    source={config.images.CLOSE_EAR_ICON}
                    style={{
                      height: 20,
                      width: 20,
                      marginRight: 5,
                      tintColor:
                        selectSpatialCare == "Deaf"
                          ? config.colors.white
                          : config.colors.yellowColor,
                      resizeMode: "contain",
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: config.fonts.SemiboldFont,
                      lineHeight: 14,
                      color:
                        selectSpatialCare == "Deaf"
                          ? config.colors.white
                          : config.colors.yellowColor,
                    }}
                  >{`Deaf`}</Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  marginVertical: 20,
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    height: 44,
                    borderRadius: 12,
                    width: "46%",
                    borderWidth: 1,
                    borderColor: config.colors.yellowColor,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    setFilterModalVisible(false);
                  }}
                >
                  <Text
                    style={{
                      fontFamily: config.fonts.HeadingFont,
                      fontSize: 16,
                      lineHeight: 20,
                      color: config.colors.yellowColor,
                    }}
                  >{`Reset`}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    height: 44,
                    borderRadius: 12,
                    width: "46%",
                    backgroundColor: config.colors.yellowColor,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    callUserFilterApi();
                  }}
                >
                  <Text
                    style={{
                      fontFamily: config.fonts.HeadingFont,
                      fontSize: 16,
                      lineHeight: 20,
                      color: config.colors.white,
                    }}
                  >{`Apply`}</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
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
      }}
    >
      <StatusBar
        barStyle={"dark-content"}
        translucent={false}
        backgroundColor={config.colors.primaryColor}
      />
      <View
        style={{
          height: 60,
          marginHorizontal: 20,
          marginTop: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: config.fonts.SemiboldFont,
              fontSize: 20,
              lineHeight: 26,
              color: config.colors.white,
            }}
          >{`Welcome`}</Text>
          <Text
            style={{
              fontFamily: config.fonts.PrimaryFont,
              fontSize: 15,
              lineHeight: 26,
              color: config.colors.white,
            }}
          >{`${userGetProfileResponse?.results?.user?.fullName}`}</Text>
        </View>
        <TouchableOpacity
          style={{
            marginTop: 4,
          }}
          onPress={() => {
            Toast.show({
              type: "custom",
              text1: "Coming Soon",
            });
          }}
        >
          <Image
            source={config.images.NOTIFICATION}
            style={{ height: 26, width: 26, resizeMode: "contain" }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: 48,
          marginHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            height: 48,
            // paddingTop: Platform.OS == 'android' ? 18 : 0,
            width: "82%",
            borderRadius: 14,
            paddingHorizontal: 8,
            alignItems: "center",
            flexDirection: "row",
            backgroundColor: config.colors.white,
          }}
        >
          <Image
            source={config.images.SEARCH_ICON}
            style={{ height: 21, width: 21, resizeMode: "contain" }}
          />
          <View
            style={{
              width: "90%",
              flexDirection: "column",
              justifyContent: "center",
              marginLeft: 8,
            }}
          >
            {/* <Text
              style={{
                fontFamily: config.fonts.MediumFont,
                fontSize: 12,
                lineHeight: 12,
                color: config.colors.lightGrey2Color,
              }}>{`Where to ?`}</Text> */}
            <TextInput
              style={{
                width: "100%",
                fontFamily: config.fonts.MediumFont,
                fontSize: 14,
                lineHeight: 20,
                // backgroundColor:'cyan',
                color: config.colors.lightGrey2Color,
              }}
              placeholder={`Where to ? Anywhere- Any date`}
              keyboardType={"default"}
              placeholderTextColor={config.colors.lightGrey2Color}
              value={search}
              returnKeyType="done"
              onChangeText={(val) => {
                debouncedFetchSuggestions(val);
              }}
            />
          </View>
        </View>
        <TouchableOpacity
          style={{
            height: 48,
            width: "15%",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 14,
            backgroundColor: config.colors.white,
          }}
          onPress={() => {
            setFilterModalVisible(true);
          }}
        >
          <Image
            source={config.images.FILTER_ICON}
            style={{ height: 24, width: 24, resizeMode: "contain" }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: 10,
          height: 45,
          // backgroundColor:'pink',
          marginHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={{
            height: 45,
            width: "32%",
            alignItems: "center",
            borderBottomWidth: 1,
            borderColor:
              trip == "Popular Cities"
                ? config.colors.white
                : config.colors.primaryColor,
          }}
          onPress={() => {
            setTrip("Popular Cities");
          }}
        >
          <Image
            source={config.images.POPULAR_TRIP}
            style={{ height: 20, width: 20, resizeMode: "contain" }}
          />
          <Text
            style={{
              marginTop: 7,
              fontSize: 13,
              fontFamily: config.fonts.MediumFont,
              lineHeight: 14,
              color: config.colors.white,
            }}
          >{`Popular Cities`}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 45,
            width: "32%",
            alignItems: "center",
            borderBottomWidth: 1,
            borderColor:
              trip == "Road Trip"
                ? config.colors.white
                : config.colors.primaryColor,
          }}
          onPress={() => {
            setTrip("Road Trip");
          }}
        >
          <Image
            source={config.images.ROAD_TRIP}
            style={{ height: 20, width: 20, resizeMode: "contain" }}
          />
          <Text
            style={{
              marginTop: 7,
              fontSize: 13,
              fontFamily: config.fonts.MediumFont,
              lineHeight: 14,
              color: config.colors.white,
            }}
          >{`Road Trip`}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 45,
            width: "32%",
            alignItems: "center",
            borderBottomWidth: 1,
            borderColor:
              trip == "Off- Road Trip"
                ? config.colors.white
                : config.colors.primaryColor,
          }}
          onPress={() => {
            setTrip("Off- Road Trip");
          }}
        >
          <Image
            source={config.images.OFF_SITE_TRIP}
            style={{ height: 20, width: 20, resizeMode: "contain" }}
          />
          <Text
            style={{
              marginTop: 7,
              fontSize: 13,
              fontFamily: config.fonts.MediumFont,
              lineHeight: 14,
              color: config.colors.white,
            }}
          >{`Off- Road Trip`}</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          marginTop: 10,
          flex: 1,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          backgroundColor: config.colors.white,
        }}
      >
        {trip == "Popular Cities"
          ? popularCity()
          : trip == "Road Trip"
          ? roadTrip()
          : trip == "Off- Road Trip"
          ? offSiteTrip()
          : null}
      </View>
      {filterShowModal()}
    </SafeAreaView>
  );
};

export default UserHomeScreen;

const styles = StyleSheet.create({
  pressable: {
    marginTop:15,
    width: 56,
    height: 32,
    borderRadius: 16,
  },
  backgroundGradient: {
    borderRadius: 16,
    flex: 1,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    position: 'relative',
  },
  headGradient: {
    width: 24,
    height: 24,
    borderRadius: 100,
  },
});
