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
import React, { useEffect, useState } from "react";
import config from "../../config";
import AppTextInput from "../../components/AppTextInput";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AppButton from "../../components/AppButton";
import { useDispatch, useSelector } from "react-redux";
import {
  UserCreateTripReducer,
  UserGetProfileReducer,
} from "../../redux/reducers";
import Toast from "react-native-toast-message";
import { SagaActions } from "../../redux/sagas/SagaActions";
import moment from "moment";

const UserCreateTrip = ({ navigation }) => {
  const dispatch = useDispatch();
  const userCreateTripResponse = useSelector(
    UserCreateTripReducer.selectUserCreateTripData
  );
  const userCreateTripErrorResponse = useSelector(
    UserCreateTripReducer.selectUserCreateTripResponse
  );
  const userGetProfileResponse = useSelector(
    UserGetProfileReducer.selectUserGetProfileData
  );
  const [numberOfGuest, setNumberOfGuest] = useState("");
  const [destination, setDestination] = useState([{ id: 1, value: "" }]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [writeNotes, setWriteNotes] = useState("");
  const [selectActivity, setSelectActivity] = useState("All");
  const [activities, setActivities] = useState([]);
  const [inputCount, setInputCount] = useState(1);
  const [selectSpatialCare, setSelectSpatialCare] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const isAllSelected = activities.length == 5;
  console.log("isAllSelected", isAllSelected);
  console.log("activities", activities, activities.length);
  const activitiesList = [
    "Camping",
    "Wildlife Viewing",
    "Bonfire",
    "Boat Tourink",
    "Hiking",
  ];

  // useEffect(() => {
  //   Toast.show({
  //     type: 'custom',
  //     text1: 'Coming Soon.',
  //   });
  //   navigation.goBack();
  // }, []);
  //hooks call
  useEffect(() => {
    if (userCreateTripResponse != null) {
      if (userCreateTripResponse?.error == false) {
        Toast.show({
          type: "custom",
          text1: userCreateTripResponse?.message,
        });
        setDestination(''),
          setStartDate(''),
          setEndDate(''),
          setNumberOfGuest(''),
          setActivities(''),
          setSelectSpatialCare(''),
          setWriteNotes(''),
          navigation.goBack();
        console.log("userCreateTripResponse", userCreateTripResponse);
        dispatch(UserCreateTripReducer.removeUserCreateTripResponse());
      }
    }
  }, [userCreateTripResponse]);

  useEffect(() => {
    if (userCreateTripErrorResponse != null) {
      if (userCreateTripErrorResponse?.error != "") {
        Toast.show({
          type: "custom",
          text1: userCreateTripErrorResponse?.message,
        });
      }
    }
  }, [userCreateTripErrorResponse]);

  //function call

  const addSelectActivity = (val) => {
    var tempArray = [...activities];
    var newIndex = tempArray.indexOf(val);
    if (newIndex !== -1) {
      tempArray.splice(newIndex, 1);
    } else {
      tempArray.push(val);
    }

    setActivities(tempArray);
  };

  const addSpatialCare = (val) => {
    var tempArray = [...selectSpatialCare];
    var newIndex = tempArray.indexOf(val);
    if (newIndex !== -1) {
      tempArray.splice(newIndex, 1);
    } else {
      tempArray.push(val);
    }

    setSelectSpatialCare(tempArray);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setActivities([]);
    } else {
      setActivities([...activitiesList]);
    }
    setSelectAll(!selectAll);
  };

  const today = new Date();

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    setShowStartDate(false);
    setTimeout(() => {
      setStartDate(moment(date).format("YYYY-MM-DD"));
    }, 100);
  };

  const handleEndDateConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    setShowEndDate(false);
    setTimeout(() => {
      setEndDate(moment(date).format("YYYY-MM-DD"));
    }, 100);
  };
  const addInput = () => {
    setDestination([...destination, { id: inputCount + 1, value: "" }]);
    setInputCount(inputCount + 1);
  };

  const handleInputChange = (text, id) => {
    const newInputs = destination.map((input) => {
      if (input.id === id) {
        return { ...input, value: text };
      }
      return input;
    });
    setDestination(newInputs);
  };

  const handleStartDateCancel = () => {
    setShowStartDate(false);
  };
  const handleEndDateCancel = () => {
    setShowEndDate(false);
  };

  const startDatePickerModal = () => {
    return (
      <DateTimePickerModal
        isVisible={showStartDate}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={handleStartDateCancel}
        minimumDate={today}
      />
    );
  };

  const endDatePickerModal = () => {
    return (
      <DateTimePickerModal
        isVisible={showEndDate}
        mode="date"
        onConfirm={handleEndDateConfirm}
        onCancel={handleEndDateCancel}
        minimumDate={today}
      />
    );
  };

  // api call

  const callUserCreateTripApi = () => {
    const payload = {
      Destination: destination,
      startDate: startDate,
      endDate: endDate,
      noGuest: numberOfGuest,
      activities: activities,
      needs: selectSpatialCare,
      notes: writeNotes,
    };
    dispatch({ type: SagaActions.USER_CREATE_TRIP, payload });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: config.colors.white,
      }}
    >
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={config.colors.white}
      />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{
            fontFamily: config.fonts.SemiboldFont,
            fontSize: 22,
            marginTop: 15,
            textAlign: "center",
            lineHeight: 28,
            color: config.colors.blackColor,
          }}
        >{`Welcome, ${userGetProfileResponse?.results?.user?.fullName}`}</Text>
        <Text
          style={{
            marginTop: 8,
            fontFamily: config.fonts.MediumFont,
            fontSize: 14,
            textAlign: "center",
            lineHeight: 21,
            color: config.colors.lightGrey2Color,
          }}
        >{`Enter your details below to create your trip`}</Text>

        <View
          style={{
            marginTop: 20,
          }}
        >
          <AppTextInput
            placeholder="No. of Guests"
            keyboardType="numeric"
            onChangeText={(val) => setNumberOfGuest(val.replace(/[^0-9]/g, ""))}
            value={numberOfGuest}
            leftIconStyle={{ height: 20, width: 20, resizeMode: "contain" }}
            leftIcon={config.images.USER_ICON}
          />
        </View>

        {/* <View
        style={{
          marginTop: 12,
        }}>
        <AppTextInput
          placeholder="Enter Destination"
          keyboardType={'default'}
          onChangeText={val => setDestination(val)}
          value={destination}
          leftIcon={config.images.LOCATION}
          leftIconStyle={{
            tintColor: config.colors.lightGrey2Color,
          }}
        />
      </View> */}

        {destination.map((input, index) => (
          <View
            style={{
              marginTop: 12,
            }}
            key={index}
          >
            <AppTextInput
              placeholder="Enter Destination"
              keyboardType={"default"}
              onChangeText={(text) => handleInputChange(text, input.id)}
              value={input?.value}
              leftIconStyle={{ height: 20, width: 20, resizeMode: "contain" }}
              leftIcon={config.images.LOCATION1}
            />
            {/* <TextInput
              style={styles.input}
              placeholder={`Enter Destination ${index + 1}`}
              keyboardType="default"
              onChangeText={text => handleInputChange(text, input.id)}
              value={input.value}
            /> */}
          </View>
        ))}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <View
            style={{
              height: 50,
              marginTop: 15,
              borderRadius: 12,
              flexDirection: "row",
              // justifyContent:',
              alignItems: "center",
              width: "45%",
              borderWidth: 1,
              borderColor: config.colors.lightGreyColor,
            }}
          >
            <Image
              source={config.images.CALENDAR_ICON}
              style={{
                height: 16,
                width: 16,
                tintColor: config.colors.lightGrey2Color,
                resizeMode: "contain",
                marginHorizontal: 20,
              }}
            />
            <Text
              style={{
                fontFamily: config.fonts.MediumFont,
                fontSize: 14,
                lineHeight: 16,
                color: config.colors.lightGrey2Color,
              }}
              onPress={() => setShowStartDate(true)}
            >
              {startDate != "" ? startDate : `Start Date`}
            </Text>
          </View>
          <View
            style={{
              height: 50,
              marginTop: 15,
              borderRadius: 12,
              flexDirection: "row",
              // justifyContent:',
              alignItems: "center",
              width: "45%",
              borderWidth: 1,
              borderColor: config.colors.lightGreyColor,
            }}
          >
            <Image
              source={config.images.CALENDAR_ICON}
              style={{
                height: 16,
                width: 16,
                tintColor: config.colors.lightGrey2Color,
                resizeMode: "contain",
                marginHorizontal: 20,
              }}
            />
            <Text
              style={{
                fontFamily: config.fonts.MediumFont,
                fontSize: 14,
                lineHeight: 16,
                color: config.colors.lightGrey2Color,
              }}
              onPress={() => setShowEndDate(true)}
            >
              {endDate != "" ? endDate : `End Date`}
            </Text>
          </View>
        </View>

        <AppButton
          text={"Add Another Destination"}
          onPress={() => {
            if (destination?.[destination.length - 1]?.value != "") {
              addInput();
            }
          }}
          buttonStyle={{ marginVertical: 20 }}
        />

        <View
          style={{
            // padding: 8, // Also used to make it look nicer
            zIndex: 0,
            height: 90,
            paddingHorizontal: 10,
            borderRadius: 4,
            // alignItems: 'center',
            marginVertical: 5,
            borderColor: config.colors.lightGreyColor,
            borderWidth: 1,
            borderRadius: 12,
          }}
        >
          <TextInput
            multiline={true}
            placeholder="Add note for local.."
            placeholderTextColor={config.colors.lightGrey2Color}
            onChangeText={(val) => setWriteNotes(val)}
            value={writeNotes}
          />
        </View>
        {/* <AppTextInput
          viewStyle={{
            padding: 8, // Also used to make it look nicer
            zIndex: 0,
            height: 90,
            borderRadius: 4,
            // alignItems: 'center',
            marginVertical: 5,
            borderColor: config.colors.lightGreyColor,
            borderWidth: 1,
            borderRadius: 12,
            paddingHorizontal: 12,
          }}
          placeholder="Add note for local..."
          keyboardType={'default'}
          multiline={true}
          onChangeText={val => setWriteNotes(val)}
          value={writeNotes}
        /> */}

        <Text
          style={{
            marginTop: 15,
            fontFamily: config.fonts.SemiboldFont,
            fontSize: 15,
            lineHeight: 18,
            color: config.colors.blackColor,
          }}
        >{`What to do in your trip?`}</Text>

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
                isAllSelected || activities?.length == 5
                  ? config.colors.yellowColor
                  : config.colors.white,
            }}
            onPress={() => {
              handleSelectAll();
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontFamily: config.fonts.SemiboldFont,
                lineHeight: 14,
                color: isAllSelected
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
              backgroundColor: activities.includes("Camping")
                ? config.colors.yellowColor
                : config.colors.white,
            }}
            onPress={() => {
              setSelectActivity("Camping");
              addSelectActivity("Camping");
            }}
          >
            <Image
              source={config.images.CAMPING_ICON}
              style={{
                height: 20,
                width: 20,
                marginRight: 5,
                tintColor: activities?.includes("Camping")
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
                color: activities?.includes("Camping")
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
              backgroundColor: activities?.includes("Wildlife Viewing")
                ? config.colors.yellowColor
                : config.colors.white,
            }}
            onPress={() => {
              addSelectActivity("Wildlife Viewing");
            }}
          >
            <Image
              source={config.images.WILDLIFE_ICON}
              style={{
                height: 20,
                width: 20,
                marginRight: 5,
                tintColor: activities?.includes("Wildlife Viewing")
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
                color: activities?.includes("Wildlife Viewing")
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
              backgroundColor: activities?.includes("Bonfire")
                ? config.colors.yellowColor
                : config.colors.white,
            }}
            onPress={() => {
              addSelectActivity("Bonfire");
            }}
          >
            <Image
              source={config.images.BONFIRE_ICON}
              style={{
                height: 20,
                width: 20,
                marginRight: 5,
                tintColor: activities?.includes("Bonfire")
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
                color: activities?.includes("Bonfire")
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
              backgroundColor: activities?.includes("Boat Tourink")
                ? config.colors.yellowColor
                : config.colors.white,
            }}
            onPress={() => {
              addSelectActivity("Boat Tourink");
            }}
          >
            <Image
              source={config.images.BOATING_ICON}
              style={{
                height: 20,
                width: 20,
                marginRight: 5,
                tintColor: activities?.includes("Boat Tourink")
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
                color: activities?.includes("Boat Tourink")
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
              backgroundColor: activities?.includes("Hiking")
                ? config.colors.yellowColor
                : config.colors.white,
            }}
            onPress={() => {
              addSelectActivity("Hiking");
            }}
          >
            <Image
              source={config.images.HIKING_ICON}
              style={{
                height: 20,
                width: 20,
                marginRight: 5,
                tintColor: activities?.includes("Hiking")
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
                color: activities?.includes("Hiking")
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
              backgroundColor: selectSpatialCare?.includes("Wheelchair")
                ? config.colors.yellowColor
                : config.colors.white,
            }}
            onPress={() => {
              addSpatialCare("Wheelchair");
            }}
          >
            <Image
              source={config.images.WHEELCHAIR_ICON}
              style={{
                height: 20,
                width: 20,
                marginRight: 5,
                tintColor: selectSpatialCare?.includes("Wheelchair")
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
                color: selectSpatialCare?.includes("Wheelchair")
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
              backgroundColor: selectSpatialCare?.includes("Blind")
                ? config.colors.yellowColor
                : config.colors.white,
            }}
            onPress={() => {
              addSpatialCare("Blind");
            }}
          >
            <Image
              source={config.images.CLOSE_EYE_ICON}
              style={{
                height: 20,
                width: 20,
                marginRight: 5,
                tintColor: selectSpatialCare?.includes("Blind")
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
                color: selectSpatialCare?.includes("Blind")
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
              backgroundColor: selectSpatialCare?.includes("Any Injuries")
                ? config.colors.yellowColor
                : config.colors.white,
            }}
            onPress={() => {
              addSpatialCare("Any Injuries");
            }}
          >
            <Image
              source={config.images.BANDAIDS_ICON}
              style={{
                height: 20,
                width: 20,
                marginRight: 5,
                tintColor: selectSpatialCare?.includes("Any Injuries")
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
                color: selectSpatialCare?.includes("Any Injuries")
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
              backgroundColor: selectSpatialCare?.includes("Deaf")
                ? config.colors.yellowColor
                : config.colors.white,
            }}
            onPress={() => {
              addSpatialCare("Deaf");
            }}
          >
            <Image
              source={config.images.CLOSE_EAR_ICON}
              style={{
                height: 20,
                width: 20,
                marginRight: 5,
                tintColor: selectSpatialCare?.includes("Deaf")
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
                color: selectSpatialCare?.includes("Deaf")
                  ? config.colors.white
                  : config.colors.yellowColor,
              }}
            >{`Deaf`}</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: 20,
            width: "100%",
            alignItems: "center",
            marginVertical: 20,
            flexDirection: "row",
            alignItems: "center",
            // justifyContent:'space-between'
          }}
        >
          <TouchableOpacity
            style={{
              height: 23,
              width: 23,
              resizeMode: "contain",
            }}
            onPress={() => setToggle(!toggle)}
          >
            <Image
              source={
                toggle ? config.images.CHECK_ICON : config.images.UNCHECK_ICON
              }
              style={{
                marginTop: 2,
                height: toggle ? 23 : 21,
                width: toggle ? 23 : 21,
                resizeMode: "contain",
                marginRight: 6,
              }}
            />
          </TouchableOpacity>

          <Text
            style={{
              fontFamily: config.fonts.PrimaryFont,
              fontSize: 12,
              lineHeight: 19,
              color: config.colors.lightGrey2Color,
            }}
          >
            {`  I Agree to the  `}
          </Text>

          <Text
            style={{
              textDecorationLine: "underline",
              textDecorationColor: config.colors.primaryColor,
              fontFamily: config.fonts.HeadingFont,
              fontSize: 12,
              lineHeight: 19,
              color: config.colors.primaryColor,
            }}
          >
            {`Terms of Service`}
          </Text>

          <Text
            style={{
              textDecorationLine: "none",
              textDecorationColor: config.colors.white,
              fontFamily: config.fonts.PrimaryFont,
              fontSize: 12,
              lineHeight: 19,
              color: config.colors.lightGrey2Color,
            }}
          >
            {`  &  `}
          </Text>

          <Text
            style={{
              textDecorationLine: "underline",
              textDecorationColor: config.colors.primaryColor,
              fontFamily: config.fonts.HeadingFont,
              fontSize: 12,
              lineHeight: 19,
              color: config.colors.primaryColor,
            }}
          >{`Privacy Policy`}</Text>
        </View>

        <AppButton
          text={"Submit"}
          onPress={() => callUserCreateTripApi()}
          buttonStyle={{
            marginVertical: 20,
          }}
        />

        <TouchableOpacity
          style={{
            marginBottom: 20,
            height: 44,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: config.colors.yellowColor,
            borderRadius: 12,
          }}
          onPress={() => navigation.goBack()}
        >
          <Text
            style={{
              fontFamily: config.fonts.HeadingFont,
              fontSize: 16,
              lineHeight: 24,
              color: config.colors.yellowColor,
            }}
          >{`Later`}</Text>
        </TouchableOpacity>
        {startDatePickerModal()}
        {endDatePickerModal()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserCreateTrip;

const styles = StyleSheet.create({});
