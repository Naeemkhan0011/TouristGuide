import * as React from "react";
import { View, Text, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import config from "../config";

import AuthNavigation from "./AuthNavigation";

import { navigationRef } from "../components/NavigationRef";
import PushController from "../components/PushController";
import PushControllerIos from "../components/PushControllerIos";
import Language from "../screens/language/Language";
import Onboarding from "../screens/onboarding/Onboarding";
import SelectUser from "../screens/selectUser/SelectUser";
import WelcomeScreen from "../screens/welcomeScreen/WelcomeScreen";
import UserSignupScreen from "../screens/userScreens/UserSignupScreen";
import UserLoginScreen from "../screens/userScreens/UserLoginScreen";
import UserForgotPassword from "../screens/userScreens/UserForgotPassword";
import UserOtpVerification from "../screens/userScreens/UserOtpVerification";
import GuideLoginScreen from "../screens/guideScreens/GuideLoginScreen";
import GuideForgotPassword from "../screens/guideScreens/GuideForgotPassword";
import GuideOtpVerification from "../screens/guideScreens/GuideOtpVerification";
import GuideSignupScreen from "../screens/guideScreens/GuideSignupScreen";
import UserHomeScreen from "../screens/userScreens/UserHomeScreen";
import MyTrip from "../screens/userScreens/MyTrip";
import GuideHomeScreen from "../screens/guideScreens/GuideHomeScreen";
import GuideAccount from "../screens/guideScreens/GuideAccount";
import TabNavigator from "./TabNavigation";
import UserProfile from "../screens/userScreens/UserProfile";
import UserFavorite from "../screens/userScreens/UserFavorite";
import UserUpdatePassword from "../screens/userScreens/UserUpdatePassword";
import MyPackage from "../screens/guideScreens/MyPackage";
import AccountSuccess from "../screens/guideScreens/AccountSuccess";
import UserAccountSuccess from "../screens/userScreens/UserAccountSuccess";
import UserCreateTrip from "../screens/userScreens/UserCreateTrip";
import SubscriptionPlan from "../screens/guideScreens/SubscriptionPlan";
import ChoosePaymentMethod from "../screens/guideScreens/Payment/ChoosePaymentMethod";
import PaymentDetail from "../screens/guideScreens/Payment/PaymentDetail";
import GuideCompleteProfile from "../screens/guideScreens/GuideCompleteProfile";
import GuideEditProfile from "../screens/guideScreens/GuideEditProfile";
import UserEditProfile from "../screens/userScreens/UserEditProfile";
import UserTripDetail from "../screens/userScreens/UserTripDetail";
import GuideDetails from "../screens/userScreens/GuideDetails";

const Stack = createNativeStackNavigator();

function RootNavigation() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {Platform.OS == "android" ? (
          <Stack.Screen name="PushController" component={PushController} />
        ) : (
          <Stack.Screen
            name="PushControllerIos"
            component={PushControllerIos}
          />
        )}

        <Stack.Screen
          name={config.routes.TAB_NAVIGATOR}
          component={TabNavigator}
        />
        <Stack.Screen name={config.routes.LANGUAGE} component={Language} />

        <Stack.Screen name={config.routes.ONBOARDING} component={Onboarding} />

        <Stack.Screen name={config.routes.SELECT_USER} component={SelectUser} />

        <Stack.Screen
          name={config.routes.WELCOME_SCREEN}
          component={WelcomeScreen}
        />

        <Stack.Screen
          name={config.routes.USER_SIGNUP_SCREEN}
          component={UserSignupScreen}
        />

        <Stack.Screen
          name={config.routes.USER_LOGIN_SCREEN}
          component={UserLoginScreen}
        />

        <Stack.Screen
          name={config.routes.USER_FORGOT_PASSWORD}
          component={UserForgotPassword}
        />

        <Stack.Screen
          name={config.routes.USER_OTP_VERIFICATION}
          component={UserOtpVerification}
        />

        <Stack.Screen
          name={config.routes.GUIDE_FORGOT_PASSWORD}
          component={GuideForgotPassword}
        />

        <Stack.Screen
          name={config.routes.GUIDE_LOGIN_SCREEN}
          component={GuideLoginScreen}
        />

        <Stack.Screen
          name={config.routes.GUIDE_OTP_VERIFICATION}
          component={GuideOtpVerification}
        />

        <Stack.Screen
          name={config.routes.GUIDE_SIGNUP_SCREEN}
          component={GuideSignupScreen}
        />

        <Stack.Screen
          name={config.routes.USER_HOME_SCREEN}
          component={UserHomeScreen}
        />

        <Stack.Screen name={config.routes.MY_TRIP} component={MyTrip} />

        <Stack.Screen
          name={config.routes.GUIDE_HOME_SCREEN}
          component={GuideHomeScreen}
        />

        <Stack.Screen
          name={config.routes.GUIDE_ACCOUNT}
          component={GuideAccount}
        />
        <Stack.Screen
          name={config.routes.ACCOUNT_SUCCESS}
          component={AccountSuccess}
        />

        <Stack.Screen
          name={config.routes.USER_PROFILE}
          component={UserProfile}
        />

        <Stack.Screen
          name={config.routes.USER_FAVORITE}
          component={UserFavorite}
        />

        <Stack.Screen
          name={config.routes.USER_UPDATE_PASSWORD}
          component={UserUpdatePassword}
        />

        <Stack.Screen
          name={config.routes.USER_ACCOUNT_SUCCESS}
          component={UserAccountSuccess}
        />

        <Stack.Screen
          name={config.routes.USER_CREATE_TRIP}
          component={UserCreateTrip}
        />

        <Stack.Screen
          name={config.routes.SUBSCRIPTION_PLAN}
          component={SubscriptionPlan}
        />

        <Stack.Screen
          name={config.routes.CHOOSE_PAYMENT_METHOD}
          component={ChoosePaymentMethod}
        />

        <Stack.Screen
          name={config.routes.PAYMENT_DETAIL}
          component={PaymentDetail}
        />

        <Stack.Screen
          name={config.routes.GUIDE_COMPLETE_PROFILE}
          component={GuideCompleteProfile}
        />

        <Stack.Screen
          name={config.routes.GUIDE_EDIT_PROFILE}
          component={GuideEditProfile}
        />
        <Stack.Screen
          name={config.routes.USER_EDIT_PROFILE}
          component={UserEditProfile}
        />

        <Stack.Screen
          name={config.routes.USER_TRIP_DETAIL}
          component={UserTripDetail}
        />

        <Stack.Screen
          name={config.routes.GUIDE_DETAIL}
          component={GuideDetails}
        />

        <Stack.Screen name={config.routes.MY_PACKAGE} component={MyPackage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigation;
