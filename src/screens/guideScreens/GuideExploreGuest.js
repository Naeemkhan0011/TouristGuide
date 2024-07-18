import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import config from "../../config";
import AppHeader from "../../components/AppHeader";

const GuideExploreGuest = ({ navigation }) => {
  const [search, setSearch] = useState("");
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
        title={"Explore Guests"}
        tintColor={config.colors.white}
        backgroundColor={config.colors.primaryColor}
      />
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
              placeholder={`Search`}
              keyboardType={"default"}
              placeholderTextColor={config.colors.blackColor}
              value={search}
              returnKeyType="done"
              onChangeText={(val) => {
                console.log("hello");
                // debouncedFetchSuggestions(val);
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
            // setFilterModalVisible(true);
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
          marginTop: 20,
          flex: 1,
          backgroundColor: config.colors.white,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}
      >
        <View
          style={{
            marginTop:15,

            height: 106,
            borderRadius: 12,
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 20,
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
            marginTop:15,

            height: 106,
            borderRadius: 12,
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 20,
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
            marginTop:15,

            height: 106,
            borderRadius: 12,
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 20,
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
            marginTop:15,

            height: 106,
            borderRadius: 12,
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 20,
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
      </View>
    </SafeAreaView>
  );
};

export default GuideExploreGuest;

const styles = StyleSheet.create({});
