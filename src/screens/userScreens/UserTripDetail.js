import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserTripDetailReducer } from "../../redux/reducers";
import { SagaActions } from "../../redux/sagas/SagaActions";
import { useFocusEffect } from "@react-navigation/native";
import config from "../../config";
import AppHeader from "../../components/AppHeader";

const UserTripDetail = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const userTripDetailResponse = useSelector(
    UserTripDetailReducer.selectUserTripDetailData
  );

  // hooks call
  useEffect(() => {
    if (userTripDetailResponse != null) {
      if (userTripDetailResponse?.error == false) {
        console.log("userTripDetailResponse", userTripDetailResponse);
      }
    }
  }, [userTripDetailResponse]);

  useFocusEffect(
    useCallback(() => {
      callUserTripDetailApi();
    }, [])
  );

  //api call
  const callUserTripDetailApi = () => {
    const payload = {
      uri: "/" + route?.params?.tripId,
    };
    dispatch({ type: SagaActions.USER_TRIP_DETAILS, payload });
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
        navigation={navigation}
        title={"Your Trip"}
        tintColor={config.colors.white}
        backgroundColor={config.colors.primaryColor}
      />

      <View
        style={{
          flex: 1,
          backgroundColor: config.colors.white,
          borderTopRightRadius: 12,
          borderTopLeftRadius: 12,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              marginTop: 20,
              // height: 106,
              marginHorizontal: 20,
              paddingHorizontal: 12,
              paddingVertical: 12,
              borderRadius: 12,
              flexDirection: "row",
              justifyContent: "space-between",
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
                    {"naeem"}
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
                {"naeem"}
              </Text>
              <Text
                style={{
                  fontFamily: config.fonts.SemiboldFont,
                  fontSize: 14,
                  lineHeight: 23,
                  color: config.colors.white,
                }}
              >
                {"Booking Id : " + Date?.now()}
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

          <Text
            style={{
              marginHorizontal: 20,
              marginTop: 15,
              fontFamily: config.fonts.MediumFont,
              fontSize: 15,
              lineHeight: 18,
              color: config.colors.blackColor,
            }}
          >
            {"Your Trip Details"}
          </Text>

          <View
            style={{
              marginHorizontal: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                marginTop: 15,
                fontFamily: config.fonts.HeadingFont,
                fontSize: 15,
                lineHeight: 18,
                color: config.colors.blackColor,
              }}
            >
              {"Date"}
            </Text>
            <Text
              style={{
                textDecorationLine: "underline",
                textDecorationColor: config.colors.blackColor,
                marginTop: 15,
                fontFamily: config.fonts.HeadingFont,
                fontSize: 15,
                lineHeight: 18,
                color: config.colors.blackColor,
              }}
            >
              {"Edit"}
            </Text>
          </View>
          <Text
            style={{
              marginHorizontal: 20,
              marginTop: 15,
              fontFamily: config.fonts.PrimaryFont,
              fontSize: 15,
              lineHeight: 18,
              color: config.colors.lightGrey2Color,
            }}
          >
            {"18-03-2024"}
          </Text>
          <View
            style={{
              height: 10,
              borderBottomWidth: 1,
              borderColor: config.colors.borderColor,
            }}
          ></View>

          <View
            style={{
              marginHorizontal: 20,
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                marginTop: 15,
                fontFamily: config.fonts.HeadingFont,
                fontSize: 15,
                lineHeight: 18,
                color: config.colors.blackColor,
              }}
            >
              {"No. of Guests"}
            </Text>
            <Text
              style={{
                textDecorationLine: "underline",
                textDecorationColor: config.colors.blackColor,
                marginTop: 15,
                fontFamily: config.fonts.HeadingFont,
                fontSize: 15,
                lineHeight: 18,
                color: config.colors.blackColor,
              }}
            >
              {"Edit"}
            </Text>
          </View>
          <Text
            style={{
              marginHorizontal: 20,
              marginTop: 15,
              fontFamily: config.fonts.PrimaryFont,
              fontSize: 15,
              lineHeight: 18,
              color: config.colors.lightGrey2Color,
            }}
          >
            {"4 People"}
          </Text>
          <View
            style={{
              height: 10,
              borderBottomWidth: 1,
              borderColor: config.colors.borderColor,
            }}
          ></View>

          <Text
            style={{
              marginHorizontal: 20,
              marginVertical: 25,
              fontFamily: config.fonts.HeadingFont,
              fontSize: 15,
              lineHeight: 18,
              color: config.colors.blackColor,
            }}
          >
            {"Special Request & Note for Local"}
          </Text>
          <View
            style={{
              marginHorizontal: 20,
              borderWidth: 1,
              borderColor: config.colors.borderColor,
              borderRadius: 12,
              paddingHorizontal: 12,
              paddingVertical: 12,
            }}
          >
            <Text
              style={{
                fontFamily: config.fonts.PrimaryFont,
                fontSize: 12,
                lineHeight: 15,
                color: config.colors.lightGrey2Color,
              }}
            >{`I use a wheelchair and require accessible transportation and  accommodation. Please ensure that all venues and activities are  wheelchair-friendly, thanks! `}</Text>
          </View>
          <View
            style={{
              marginTop: 25,
              height: 10,
              borderBottomWidth: 1,
              borderColor: config.colors.borderColor,
            }}
          ></View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default UserTripDetail;

const styles = StyleSheet.create({});
