import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import config from '../config';

import {Image, Platform, Text, View} from 'react-native';
import GuideHomeScreen from '../screens/guideScreens/GuideHomeScreen';
import UserHomeScreen from '../screens/userScreens/UserHomeScreen';
import MyTrip from '../screens/userScreens/MyTrip';
import GuideAccount from '../screens/guideScreens/GuideAccount';
import UserProfile from '../screens/userScreens/UserProfile';
import UserFavorite from '../screens/userScreens/UserFavorite';
import MyPackage from '../screens/guideScreens/MyPackage';
import UserCreateTrip from '../screens/userScreens/UserCreateTrip';
import GuideCompleteProfile from '../screens/guideScreens/GuideCompleteProfile';

const Tab = createBottomTabNavigator();

const UserTabs = () => {
  console.log('UserTabs', 'UserTabs');
  return (
    <Tab.Navigator
      initialRouteName={config.routes.USER_HOME_SCREEN}
      screenOptions={{
        tabBarStyle: {
          height: Platform.OS == 'android' ? 68 : 88,
          borderRadius: 10,
          paddingBottom: 10,
          backgroundColor: config.colors.white,
          // bottom: 20,
          // marginHorizontal: 20,
        },
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name={config.routes.USER_HOME_SCREEN}
        component={UserHomeScreen}
        options={{
          tabBarLabel: config.routes.USER_HOME_SCREEN,
          tabBarIcon: ({color, size, focused}) => (
            <>
             
                <Image
                  source={config.images.HOME_ICON}
                  style={{
                    marginLeft:4,
                    height: 23,
                    width: 23,
                    resizeMode: 'contain',
                    tintColor: focused
                      ? config.colors.yellowColor
                      : config.colors.lightGrey2Color,
                  }}
                />
              <View style={{justifyContent: 'center'}}>
                <Text
                  style={{
                    fontFamily: config.fonts.MediumFont,
                    fontSize: 10,
                    lineHeight: 16,
                    marginLeft: 6,
                    color: focused
                      ? config.colors.yellowColor
                      : config.colors.lightGrey2Color,
                    justifyContent: 'center',
                  }}>
                  {'Home'}
                </Text>
              </View>
            </>
          ),
        }}
      />

      <Tab.Screen
        name={config.routes.MY_TRIP}
        component={GuideCompleteProfile}
        // component={MyTrip}
        options={{
          tabBarLabel: config.routes.USER_HOME_SCREEN,
          tabBarIcon: ({color, size, focused}) => (
            <>
              
                <Image
                  source={config.images.TRIP_ICON}
                  style={{
                    marginLeft:6,
                    height: 23,
                    width: 23,
                    resizeMode: 'contain',
                    tintColor: focused
                      ? config.colors.yellowColor
                      : config.colors.lightGrey2Color,
                  }}
                />
              <View style={{justifyContent: 'center'}}>
                <Text
                  style={{
                    fontFamily: config.fonts.MediumFont,
                    fontSize: 10,
                    lineHeight: 16,
                    marginLeft: 6,
                    color: focused
                      ? config.colors.yellowColor
                      : config.colors.lightGrey2Color,
                    justifyContent: 'center',
                  }}>
                  {'My Trip'}
                </Text>
              </View>
            </>
          ),
        }}
      />

      <Tab.Screen
        name={config.routes.USER_CREATE_TRIP}
        component={UserCreateTrip}
        options={{
          tabBarLabel: config.routes.USER_CREATE_TRIP,
          tabBarIcon: ({color, size, focused}) => (
            <>
              
                <Image
                  source={config.images.CREATE_ICON}
                  style={{
                    marginLeft:6,
                    height: 23,
                    width: 23,
                    resizeMode: 'contain',
                    tintColor: focused
                      ? config.colors.yellowColor
                      : config.colors.lightGrey2Color,
                  }}
                />
              <View style={{justifyContent: 'center'}}>
                <Text
                  style={{
                    fontFamily: config.fonts.MediumFont,
                    fontSize: 10,
                    lineHeight: 16,
                    marginLeft: 6,
                    color: focused
                      ? config.colors.yellowColor
                      : config.colors.lightGrey2Color,
                    justifyContent: 'center',
                  }}>
                  {'Create Trip'}
                </Text>
              </View>
            </>
          ),
        }}
      />

      <Tab.Screen
        name={config.routes.USER_FAVORITE}
        component={UserFavorite}
        options={{
          tabBarLabel: config.routes.USER_FAVORITE,
          tabBarIcon: ({color, size, focused}) => (
            <>
              <Image
                source={config.images.FAVORITE_ICON}
                style={{
                  marginLeft:6,
                  height: 23,
                  width: 23,
                  resizeMode: 'contain',
                  tintColor: focused
                    ? config.colors.yellowColor
                    : config.colors.lightGrey2Color,
                }}
              />
              <View style={{justifyContent: 'center'}}>
                <Text
                  style={{
                    fontFamily: config.fonts.MediumFont,
                    fontSize: 10,
                    lineHeight: 16,
                    marginLeft: 6,
                    color: focused
                      ? config.colors.yellowColor
                      : config.colors.lightGrey2Color,
                    justifyContent: 'center',
                  }}>
                  {'Favorite'}
                </Text>
              </View>
            </>
          ),
        }}
      />

      <Tab.Screen
        name={config.routes.USER_PROFILE}
        component={UserProfile}
        options={{
          tabBarLabel: config.routes.USER_PROFILE,
          tabBarIcon: ({color, size, focused}) => (
            <>
              <Image
                source={config.images.ACCOUNT_ICON}
                style={{
                  marginLeft:6,
                  height: 23,
                  width: 23,
                  resizeMode: 'contain',
                  tintColor: focused
                    ? config.colors.yellowColor
                    : config.colors.lightGrey2Color,
                }}
              />
              <View style={{justifyContent: 'center'}}>
                <Text
                  style={{
                    fontFamily: config.fonts.MediumFont,
                    fontSize: 10,
                    lineHeight: 16,
                    marginLeft: 6,
                    color: focused
                      ? config.colors.yellowColor
                      : config.colors.lightGrey2Color,
                    justifyContent: 'center',
                  }}>
                  {'Account'}
                </Text>
              </View>
            </>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const GuideTabs = () => {
  console.log('GuideTabs', 'GuideTabs');

  return (
    <Tab.Navigator
      initialRouteName={config.routes.GUIDE_HOME_SCREEN}
      screenOptions={{
        tabBarStyle: {
          height: Platform.OS == 'android' ? 68 : 88,
          borderRadius: 10,
          paddingBottom: 10,
          backgroundColor: config.colors.white,
        },
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name={config.routes.GUIDE_HOME_SCREEN}
        component={GuideHomeScreen}
        options={{
          tabBarLabel: config.routes.GUIDE_HOME_SCREEN,
          tabBarIcon: ({color, size, focused}) => (
            <>
                <Image
                  source={config.images.HOME_ICON}
                  style={{height: 23, width: 23,marginLeft:4, resizeMode: 'contain',tintColor: focused ? config.colors.yellowColor : config.colors.lightGrey2Color}}
                />
              <View style={{justifyContent: 'center'}}>
                <Text
                  style={{
                    fontFamily: config.fonts.MediumFont,
                    fontSize: 10,
                    lineHeight: 16,
                    marginLeft: 6,
                    color:focused ? config.colors.yellowColor : config.colors.lightGrey2Color,
                    justifyContent: 'center',
                  }}>
                  {'Home'}
                </Text>
              </View>
            </>
          ),
        }}
      />

    
      <Tab.Screen
        name={config.routes.MY_PACKAGE}
        component={MyPackage}
        options={{
          tabBarLabel: config.routes.MY_PACKAGE,
          tabBarIcon: ({color, size, focused}) => (
            <>
             
                <Image
                  source={config.images.PACKAGE_ICON}
                  style={{height: 23, width: 23, marginLeft:4, resizeMode: 'contain',tintColor:focused ? config.colors.yellowColor : config.colors.lightGrey2Color}}
                />
              
              <View style={{justifyContent: 'center'}}>
                <Text
                  style={{
                    fontFamily: config.fonts.MediumFont,
                    fontSize: 10,
                    lineHeight: 16,
                    marginLeft: 6,
                    color: focused ? config.colors.yellowColor : config.colors.lightGrey2Color,
                    justifyContent: 'center',
                  }}>
                  {'My Package'}
                </Text>
              </View>
            </>
          ),
        }}
      />

     

      <Tab.Screen
        name={config.routes.GUIDE_ACCOUNT}
        component={GuideAccount}
        options={{
          tabBarLabel: config.routes.GUIDE_ACCOUNT,
          tabBarIcon: ({color, size, focused}) => (
            <>
              
                <Image
                  source={config.images.ACCOUNT_ICON}
                  style={{height: 23, width: 23, marginLeft:4, resizeMode: 'contain',tintColor:focused ? config.colors.yellowColor : config.colors.lightGrey2Color}}
                />
              
              <View style={{justifyContent: 'center'}}>
                <Text
                  style={{
                    fontFamily: config.fonts.MediumFont,
                    fontSize: 10,
                    lineHeight: 16,
                    marginLeft: 6,
                    color: focused ? config.colors.yellowColor : config.colors.lightGrey2Color,
                    justifyContent: 'center',
                  }}>
                  {'Account'}
                </Text>
              </View>
            </>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const TabNavigator = ({route}) => {
  const userRole = route?.params?.userRole;

  if (userRole) {
    console.log('role', userRole, typeof userRole);
    if (userRole == 'Guest') {
      return UserTabs();
    } else {
      return GuideTabs();
    }
  }
};
export default TabNavigator;
