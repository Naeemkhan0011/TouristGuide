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
import React, { useState } from "react";
import config from "../../config";
import AppHeader from "../../components/AppHeader";

const TripManagement = ({ navigation }) => {
  const [isActive, setIsActive] = useState("received");

  const receivedRequest = () => {
    return (
      <View
        style={{
          flex: 1,
          marginHorizontal: 20,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            style={{
              height: 184,
              marginVertical: 10,
              borderRadius: 12,
              paddingVertical: 10,
              borderWidth: 1,
              marginTop: 20,
              borderColor: config.colors.borderColor,
            }}
            onPress={() => {
              // navigation.navigate(config.routes.USER_TRIP_DETAIL, {tripId: item?._id})
            }}
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
               
                    <Text
                      style={{
                        marginTop: 10,
                        fontFamily: config.fonts.SemiboldFont,
                        fontSize: 14,
                        lineHeight: 16,
                        color: config.colors.white,
                      }}
                    >
                      {"12/1/2022"}
                    </Text>

                <Text
                  style={{
                    fontFamily: config.fonts.HeadingFont,
                    fontSize: 14,
                    lineHeight: 21,
                    color: config.colors.white,
                  }}
                >
                  {"rahul yadav"}
                </Text>
                <Text
                  style={{
                    fontFamily: config.fonts.PrimaryFont,
                    fontSize: 14,
                    lineHeight: 23,
                    color: config.colors.white,
                  }}
                >
                  <Image
                    source={config.images.USER_ICON}
                    style={{
                      height: 12,
                      width: 10,
                      resizeMode: "contain",
                    }}
                  />
                  {`  4 Guest`}
                </Text>
                <Text
                  style={{
                    fontFamily: config.fonts.PrimaryFont,
                    fontSize: 14,
                    lineHeight: 23,
                    color: config.colors.white,
                  }}
                >
                  <Image
                    source={config.images.LOCATION_ICON}
                    style={{
                      height: 15,
                      width: 15,
                      resizeMode: "cover",
                      tintColor: config.colors.white,
                      marginRight: 8,
                    }}
                  />
                  {`  Jabal Omar Makkah, 24231`}
                </Text>
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
                >{`Reject`}</Text>
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
                >{`Accept`}</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              height: 184,
              marginVertical: 10,
              borderRadius: 12,
              paddingVertical: 10,
              borderWidth: 1,
              marginTop: 20,
              borderColor: config.colors.borderColor,
            }}
            onPress={() => {
              // navigation.navigate(config.routes.USER_TRIP_DETAIL, {tripId: item?._id})
            }}
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
               
                    <Text
                      style={{
                        marginTop: 10,
                        fontFamily: config.fonts.SemiboldFont,
                        fontSize: 14,
                        lineHeight: 16,
                        color: config.colors.white,
                      }}
                    >
                      {"12/1/2022"}
                    </Text>

                <Text
                  style={{
                    fontFamily: config.fonts.HeadingFont,
                    fontSize: 14,
                    lineHeight: 21,
                    color: config.colors.white,
                  }}
                >
                  {"rahul yadav"}
                </Text>
                <Text
                  style={{
                    fontFamily: config.fonts.PrimaryFont,
                    fontSize: 14,
                    lineHeight: 23,
                    color: config.colors.white,
                  }}
                >
                  <Image
                    source={config.images.USER_ICON}
                    style={{
                      height: 12,
                      width: 10,
                      resizeMode: "contain",
                    }}
                  />
                  {`  4 Guest`}
                </Text>
                <Text
                  style={{
                    fontFamily: config.fonts.PrimaryFont,
                    fontSize: 14,
                    lineHeight: 23,
                    color: config.colors.white,
                  }}
                >
                  <Image
                    source={config.images.LOCATION_ICON}
                    style={{
                      height: 15,
                      width: 15,
                      resizeMode: "cover",
                      tintColor: config.colors.white,
                      marginRight: 8,
                    }}
                  />
                  {`  Jabal Omar Makkah, 24231`}
                </Text>
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
                >{`Reject`}</Text>
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
                >{`Accept`}</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          
        </ScrollView>
      </View>
    );
  };

  const sentRequest = () => {
    return (
        <View
          style={{
            flex: 1,
            marginHorizontal: 20,
          }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity
              style={{
                height: 184,
                marginVertical: 10,
                borderRadius: 12,
                paddingVertical: 10,
                borderWidth: 1,
                marginTop: 20,
                borderColor: config.colors.borderColor,
              }}
              onPress={() => {
                // navigation.navigate(config.routes.USER_TRIP_DETAIL, {tripId: item?._id})
              }}
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
                 
                      <Text
                        style={{
                          marginTop: 10,
                          fontFamily: config.fonts.SemiboldFont,
                          fontSize: 14,
                          lineHeight: 16,
                          color: config.colors.white,
                        }}
                      >
                        {"12/1/2022"}
                      </Text>
  
                  <Text
                    style={{
                      fontFamily: config.fonts.HeadingFont,
                      fontSize: 14,
                      lineHeight: 21,
                      color: config.colors.white,
                    }}
                  >
                    {"rahul yadav"}
                  </Text>
                  <Text
                    style={{
                      fontFamily: config.fonts.PrimaryFont,
                      fontSize: 14,
                      lineHeight: 23,
                      color: config.colors.white,
                    }}
                  >
                    <Image
                      source={config.images.USER_ICON}
                      style={{
                        height: 12,
                        width: 10,
                        resizeMode: "contain",
                      }}
                    />
                    {`  4 Guest`}
                  </Text>
                  <Text
                    style={{
                      fontFamily: config.fonts.PrimaryFont,
                      fontSize: 14,
                      lineHeight: 23,
                      color: config.colors.white,
                    }}
                  >
                    <Image
                      source={config.images.LOCATION_ICON}
                      style={{
                        height: 15,
                        width: 15,
                        resizeMode: "cover",
                        tintColor: config.colors.white,
                        marginRight: 8,
                      }}
                    />
                    {`  Jabal Omar Makkah, 24231`}
                  </Text>
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
                  >{`Cancel`}</Text>
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
            </TouchableOpacity>
  
            <TouchableOpacity
              style={{
                height: 184,
                marginVertical: 10,
                borderRadius: 12,
                paddingVertical: 10,
                borderWidth: 1,
                marginTop: 20,
                borderColor: config.colors.borderColor,
              }}
              onPress={() => {
                // navigation.navigate(config.routes.USER_TRIP_DETAIL, {tripId: item?._id})
              }}
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
                 
                      <Text
                        style={{
                          marginTop: 10,
                          fontFamily: config.fonts.SemiboldFont,
                          fontSize: 14,
                          lineHeight: 16,
                          color: config.colors.white,
                        }}
                      >
                        {"12/1/2022"}
                      </Text>
  
                  <Text
                    style={{
                      fontFamily: config.fonts.HeadingFont,
                      fontSize: 14,
                      lineHeight: 21,
                      color: config.colors.white,
                    }}
                  >
                    {"rahul yadav"}
                  </Text>
                  <Text
                    style={{
                      fontFamily: config.fonts.PrimaryFont,
                      fontSize: 14,
                      lineHeight: 23,
                      color: config.colors.white,
                    }}
                  >
                    <Image
                      source={config.images.USER_ICON}
                      style={{
                        height: 12,
                        width: 10,
                        resizeMode: "contain",
                      }}
                    />
                    {`  4 Guest`}
                  </Text>
                  <Text
                    style={{
                      fontFamily: config.fonts.PrimaryFont,
                      fontSize: 14,
                      lineHeight: 23,
                      color: config.colors.white,
                    }}
                  >
                    <Image
                      source={config.images.LOCATION_ICON}
                      style={{
                        height: 15,
                        width: 15,
                        resizeMode: "cover",
                        tintColor: config.colors.white,
                        marginRight: 8,
                      }}
                    />
                    {`  Jabal Omar Makkah, 24231`}
                  </Text>
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
                  >{`Cancel`}</Text>
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
            </TouchableOpacity>
  
            
          </ScrollView>
        </View>
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
        navigation={navigation}
        title={"Trip Management"}
        onPress={() => navigation.goBack()}
        rightimg={config.images.NOTIFICATION}
        tintColor={config.colors.white}
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
            marginTop: 20,
            height: 60,
            flexDirection: "row",
            paddingHorizontal: 30,
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={{
              height: 45,
              width: "45%",
              justifyContent: "center",
              borderBottomWidth: 1,
              borderColor:
                isActive == "received"
                  ? config.colors.primaryColor
                  : config.colors.white,
            }}
            onPress={() => {
              setIsActive("received");
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontFamily: config.fonts.MediumFont,
                fontSize: 14,
                lineHeight: 20,
                color:
                  isActive == "received"
                    ? config.colors.blackColor
                    : config.colors.lightGrey2Color,
              }}
            >{`Received Requests`}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 45,
              width: "45%",
              justifyContent: "center",
              borderBottomWidth: 1,
              borderColor:
                isActive == "sent"
                  ? config.colors.primaryColor
                  : config.colors.white,
            }}
            onPress={() => {
              setIsActive("sent");
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontFamily: config.fonts.MediumFont,
                fontSize: 14,
                lineHeight: 20,
                color:
                  isActive == "sent"
                    ? config.colors.blackColor
                    : config.colors.lightGrey2Color,
              }}
            >{`Sent Requests`}</Text>
          </TouchableOpacity>
        </View>

        {isActive == "received"
          ? receivedRequest()
          : isActive == "sent"
          ? sentRequest()
          : null}
      </View>
    </SafeAreaView>
  );
};

export default TripManagement;

const styles = StyleSheet.create({});
