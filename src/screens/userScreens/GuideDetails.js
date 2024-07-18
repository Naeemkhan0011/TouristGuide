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
import { useDispatch, useSelector } from "react-redux";
import { UserGuideDetailReducer } from "../../redux/reducers";
import { SagaActions } from "../../redux/sagas/SagaActions";
import config from "../../config";
import AppHeader from "../../components/AppHeader";
import { useFocusEffect } from "@react-navigation/native";

const GuideDetails = ({ navigation }) => {
  const dispatch = useDispatch();
  const [activeSection, setActiveSection] = useState("Let’s Go");
  const userGuideDetailResponse = useSelector(
    UserGuideDetailReducer.selectUserGuideDetailData
  );

  //hooks call
  useEffect(() => {
    if (userGuideDetailResponse != null) {
      if (userGuideDetailResponse?.error == false) {
        console.log("userGuideDetailResponse", userGuideDetailResponse);
      }
    }
  }, [userGuideDetailResponse]);

  useFocusEffect(
    useCallback(() => {
      callGuideDetailApi()
    },[])
  )

  //api call
  const callGuideDetailApi = () => {
    const payload = {
      uri: "/" + "",
    };
    dispatch({ type: SagaActions.USER_GUIDE_DETAILS, payload });
  };

  const aboutUser = () => {
    return (
      <View style={{ height: 310 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text
            style={{
              fontFamily: config.fonts.HeadingFont,
              fontSize: 15,
              lineHeight: 18,
              color: config.colors.blackColor,
            }}
          >{`About Local`}</Text>
          <Text
            style={{
              fontFamily: config.fonts.MediumFont,
              fontSize: 12,
              lineHeight: 16,
              color: config.colors.lightGrey2Color,
            }}
          >{`As a passionate Saudi, I promise to offer you a unique  journey into the heart of Saudi culture and authenticity.  With me, you'll explore beyond the usual, diving deep into  the traditions and lives of the locals. Let's discover the true  essence of Saudi together.`}</Text>

          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontFamily: config.fonts.HeadingFont,
                fontSize: 15,
                lineHeight: 18,
                color: config.colors.blackColor,
              }}
            >{`Activities`}</Text>
            <Text
              style={{
                fontFamily: config.fonts.MediumFont,
                fontSize: 15,
                lineHeight: 18,
                color: config.colors.lightGrey2Color,
              }}
            >{`see all`}</Text>
          </View>
          <View
            style={{
              marginTop: 15,
              flexDirection: "row",
              flexWrap: "wrap",
              // marginTop: 15,
            }}
          >
            <View
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
                backgroundColor: config.colors.white,
              }}
            >
              <Image
                source={config.images.CAMPING_ICON}
                style={{
                  height: 20,
                  width: 20,
                  marginRight: 5,
                  tintColor: config.colors.yellowColor,
                  resizeMode: "contain",
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: config.fonts.SemiboldFont,
                  lineHeight: 14,
                  color: config.colors.yellowColor,
                }}
              >{`Camping`}</Text>
            </View>
            <View
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
                backgroundColor: config.colors.white,
              }}
            >
              <Image
                source={config.images.WILDLIFE_ICON}
                style={{
                  height: 20,
                  width: 20,
                  marginRight: 5,
                  tintColor: config.colors.yellowColor,
                  resizeMode: "contain",
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: config.fonts.SemiboldFont,
                  lineHeight: 14,
                  color: config.colors.yellowColor,
                }}
              >{`Wildlife Viewing`}</Text>
            </View>
            <View
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
                backgroundColor: config.colors.white,
              }}
            >
              <Image
                source={config.images.HIKING_ICON}
                style={{
                  height: 20,
                  width: 20,
                  marginRight: 5,
                  tintColor: config.colors.yellowColor,
                  resizeMode: "contain",
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: config.fonts.SemiboldFont,
                  lineHeight: 14,
                  color: config.colors.yellowColor,
                }}
              >{`Hiking`}</Text>
            </View>
            <View
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
                backgroundColor: config.colors.white,
              }}
            >
              <Image
                source={config.images.BONFIRE_ICON}
                style={{
                  height: 20,
                  width: 20,
                  marginRight: 5,
                  tintColor: config.colors.yellowColor,
                  resizeMode: "contain",
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: config.fonts.SemiboldFont,
                  lineHeight: 14,
                  color: config.colors.yellowColor,
                }}
              >{`Bonfire`}</Text>
            </View>
            <View
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
                backgroundColor: config.colors.white,
              }}
            >
              <Image
                source={config.images.BOATING_ICON}
                style={{
                  height: 20,
                  width: 20,
                  marginRight: 5,
                  tintColor: config.colors.yellowColor,
                  resizeMode: "contain",
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: config.fonts.SemiboldFont,
                  lineHeight: 14,
                  color: config.colors.yellowColor,
                }}
              >{`Boat Tourink`}</Text>
            </View>
            <View
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
                backgroundColor: config.colors.white,
              }}
            >
              <Image
                source={config.images.TREKKING_ICON}
                style={{
                  height: 20,
                  width: 20,
                  marginRight: 5,
                  tintColor: config.colors.yellowColor,
                  resizeMode: "contain",
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: config.fonts.SemiboldFont,
                  lineHeight: 14,
                  color: config.colors.yellowColor,
                }}
              >{`Trekking`}</Text>
            </View>
          </View>

          <Text
            style={{
              marginTop: 15,
              fontFamily: config.fonts.HeadingFont,
              fontSize: 15,
              lineHeight: 18,
              color: config.colors.blackColor,
            }}
          >{`I can assist with`}</Text>

          <View
            style={{
              marginTop: 15,
              flexDirection: "row",
              flexWrap: "wrap",
              // marginTop: 15,
            }}
          >
            <View
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
                backgroundColor: config.colors.white,
              }}
            >
              <Image
                source={config.images.WHEELCHAIR_ICON}
                style={{
                  height: 20,
                  width: 20,
                  marginRight: 5,
                  tintColor: config.colors.yellowColor,
                  resizeMode: "contain",
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: config.fonts.SemiboldFont,
                  lineHeight: 14,
                  color: config.colors.yellowColor,
                }}
              >{`Wheelchair`}</Text>
            </View>
            <View
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
                backgroundColor: config.colors.white,
              }}
            >
              <Image
                source={config.images.CLOSE_EYE_ICON}
                style={{
                  height: 20,
                  width: 20,
                  marginRight: 5,
                  tintColor: config.colors.yellowColor,
                  resizeMode: "contain",
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: config.fonts.SemiboldFont,
                  lineHeight: 14,
                  color: config.colors.yellowColor,
                }}
              >{`Blind`}</Text>
            </View>
            <View
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
                backgroundColor: config.colors.white,
              }}
            >
              <Image
                source={config.images.BANDAIDS_ICON}
                style={{
                  height: 20,
                  width: 20,
                  marginRight: 5,
                  tintColor: config.colors.yellowColor,
                  resizeMode: "contain",
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: config.fonts.SemiboldFont,
                  lineHeight: 14,
                  color: config.colors.yellowColor,
                }}
              >{`Any Injuries`}</Text>
            </View>
            <View
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
                backgroundColor: config.colors.white,
              }}
            >
              <Image
                source={config.images.CLOSE_EAR_ICON}
                style={{
                  height: 20,
                  width: 20,
                  marginRight: 5,
                  tintColor: config.colors.yellowColor,
                  resizeMode: "contain",
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: config.fonts.SemiboldFont,
                  lineHeight: 14,
                  color: config.colors.yellowColor,
                }}
              >{`Deaf`}</Text>
            </View>
          </View>

          <Text
            style={{
              marginTop: 15,
              fontFamily: config.fonts.HeadingFont,
              fontSize: 15,
              lineHeight: 18,
              color: config.colors.blackColor,
            }}
          >{`Packages`}</Text>
              <ScrollView horizontal={true} style={{
                flexDirection:'row',
                // width:'90%'
              }}>
        
            <View
              style={{
                marginTop: 15,
                marginRight: 10,
                padding: 20,
                // width: "100%",
                borderRadius: 8,
                backgroundColor: config.colors.primaryColor,
              }}
            >
              <View
                style={{
                  marginBottom: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: config.fonts.PrimaryFont,
                    color: config.colors.white,
                  }}
                >
                  BASIC
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: config.fonts.HeadingFont,
                    color: config.colors.white,
                  }}
                >
                  SAR 40 / 6 hrs
                </Text>
              </View>
              <View
                style={{
                  marginBottom: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <Image
                    source={config.images.CHECK_ICON}
                    style={{
                      height: 16,
                      width: 16,
                      resizeMode: "contain",
                      tintColor: config.colors.white,
                    }}
                  />
                  <Text style={styles.featureText}>{`  Hiking`}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <Image
                    source={config.images.CHECK_ICON}
                    style={{
                      height: 16,
                      width: 16,
                      resizeMode: "contain",
                      tintColor: config.colors.white,
                    }}
                  />
                  <Text style={styles.featureText}>{`  Trekking`}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <Image
                    source={config.images.CHECK_ICON}
                    style={{
                      height: 16,
                      width: 16,
                      resizeMode: "contain",
                      tintColor: config.colors.white,
                    }}
                  />
                  <Text style={styles.featureText}>{`  Boating`}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <Image
                    source={config.images.CHECK_ICON}
                    style={{
                      height: 16,
                      width: 16,
                      resizeMode: "contain",
                      tintColor: config.colors.white,
                    }}
                  />
                  <Text style={styles.featureText}>{`  Camping`}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  borderColor: config.colors.white,
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 15,
                }}
              >
                <Text style={styles.buttonText}>Choose Plan</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: 15,
                marginRight: 10,
                padding: 20,
                // width: "100%",
                borderRadius: 8,
                backgroundColor: config.colors.primaryColor,
              }}
            >
              <View
                style={{
                  marginBottom: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: config.fonts.PrimaryFont,
                    color: config.colors.white,
                  }}
                >
                  BASIC
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: config.fonts.HeadingFont,
                    color: config.colors.white,
                  }}
                >
                  SAR 40 / 6 hrs
                </Text>
              </View>
              <View
                style={{
                  marginBottom: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <Image
                    source={config.images.CHECK_ICON}
                    style={{
                      height: 16,
                      width: 16,
                      resizeMode: "contain",
                      tintColor: config.colors.white,
                    }}
                  />
                  <Text style={styles.featureText}>{`  Hiking`}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <Image
                    source={config.images.CHECK_ICON}
                    style={{
                      height: 16,
                      width: 16,
                      resizeMode: "contain",
                      tintColor: config.colors.white,
                    }}
                  />
                  <Text style={styles.featureText}>{`  Trekking`}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <Image
                    source={config.images.CHECK_ICON}
                    style={{
                      height: 16,
                      width: 16,
                      resizeMode: "contain",
                      tintColor: config.colors.white,
                    }}
                  />
                  <Text style={styles.featureText}>{`  Boating`}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <Image
                    source={config.images.CHECK_ICON}
                    style={{
                      height: 16,
                      width: 16,
                      resizeMode: "contain",
                      tintColor: config.colors.white,
                    }}
                  />
                  <Text style={styles.featureText}>{`  Camping`}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  borderColor: config.colors.white,
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 15,
                }}
              >
                <Text style={styles.buttonText}>Choose Plan</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: 15,
                marginRight: 10,
                padding: 20,
                // width: "65%",
                borderRadius: 8,
                backgroundColor: config.colors.primaryColor,
              }}
            >
              <View
                style={{
                  marginBottom: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: config.fonts.PrimaryFont,
                    color: config.colors.white,
                  }}
                >
                  BASIC
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: config.fonts.HeadingFont,
                    color: config.colors.white,
                  }}
                >
                  SAR 40 / 6 hrs
                </Text>
              </View>
              <View
                style={{
                  marginBottom: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <Image
                    source={config.images.CHECK_ICON}
                    style={{
                      height: 16,
                      width: 16,
                      resizeMode: "contain",
                      tintColor: config.colors.white,
                    }}
                  />
                  <Text style={styles.featureText}>{`  Hiking`}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <Image
                    source={config.images.CHECK_ICON}
                    style={{
                      height: 16,
                      width: 16,
                      resizeMode: "contain",
                      tintColor: config.colors.white,
                    }}
                  />
                  <Text style={styles.featureText}>{`  Trekking`}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <Image
                    source={config.images.CHECK_ICON}
                    style={{
                      height: 16,
                      width: 16,
                      resizeMode: "contain",
                      tintColor: config.colors.white,
                    }}
                  />
                  <Text style={styles.featureText}>{`  Boating`}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <Image
                    source={config.images.CHECK_ICON}
                    style={{
                      height: 16,
                      width: 16,
                      resizeMode: "contain",
                      tintColor: config.colors.white,
                    }}
                  />
                  <Text style={styles.featureText}>{`  Camping`}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  borderColor: config.colors.white,
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 15,
                }}
              >
                <Text style={styles.buttonText}>Choose Plan</Text>
              </TouchableOpacity>
            </View>
            </ScrollView>
        </ScrollView>
        <View style={{
          // width:'100%',
          marginVertical:20,
          flexDirection:'row',
          justifyContent:'space-between',

        }}>
          <TouchableOpacity style={{
            height: 44,
            width: '45%',
            justifyContent:'center',
            alignItems:'center',
            borderWidth:1,
            borderColor: config.colors.yellowColor,
            borderRadius:12
          }}>
            <Text style={{
              fontFamily: config.fonts.HeadingFont,
              fontSize:16,
              lineHeight:21,
              color: config.colors.yellowColor
            }}>{`Reject`}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            height: 44,
            width: '45%',
            justifyContent:'center',
            alignItems:'center',
            backgroundColor: config.colors.yellowColor,
            borderRadius:12
          }}>
            <Text style={{
              fontFamily: config.fonts.HeadingFont,
              fontSize:16,
              lineHeight:21,
              color: config.colors.white
            }}>{`Accept`}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const tripMemories = () => {
    return (
      <View>
        <Text>Trip Memories</Text>
      </View>
    );
  };

  const reviews = () => {
    return (
      <View style={{
        height:310
      }}>
<ScrollView>
<View style={{
  height:136,
  paddingHorizontal:12,
  flexDirection:'row',
  justifyContent:'space-between',
  borderRadius:12,
  backgroundColor: config.colors.whiteSmokeColor
}}>
  <View style={{
    width:'60%',
    // backgroundColor:'pink'
  }}>
    <View style={{
     marginTop:8,
      flexDirection:'row'
    }}>
     <Text style={{
      fontFamily: config.fonts.MediumFont,
      fontSize: 14,
      lineHeight:17,
      color: config.colors.blackColor
    }}>{`5`}</Text>
    <Image source={config.images.STAR_ICON}
    style={{height:16,width:16,marginHorizontal:5, resizeMode:'contain'}}
    />
    <View style={{
      marginTop:7,
      height:6,
      width:'70%',
      borderRadius:4,
      backgroundColor:config.colors.yellowColor
    }}/></View>
     <View style={{
      marginTop:8,
      flexDirection:'row'
    }}>
    <Text style={{
      fontFamily: config.fonts.MediumFont,
      fontSize: 14,
      lineHeight:17,
      color: config.colors.blackColor
    }}>{`4`}</Text>
    <Image source={config.images.STAR_ICON}
    style={{height:16,width:16,marginHorizontal:5, resizeMode:'contain'}}
    />
    <View style={{
      marginTop:7,
      height:6,
      width:'50%',
      borderRadius:4,
      backgroundColor:config.colors.yellowColor
    }}/></View>
     <View style={{
      marginTop:8,
      flexDirection:'row'
    }}>
    <Text style={{
      fontFamily: config.fonts.MediumFont,
      fontSize: 14,
      lineHeight:17,
      color: config.colors.blackColor
    }}>{`3`}</Text>
    <Image source={config.images.STAR_ICON}
    style={{height:16,width:16,marginHorizontal:5, resizeMode:'contain'}}
    />
    <View style={{
      marginTop:7,
      height:6,
      width:'30%',
      borderRadius:4,
      backgroundColor:config.colors.yellowColor
    }}/></View>
     <View style={{
      marginTop:8,
      flexDirection:'row'
    }}>
    <Text style={{
      fontFamily: config.fonts.MediumFont,
      fontSize: 14,
      lineHeight:17,
      color: config.colors.blackColor
    }}>{`2`}</Text>
    <Image source={config.images.STAR_ICON}
    style={{height:16,width:16,marginHorizontal:5, resizeMode:'contain'}}
    />
    <View style={{
      marginTop:7,
      height:6,
      width:'15%',
      borderRadius:4,
      backgroundColor:config.colors.yellowColor
    }}/></View>
     <View style={{
      marginTop:8,
      flexDirection:'row'
    }}>
    <Text style={{
      fontFamily: config.fonts.MediumFont,
      fontSize: 14,
      lineHeight:17,
      color: config.colors.blackColor
    }}>{`1`}</Text>
    <Image source={config.images.STAR_ICON}
    style={{height:16,width:16,marginHorizontal:5, resizeMode:'contain'}}
    />
    <View style={{
      marginTop:7,
      height:6,
      width:'5%',
      borderRadius:4,
      backgroundColor:config.colors.yellowColor
    }}/></View>
  </View>
  <View style={{
    width:'40%',
  }}>
    <Text style={{
      marginTop:12,
      textAlign:'right',
      fontFamily: config.fonts.HeadingFont,
      fontSize:40,
      lineHeight: 48,
      color: config.colors.blackColor,
    }}>{`4.0`}</Text>
    <View style={{
      flexDirection:'row',
      marginTop:8,
      justifyContent:'flex-end'
      }}>
    <Image source={config.images.STAR_ICON}
    style={{height:16,width:16,marginHorizontal:5, resizeMode:'contain'}}
    />
    <Image source={config.images.STAR_ICON}
    style={{height:16,width:16,marginHorizontal:5, resizeMode:'contain'}}
    />
    <Image source={config.images.STAR_ICON}
    style={{height:16,width:16,marginHorizontal:5, resizeMode:'contain'}}
    />
    <Image source={config.images.STAR_ICON}
    style={{height:16,width:16,marginHorizontal:5, resizeMode:'contain'}}
    />
    <Image source={config.images.STAR_ICON}
    style={{height:16,width:16,marginHorizontal:5, resizeMode:'contain', tintColor: config.colors.lightGrey2Color}}
    />
    </View>
    <Text style={{
      textAlign:"right",
      fontFamily: config.fonts.MediumFont,
      fontSize: 14,
      lineHeight:17,
      color: config.colors.blackColor
    }}>{`52 Reviews`}</Text>
  </View>
</View>
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
        title={"Aisha Abdullah Al"}
        navigation={navigation}
        backgroundColor={config.colors.primaryColor}
        tintColor={config.colors.white}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: config.colors.white,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}
      >
        <View style={{ marginHorizontal: 20 }}>
          <Image
            source={config.images.TRIP_IMG}
            style={{
              marginTop: 20,
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
              marginTop: 20,
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
              {"Aisha Abdullah Al"}
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
                >{` 5.0  (30)`}</Text>
              </View>
              {/* <View
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
                >{` 30 `}</Text>
              </View> */}
            </View>
          </View>

          <View
            style={{
              height: 70,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                height: 45,
                width: "32%",
                justifyContent: "center",
                borderBottomWidth: 1,
                borderColor:
                  activeSection == "Let’s Go"
                    ? config.colors.primaryColor
                    : config.colors.white,
              }}
              onPress={() => {
                setActiveSection("Let’s Go");
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: config.fonts.MediumFont,
                  fontSize: 14,
                  lineHeight: 20,
                  color:
                    activeSection == "Let’s Go"
                      ? config.colors.blackColor
                      : config.colors.lightGrey2Color,
                }}
              >{`Let’s Go`}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 45,
                width: "32%",
                justifyContent: "center",
                borderBottomWidth: 1,
                borderColor:
                  activeSection == "Trip Memories"
                    ? config.colors.primaryColor
                    : config.colors.white,
              }}
              onPress={() => {
                setActiveSection("Trip Memories");
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: config.fonts.MediumFont,
                  fontSize: 14,
                  lineHeight: 20,
                  color:
                    activeSection == "Trip Memories"
                      ? config.colors.blackColor
                      : config.colors.lightGrey2Color,
                }}
              >{`Trip Memories`}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 45,
                width: "32%",
                justifyContent: "center",
                borderBottomWidth: 1,
                borderColor:
                  activeSection == "Reviews"
                    ? config.colors.primaryColor
                    : config.colors.white,
              }}
              onPress={() => {
                setActiveSection("Reviews");
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: config.fonts.MediumFont,
                  fontSize: 14,
                  lineHeight: 20,
                  color:
                    activeSection == "Reviews"
                      ? config.colors.blackColor
                      : config.colors.lightGrey2Color,
                }}
              >{`Reviews`}</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 15,
            }}
          >
            {activeSection == "Let’s Go"
              ? aboutUser()
              : activeSection == "Trip Memories"
              ? tripMemories()
              : activeSection == "Reviews"
              ? reviews()
              : null}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GuideDetails;

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,

    color: "white",
  },
  price: {
    fontSize: 24,

    color: "white",
  },
  features: {
    marginBottom: 20,
  },
  feature: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkIcon: {
    width: 20,
    height: 20,
    borderRadius: 50,
    borderColor: "white",
    borderWidth: 2,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkMark: {
    width: 10,
    height: 10,
    backgroundColor: "white",
  },
  featureText: {
    color: "white",
  },
  button: {
    backgroundColor: "#7952b3",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,

    textAlign: "center",
  },
});
