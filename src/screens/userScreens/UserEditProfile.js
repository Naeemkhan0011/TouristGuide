import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import AppHeader from "../../components/AppHeader";
import { CountryPicker } from "react-native-country-codes-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { launchImageLibrary } from "react-native-image-picker";
import config from "../../config";
import AppTextInput from "../../components/AppTextInput";
import AppButton from "../../components/AppButton";
import moment from "moment";

const UserEditProfile = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [about, setAbout] = useState("");
  const [date_of_birth, setDate_of_birth] = useState("");
  const [showCountryCode, setShowCountryCode] = useState(false);
  const [countryCodeModal, setCountryCodeModal] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [countryCode, setCountryCode] = useState("");
  const [countryFlag, setCountryFlag] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [passportImageObj, setPassportImageObj] = useState("");
  const [passportImage, setPassportImage] = useState(null);
  const [showPassportImage, setShowPassportImage] = useState(false);

  const [filePathArray, setFilePathArray] = useState([]);
  const [aboutText, setAboutText] = useState("");
  const [numberOfGuest, setNumberOfGuest] = useState("");
  const [activity, setActivity] = useState("");
  const [spatialNeed, setSpatialNeed] = useState("");
  const [activityDropDown, setActivityDropDown] = useState(false);

  const selectPassportImage = () => {
    console.log("hii");
    setTimeout(() => {
      const options = {
        // selectionLimit: 0,
        mediaType: "photo",
        includeBase64: false,
      };
      launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.error) {
          console.log("ImagePicker Error: ", response.error);
        } else {
          let imgObj = {
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            name: response.assets[0].fileName,
          };
          setPassportImage([response.assets[0].uri]);
          setPassportImageObj(imgObj);
          console.log(imgObj.name);
          console.log(response.assets[0].fileName);
        }
      });
    }, 100);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const handleConfirm = (date) => {
    console.log("A date has been picked: ", date);
    setDatePickerVisibility(false);
    setTimeout(() => {
      setDate_of_birth(moment(date).format("DD/MM/YYYY"));
    }, 100);
  };

  const CountryCodeModal = () => {
    return (
      <CountryPicker
        onRequestClose={() => {
          setShowCountryCode(!showCountryCode);
        }}
        style={{
          modal: {
            height: config.constants.Height / 2.5,
          },
        }}
        show={showCountryCode}
        // when picker button press you will get the country object with dial code
        pickerButtonOnPress={(item) => {
          setCountryCode(item.dial_code);
          setCountry(item?.name?.en);
          setCountryFlag(item?.flag);
          console.log("code", item);
          setShowCountryCode(false);
        }}
      />
    );
  };

  const DatePickerModal = () => {
    return (
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => {
          setDatePickerVisibility(false);
        }}
      />
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
        title={"Edit Profile"}
        tintColor={config.colors.white}
        backgroundColor={config.colors.primaryColor}
      />
      {/* <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
      style={{
        // backgroundColor: 'blue',
        flex: 1,
      }}
    > */}
      <ScrollView automaticallyAdjustKeyboardInsets={true}>
        <View
          style={{
            paddingHorizontal: 20,
            flex: 1,
            backgroundColor: config.colors.white,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          }}
        >
          <View
            style={{
              height: 100,
              width: 100,
              shadowColor: "#000000",
              elevation: 0.5,
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.8,
              shadowRadius: 1,
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              marginVertical: 20,
              backgroundColor: config.colors.whiteSmokeColor,
              borderRadius: 100,
            }}
          >
            <TouchableOpacity
              style={{
                height: 31,
                width: 31,
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: config.colors.yellowColor,
              }}
            >
              <Image
                source={config.images.CAMERA_ICON}
                style={{
                  height: 14,
                  width: 14,
                  resizeMode: "contain",
                  tintColor: config.colors.white,
                }}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputCss1}>
            <AppTextInput
              style={{
                height: 52,
                width: "90%",
                lineHeight: 18,
                fontSize: 14,
                color: config.colors.blackColor,
                fontFamily: config.fonts.MediumFont,
              }}
              placeholder="Full Name"
              keyboardType={"default"}
              onChangeText={(val) =>
                setFirstName(val.replace(/[^a-zA-Z ]/g, ""))
              }
              value={firstName}
              leftIconStyle={{
                tintColor: config.colors.yellowColor,
              }}
              leftIcon={config.images.USER_ICON}
            />
          </View>

          <View
            style={{
              marginTop: 12,
            }}
          >
            <View
              style={{
                padding: 8, // Also used to make it look nicer
                zIndex: 0,
                flexDirection: "row",
                height: 52,
                borderRadius: 4,
                alignItems: "center",
                marginVertical: 5,
                borderColor: config.colors.lightGreyColor,
                borderWidth: 1,
                borderRadius: 12,
                paddingHorizontal: 12,
              }}
            >
              <TouchableOpacity
                style={{ paddingHorizontal: 9, flexDirection: "row" }}
                onPress={() => {
                  setShowCountryCode(true);
                }}
              >
                <Text
                  style={{
                    fontFamily: config.fonts.MediumFont,
                    fontSize: 14,
                    lineHeight: 16,
                    color: config.colors.lightGrey2Color,
                  }}
                >
                  {countryFlag ? countryFlag : "🇸🇦"}
                </Text>
                <Text
                  style={{
                    marginHorizontal: 6,
                    fontFamily: config.fonts.MediumFont,
                    fontSize: 14,
                    lineHeight: 16,
                    color: config.colors.lightGrey2Color,
                  }}
                >
                  {countryCode ? countryCode : "+966"}
                </Text>
                <Image
                  source={config.images.RIGHT_ARROW}
                  style={{
                    height: 20,
                    width: 20,
                    resizeMode: "contain",
                    tintColor: config.colors.lightGrey2Color,
                    transform: [{ rotate: "90deg" }],
                  }}
                />
              </TouchableOpacity>
              <View style={{ width: "60%" }}>
                <TextInput
                  style={{
                    height: 52,
                    width: "90%",
                    fontSize: 14,
                    color: config.colors.blackColor,
                    fontFamily: config.fonts.PrimaryFont,
                  }}
                  placeholder="Mobile Number"
                  placeholderTextColor={config.colors.lightGrey2Color}
                  keyboardType="numeric"
                  maxLength={16}
                  returnKeyType="done"
                  value={mobileNumber}
                  onChangeText={(val) => setMobileNumber(val)}
                />
              </View>
            </View>
          </View>

          <View style={styles.inputCss1}>
            <AppTextInput
              placeholder="Email address"
              keyboardType={"default"}
              onChangeText={(val) => setEmail(val)}
              value={email}
              leftIconStyle={{
                tintColor: config.colors.yellowColor,
              }}
              leftIcon={config.images.EMAIL_ICON}
            />
          </View>

          <View
            style={{
              marginTop: 12,
              height: 52,
              borderRadius: 4,
              marginVertical: 5,
              borderColor: config.colors.lightGreyColor,
              borderWidth: 1,
              justifyContent: "center",
              borderRadius: 12,
              paddingHorizontal: 12,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => {
                showDatePicker();
                // setShow(true)
              }}
            >
              <View style={{ width: "12%" }}>
                <Image
                  source={config.images.CALENDAR_ICON}
                  style={{
                    width: 18,
                    height: 18,
                    tintColor: config.colors.yellowColor,
                    resizeMode: "contain",
                    marginHorizontal: 7,
                  }}
                />
              </View>
              <Text
                style={{
                  fontFamily: config.fonts.MediumFont,
                  fontSize: 14,
                  lineHeight: 19,
                  color: config.colors.lightGrey2Color,
                }}
              >{`${date_of_birth ? date_of_birth : "Date of Birth"}`}</Text>
            </TouchableOpacity>
          </View>

          {/* <View style={styles.inputCss1}>
            <AppTextInput
              style={{
                height: 52,
                width: '90%',
                fontSize: 14,
                color: config.colors.blackColor,
                fontFamily: config.fonts.PrimaryFont,
              }}
              placeholder="Country"
              keyboardType={'default'}
              onChangeText={val => setCity(val)}
              value={city}
              leftIconStyle={{
                tintColor: config.colors.yellowColor,
              }}
              leftIcon={config.images.POPULAR_TRIP}
            />
          </View> */}

          <View
            style={{
              marginTop: 12,
              height: 52,
              borderRadius: 4,
              marginVertical: 5,
              borderColor: config.colors.lightGreyColor,
              borderWidth: 1,
              justifyContent: "center",
              borderRadius: 12,
              paddingHorizontal: 12,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={{ width: "12%" }}>
                <Image
                  source={config.images.PASSPORT1}
                  style={{
                    width: 24,
                    height: 24,
                    resizeMode: "contain",
                    marginHorizontal: 5,
                  }}
                />
              </View>
              <View
                style={{
                  width: "75%",
                }}
              >
                <TextInput
                  style={{
                    fontFamily: config.fonts.MediumFont,
                    fontSize: 14,
                    lineHeight: 19,
                    color: config.colors.lightGrey2Color,
                  }}
                  // onFocus={() => selectPassportImage()}
                  value={country}
                  placeholder="Country"
                  placeholderTextColor={config.colors.lightGrey2Color}
                  editable={false}
                />
              </View>
              <TouchableOpacity
                style={{ width: "12%" }}
                onPress={() => {
                  setShowCountryCode(true);
                }}
              >
                <Image
                  source={config.images.RIGHT_ARROW}
                  style={{
                    width: 20,
                    height: 20,
                    transform: [{ rotate: "90deg" }],
                    tintColor: config.colors.lightGrey2Color,
                    resizeMode: "contain",
                    marginHorizontal: 5,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputCss1}>
            <AppTextInput
              placeholder="* * * * * *"
              keyboardType={"default"}
              onChangeText={(val) => setCity(val)}
              value={city}
              leftIconStyle={{
                tintColor: config.colors.yellowColor,
              }}
              leftIcon={config.images.UPDATE_PASSWORD}
            />
          </View>

          <View
            style={{
              marginTop: 12,
              height: 52,
              borderRadius: 4,
              marginVertical: 5,
              borderColor: config.colors.lightGreyColor,
              borderWidth: 1,
              justifyContent: "center",
              borderRadius: 12,
              paddingHorizontal: 12,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => {
                selectPassportImage();
                // setShow(true)
              }}
            >
              <View style={{ width: "12%" }}>
                <Image
                  source={config.images.PASSPORT1}
                  style={{
                    width: 24,
                    height: 24,
                    resizeMode: "contain",
                    marginHorizontal: 5,
                  }}
                />
              </View>
              <View
                style={{
                  width: "75%",
                }}
              >
                <TextInput
                  style={{
                    fontFamily: config.fonts.MediumFont,
                    fontSize: 14,
                    lineHeight: 19,
                    color: config.colors.lightGrey2Color,
                  }}
                  // onFocus={() => selectPassportImage()}
                  value={passportImage}
                  placeholder="Select Passport Image"
                  placeholderTextColor={config.colors.lightGrey2Color}
                  editable={false}
                />
                {/* <Text
                onPress={() => {
                  selectPassportImage()
                }}
                  style={{
                    fontFamily: config.fonts.MediumFont,
                    fontSize: 14,
                    lineHeight: 19,
                    color: config.colors.lightGrey2Color,
                  }}>{`${
                  passportImage ? passportImage : 'Select Passport Image'
                }`}</Text> */}
              </View>
              <TouchableOpacity
                style={{ width: "12%" }}
                onPress={() => {
                  setShowPassportImage(!showPassportImage);
                }}
              >
                <Image
                  source={
                    passportImage
                      ? config.images.CLOSE_EYE_ICON
                      : config.images.EYE_ICON
                  }
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: config.colors.lightGrey2Color,
                    resizeMode: "contain",
                    marginHorizontal: 5,
                  }}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>

          {/* <Text
            style={{
              marginVertical: 18,
              fontFamily: config.fonts.SemiboldFont,
              fontSize: 16,
              color: config.colors.blackColor,
              lineHeight: 18,
            }}>{`Other Information`}</Text>
         
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
          {activityDropDown && (
            <>
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
                    height: 20,
                    width: 20,
                    tintColor:
                      activity == 'Rock Climbing'
                        ? config.colors.yellowColor
                        : '',
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
                    height: 20,
                    width: 20,
                    tintColor:
                      activity == 'Hiking' ? config.colors.yellowColor : '',
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
                        : '',
                    height: 20,
                    width: 20,
                    resizeMode: 'contain',
                    marginRight: 10,
                  }}
                />
              </TouchableOpacity>
            </>
          )}

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
                backgroundColor: spatialNeed == 'Wheelchair' ? config.colors.yellowColor : config.colors.white
              }} onPress={() => {
                setSpatialNeed('Wheelchair')
              }}>
              <Image
                source={config.images.WHEELCHAIR_ICON}
                style={{
                  height: 20,
                  width: 20,
                  resizeMode: 'contain',
                  tintColor: spatialNeed == 'Wheelchair' ? config.colors.white :config.colors.yellowColor,
                  marginRight: 7,
                }}
              />

              <Text
                style={{
                  fontFamily: config.fonts.SemiboldFont,
                  fontSize: 12,
                  lineHeight: 18,
                  color: spatialNeed == 'Wheelchair' ? config.colors.white :config.colors.yellowColor,
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
                backgroundColor: spatialNeed == 'Blind' ? config.colors.yellowColor : config.colors.white,
              }} onPress={() => {
                setSpatialNeed('Blind')
              }}>
              <Image
                source={config.images.CLOSE_EYE_ICON}
                style={{
                  height: 20,
                  width: 20,
                  resizeMode: 'contain',
                  tintColor:spatialNeed == 'Blind' ? config.colors.white :config.colors.yellowColor,
                  marginRight: 7,
                }}
              />

              <Text
                style={{
                  fontFamily: config.fonts.SemiboldFont,
                  fontSize: 12,
                  lineHeight: 18,
                  color: spatialNeed == 'Blind' ? config.colors.white :config.colors.yellowColor,
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
                backgroundColor: spatialNeed == 'Any Injuries' ? config.colors.yellowColor :config.colors.white,
              }} onPress={() => {
                setSpatialNeed('Any Injuries')
              }}>
              <Image
                source={config.images.BANDAIDS_ICON}
                style={{
                  height: 20,
                  width: 20,
                  resizeMode: 'contain',
                  tintColor: spatialNeed == 'Any Injuries' ? config.colors.white :config.colors.yellowColor,
                  marginRight: 7,
                }}
              />

              <Text
                style={{
                  fontFamily: config.fonts.SemiboldFont,
                  fontSize: 12,
                  lineHeight: 18,
                  color: spatialNeed == 'Any Injuries' ? config.colors.white :config.colors.yellowColor,
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
                backgroundColor: spatialNeed == 'Deaf' ? config.colors.yellowColor :config.colors.white,
              }} onPress={() => {
                setSpatialNeed('Deaf')
              }}>
              <Image
                source={config.images.CLOSE_EAR_ICON}
                style={{
                  height: 20,
                  width: 20,
                  resizeMode: 'contain',
                  tintColor: spatialNeed == 'Deaf' ? config.colors.white :config.colors.yellowColor,
                  marginRight: 7,
                }}
              />

              <Text
                style={{
                  fontFamily: config.fonts.SemiboldFont,
                  fontSize: 12,
                  lineHeight: 18,
                  color: spatialNeed == 'Deaf' ? config.colors.white :config.colors.yellowColor,
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
            }}>{`Trip Memories`}</Text>

          <TouchableOpacity
            style={{
             marginVertical:20
             
            }}
            onPress={() => {
              selectImage();
            }}>
           
              {filePathArray?.length != 0 ? (
                 <>
                 {filePathArray?.slice(0,50)?.map((item, index) => {
                   return (
                     <View 
                     style={{
                     width:'100%',
                      flexDirection:  'row' ,
                      flexWrap: 'wrap' ,
                      marginHorizontal:8,
                      marginVertical:5,

                     }}
                     key={index}>
                      <View style={{
                        height: 150, width: 150,marginLeft:6,marginTop:7,backgroundColor:'pink'
                      }}></View>
                      
                     </View>
                   );
                 })}
               </>
              ) : (
                <Text
                style={{
                  fontFamily: config.fonts.PrimaryFont,
                  fontSize: 12,
                  lineHeight: 14,
                  color: config.colors.greyColor,
                }}>
                `Upload trip memories (min. 2)`
                </Text>
               
              )}
          </TouchableOpacity>
 */}

          <AppButton
            text={"Confirm"}
            onPress={() => {
              // callCompleteProfileApi()
            }}
            buttonStyle={{
              // marginHorizontal:20,
              marginVertical: 20,
            }}
          />
        </View>
      </ScrollView>
      {/* </KeyboardAvoidingView> */}
      {CountryCodeModal()}
      {DatePickerModal()}
    </SafeAreaView>
  );
};

export default UserEditProfile;

const styles = StyleSheet.create({
  inputCss1: {
    marginTop: 12,
  },
});
