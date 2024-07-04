import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { UserGetTripListReducer } from "../../redux/reducers";
import { SagaActions } from "../../redux/sagas/SagaActions";
import config from "../../config";
import AppHeader from "../../components/AppHeader";
import moment from "moment";

const MyTrip = ({ navigation }) => {
  const dispatch = useDispatch();
  const userAllTripsResponse = useSelector(
    UserGetTripListReducer.selectUserGetTripListData
  );
  const [upComingTrip, setUpComingTrip] = useState("Upcomings");
  const [completedTrip, setCompletedTrip] = useState([]);
  const [trips, setTrips] = useState([]);
  console.log(trips, completedTrip);
  //hocks call
  useEffect(() => {
    if (userAllTripsResponse != null) {
      if (userAllTripsResponse?.error == false) {
        const completeTrip = userAllTripsResponse?.results?.list?.filter(
          (item) => item?.bookingType == "completed"
        );
        const upcomingTrips = userAllTripsResponse?.results?.list?.filter(
          (item) => item?.bookingType == "UpComing"
        );
        setTrips(upcomingTrips);
        setCompletedTrip(completeTrip);
        console.log("userAllTripsResponse", userAllTripsResponse, completeTrip, upcomingTrips);
      }
    }
  }, [userAllTripsResponse]);

  useFocusEffect(
    useCallback(() => {
      callUpcomingTripListApi();
      // callCompleteTripListApi()
    }, [])
  );

  // api call
  const callUpcomingTripListApi = () => {
    const payload = {
      bookingType: "",
    };
    dispatch({ type: SagaActions.USER_GET_ALL_TRIP_LIST, payload });
  };
 

  // component render

  const UpcomingTrips = () => {
    return (
      <ScrollView
        contentContainerStyle={{
          marginHorizontal: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        {trips?.length > 0 && (<>
        
        <Text
          style={{
            marginTop: 20,
            fontFamily: config.fonts.HeadingFont,
            fontSize: 18,
            lineHeight: 22,
            color: config.colors.blackColor,
          }}
        >{`Riyadh City`}</Text>

        {trips?.map((item, index) => {
          return (
            <View
              style={{
                height: 184,
                marginVertical: 10,
                borderRadius: 12,
                paddingVertical: 10,
                borderWidth: 1,
                marginTop: 20,
                borderColor: config.colors.borderColor,
              }}
              key={index}
            >
              <View
                style={{
                  height: 106,
                  borderRadius: 12,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: 10,
                  backgroundColor: config.colors.primaryColor,
                }}
              >
                <View
                  style={{
                    width: "24%",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={config.images.LOCAL_IMG}
                    style={{ height: 92, width: 79, resizeMode: "cover" }}
                  />
                </View>
                <View
                  style={{
                    width: "76%",
                    marginHorizontal: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          marginTop: 10,
                          fontFamily: config.fonts.SemiboldFont,
                          fontSize: 14,
                          lineHeight: 16,
                          color: config.colors.white,
                        }}
                      >
                        {item?.startDate
                          ? moment(item?.startDate).format("DD-MM-YYYY")
                          : ""}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          marginTop: 10,
                          marginRight: 19,
                          fontFamily: config.fonts.SemiboldFont,
                          fontSize: 14,
                          lineHeight: 21,
                          color: config.colors.white,
                        }}
                      >
                        <Image
                          source={config.images.STAR_ICON}
                          style={{
                            height: 16,
                            width: 16,
                            resizeMode: "contain",
                          }}
                        />
                        {" 50 (30)"}
                      </Text>
                    </View>
                  </View>

                  <Text
                    style={{
                      fontFamily: config.fonts.SemiboldFont,
                      fontSize: 14,
                      lineHeight: 21,
                      color: config.colors.white,
                    }}
                  >
                    {"Ali Ahmed Al Qahtani"}
                  </Text>
                  <Text
                    style={{
                      fontFamily: config.fonts.SemiboldFont,
                      fontSize: 14,
                      lineHeight: 23,
                      color: config.colors.white,
                    }}
                  >
                    {"Booking Id : AH1234"}
                  </Text>
                  <View
                    style={{
                      marginTop: 7,
                      flexDirection: "row",
                    }}
                  >
                    <Image
                      source={config.images.CAMPING_ICON}
                      style={{
                        height: 20,
                        width: 20,
                        marginRight: 7,
                        resizeMode: "contain",
                        tintColor: config.colors.white,
                      }}
                    />
                    <Image
                      source={config.images.BOATING_ICON}
                      style={{
                        height: 20,
                        width: 20,
                        marginRight: 7,
                        resizeMode: "contain",
                        tintColor: config.colors.white,
                      }}
                    />
                    <Image
                      source={config.images.WILDLIFE_ICON}
                      style={{
                        height: 20,
                        width: 20,
                        marginRight: 7,
                        resizeMode: "contain",
                        tintColor: config.colors.white,
                      }}
                    />
                    <Image
                      source={config.images.TREKKING_ICON}
                      style={{
                        height: 20,
                        width: 20,
                        resizeMode: "contain",
                        tintColor: config.colors.white,
                      }}
                    />
                  </View>
                </View>
              </View>

              <View
                style={{
                  marginTop: 10,
                  marginHorizontal: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  style={{
                    height: 44,
                    width: "45%",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                    borderRadius: 12,
                    borderColor: config.colors.yellowColor,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: config.fonts.HeadingFont,
                      fontSize: 16,
                      lineHeight: 24,
                      color: config.colors.yellowColor,
                    }}
                  >{`Support`}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    height: 44,
                    width: "45%",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 12,
                    backgroundColor: config.colors.yellowColor,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: config.fonts.HeadingFont,
                      fontSize: 16,
                      lineHeight: 24,
                      color: config.colors.white,
                    }}
                  >{`Chat`}</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
        </>)}
      </ScrollView>
    );
  };

  const CompletedTrips = () => {
    return (
      <ScrollView
        contentContainerStyle={{
          marginHorizontal: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        {completedTrip?.length > 0 && (
          <>
        <Text
          style={{
            fontFamily: config.fonts.HeadingFont,
            fontSize: 18,
            lineHeight: 22,
            color: config.colors.blackColor,
          }}
        >{`Riyadh City`}</Text>
         {completedTrip?.map((item, index) => {
          return (
            <View
              style={{
                height: 184,
                marginVertical: 10,
                borderRadius: 12,
                paddingVertical: 10,
                borderWidth: 1,
                marginTop: 20,
                borderColor: config.colors.borderColor,
              }}
              key={index}
            >
              <View
                style={{
                  height: 106,
                  borderRadius: 12,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: 10,
                  backgroundColor: config.colors.primaryColor,
                }}
              >
                <View
                  style={{
                    width: "24%",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={config.images.LOCAL_IMG}
                    style={{ height: 92, width: 79, resizeMode: "cover" }}
                  />
                </View>
                <View
                  style={{
                    width: "76%",
                    marginHorizontal: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          marginTop: 10,
                          fontFamily: config.fonts.SemiboldFont,
                          fontSize: 14,
                          lineHeight: 16,
                          color: config.colors.white,
                        }}
                      >
                        {item?.startDate
                          ? moment(item?.startDate).format("DD-MM-YYYY")
                          : ""}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          marginTop: 10,
                          marginRight: 19,
                          fontFamily: config.fonts.SemiboldFont,
                          fontSize: 14,
                          lineHeight: 21,
                          color: config.colors.white,
                        }}
                      >
                        <Image
                          source={config.images.STAR_ICON}
                          style={{
                            height: 16,
                            width: 16,
                            resizeMode: "contain",
                          }}
                        />
                        {" 50 (30)"}
                      </Text>
                    </View>
                  </View>

                  <Text
                    style={{
                      fontFamily: config.fonts.SemiboldFont,
                      fontSize: 14,
                      lineHeight: 21,
                      color: config.colors.white,
                    }}
                  >
                    {"Ali Ahmed Al Qahtani"}
                  </Text>
                  <Text
                    style={{
                      fontFamily: config.fonts.SemiboldFont,
                      fontSize: 14,
                      lineHeight: 23,
                      color: config.colors.white,
                    }}
                  >
                    {"Booking Id : AH1234"}
                  </Text>
                  <View
                    style={{
                      marginTop: 7,
                      flexDirection: "row",
                    }}
                  >
                    <Image
                      source={config.images.CAMPING_ICON}
                      style={{
                        height: 20,
                        width: 20,
                        marginRight: 7,
                        resizeMode: "contain",
                        tintColor: config.colors.white,
                      }}
                    />
                    <Image
                      source={config.images.BOATING_ICON}
                      style={{
                        height: 20,
                        width: 20,
                        marginRight: 7,
                        resizeMode: "contain",
                        tintColor: config.colors.white,
                      }}
                    />
                    <Image
                      source={config.images.WILDLIFE_ICON}
                      style={{
                        height: 20,
                        width: 20,
                        marginRight: 7,
                        resizeMode: "contain",
                        tintColor: config.colors.white,
                      }}
                    />
                    <Image
                      source={config.images.TREKKING_ICON}
                      style={{
                        height: 20,
                        width: 20,
                        resizeMode: "contain",
                        tintColor: config.colors.white,
                      }}
                    />
                  </View>
                </View>
              </View>

              <View
                style={{
                  marginTop: 10,
                  marginHorizontal: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  style={{
                    height: 44,
                    width: "45%",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                    borderRadius: 12,
                    borderColor: config.colors.yellowColor,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: config.fonts.HeadingFont,
                      fontSize: 16,
                      lineHeight: 24,
                      color: config.colors.yellowColor,
                    }}
                  >{`Support`}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    height: 44,
                    width: "45%",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 12,
                    backgroundColor: config.colors.yellowColor,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: config.fonts.HeadingFont,
                      fontSize: 16,
                      lineHeight: 24,
                      color: config.colors.white,
                    }}
                  >{`Chat`}</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
        </>
      )}
      </ScrollView>
    );
  };

  const CreatedTrips = () => {
    return (
      <ScrollView
        contentContainerStyle={{
          marginHorizontal: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{
            fontFamily: config.fonts.HeadingFont,
            fontSize: 18,
            lineHeight: 22,
            color: config.colors.blackColor,
          }}
        >{`Riyadh City`}</Text>
      </ScrollView>
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
        barStyle={"light-content"}
        backgroundColor={config.colors.primaryColor}
      />
      <AppHeader
        title={"My Trips"}
        navigation={navigation}
        tintColor={config.colors.white}
        onPress={() => {
          navigation.goBack();
        }}
        backgroundColor={config.colors.primaryColor}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: config.colors.white,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}
      >
        <View
          style={{
            marginTop: 10,
            height: 45,
            // backgroundColor:'pink',
            alignItems: "center",
            // marginHorizontal: 20,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={{
              height: 45,
              width: "32%",
              justifyContent: "center",
              alignItems: "center",
              borderBottomWidth: 1,
              borderColor:
                upComingTrip == "Upcomings"
                  ? config.colors.primaryColor
                  : config.colors.white,
            }}
            onPress={() => {
              setUpComingTrip("Upcomings");
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: config.fonts.MediumFont,
                lineHeight: 16,
                color:
                  upComingTrip == "Upcomings"
                    ? config.colors.blackColor
                    : config.colors.lightGrey2Color,
              }}
            >{`Upcomings`}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 45,
              width: "32%",
              justifyContent: "center",
              alignItems: "center",
              borderBottomWidth: 1,
              borderColor:
                upComingTrip == "Completed"
                  ? config.colors.primaryColor
                  : config.colors.white,
            }}
            onPress={() => {
              setUpComingTrip("Completed");
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: config.fonts.MediumFont,
                lineHeight: 16,
                color:
                  upComingTrip == "Completed"
                    ? config.colors.blackColor
                    : config.colors.lightGrey2Color,
              }}
            >{`Completed`}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 45,
              width: "32%",
              justifyContent: "center",
              alignItems: "center",
              borderBottomWidth: 1,
              borderColor:
                upComingTrip == "Created Trips"
                  ? config.colors.primaryColor
                  : config.colors.white,
            }}
            onPress={() => {
              setUpComingTrip("Created Trips");
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: config.fonts.MediumFont,
                lineHeight: 16,
                color:
                  upComingTrip == "Created Trips"
                    ? config.colors.blackColor
                    : config.colors.lightGrey2Color,
              }}
            >{`Created Trips`}</Text>
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
          {upComingTrip == "Upcomings"
            ? UpcomingTrips()
            : upComingTrip == "Completed"
            ? CompletedTrips()
            : upComingTrip == "Created Trips"
            ? CreatedTrips()
            : null}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MyTrip;

const styles = StyleSheet.create({});
