import {combineReducers} from '@reduxjs/toolkit';

import * as UIReducer from './UIReducer';
/*------------- USER --------------- */
import * as UserSignupReducer from './UserReducer/UserSignupReducer';
import * as UserLoginReducer from './UserReducer/UserLoginReducer';
import * as UserVerifyOtpReducer from './UserReducer/UserVerifyOtpReducer';
import * as UserForgotPasswordReducer from './UserReducer/UserForgotPasswordReducer';
import * as UserUpdatePasswordReducer from './UserReducer/UserUpdatePasswordReducer';
import * as UserHomeScreenReducer from './UserReducer/UserHomeScreenReducer';
import * as UserGetProfileReducer from './UserReducer/UserGetProfileReducer';
import * as UserRoadTripReducer from './UserReducer/UserRoadTripReducer';
import * as UserOffRoadTripReducer from './UserReducer/UserOffRoadTripReducer';
import * as UserFilterApiReducer from './UserReducer/UserFilterApiReducer';
import * as UserCreateTripReducer from './UserReducer/UserCreateTripReducer';
import * as UserTripMemoriesCountReducer from './UserReducer/UserTripMemoriesCountReducer';

/*------------- GUIDE --------------- */
import * as GuideGetProfileReducer from './GuideReducer/GuideGetProfileReducer';
import * as GuidePayStatusReducer from './GuideReducer/GuidePayStatusReducer';
import * as GuideCompleteProfileReducer from './GuideReducer/GuideCompleteProfileReducer';

const reducers = combineReducers({
  UIReducer: UIReducer.uiSliceReducer,
  /* ------------------- USER -------------- */
  UserSignupReducer: UserSignupReducer.UserSignupSliceReducer,
  UserLoginReducer: UserLoginReducer.UserLoginSliceReducer,
  UserVerifyOtpReducer: UserVerifyOtpReducer.UserVerifyOtpSliceReducer,
  UserForgotPasswordReducer:
    UserForgotPasswordReducer.UserForgotPasswordSliceReducer,
  UserUpdatePasswordReducer:
    UserUpdatePasswordReducer.UserUpdatePasswordSliceReducer,
  UserHomeScreenReducer: UserHomeScreenReducer.UserHomeScreenSliceReducer,
  UserGetProfileReducer: UserGetProfileReducer.UserGetProfileSliceReducer,
  UserRoadTripReducer:UserRoadTripReducer.UserRoadTripSliceReducer,
  UserOffRoadTripReducer:UserOffRoadTripReducer.UserOffRoadTripSliceReducer,
  UserFilterApiReducer:UserFilterApiReducer.UserFilterApiSliceReducer,
  UserCreateTripReducer:UserCreateTripReducer.UserCreateTripSliceReducer,
  UserTripMemoriesCountReducer:UserTripMemoriesCountReducer.UserTripMemoriesCountSliceReducer,

  /* ------------------- GUIDE -------------- */
  GuideGetProfileReducer:GuideGetProfileReducer.GuideGetProfileSliceReducer,
  GuidePayStatusReducer:GuidePayStatusReducer.GuidePayStatusSliceReducer,
  GuideCompleteProfileReducer:GuideCompleteProfileReducer.GuideCompleteProfileSliceReducer,

});

export {
  reducers,
  UIReducer,
  /* ------------------- USER -------------- */
  UserSignupReducer,
  UserLoginReducer,
  UserVerifyOtpReducer,
  UserForgotPasswordReducer,
  UserUpdatePasswordReducer,
  UserHomeScreenReducer,
  UserGetProfileReducer,
  UserRoadTripReducer,
  UserOffRoadTripReducer,
  UserFilterApiReducer,
  UserCreateTripReducer,
  UserTripMemoriesCountReducer,
  /* ------------------- GUIDE -------------- */
  GuideGetProfileReducer,
  GuidePayStatusReducer,
  GuideCompleteProfileReducer
};
