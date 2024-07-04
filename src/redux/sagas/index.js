import {all, fork} from 'redux-saga/effects';
/* ------------------- USER -------------- */
import {watchUserSignup} from './userSaga/UserSignupSaga';
import {watchUserLogin} from './userSaga/UserLoginSaga';
import {watchUserVerifyOtp} from './userSaga/UserVerifyOtpSaga';
import {watchUserForgotPassword} from './userSaga/UserForgotPasswordSaga';
import {watchUserUpdatePassword} from './userSaga/UserUpdatePasswordSaga';
import { watchUserHomeScreen } from './userSaga/UserHomeScreenSaga';
import { watchUserGetProfile } from './userSaga/UserGetProfileSaga';
import { watchUserRoadTrip } from './userSaga/UserRoadTripSaga';
import { watchUserOffRoadTrip } from './userSaga/UserOffRoadTripSaga';
import { watchUserFilterApi } from './userSaga/UserFilterApiSaga';
import { watchUserCreateTrip } from './userSaga/UserCreateTripSaga';
import { watchUserGetAllTrips } from './userSaga/UserGetTripListSaga';

/* ------------------- GUIDE -------------- */
import { watchGuideGetProfile } from './guideSaga/GuideGetProfileSaga';
import { watchGuidePayStatus } from './guideSaga/GuidePayStatusSaga';
import { watchGuideCompleteProfile } from './guideSaga/GuideCompleteProfileSaga';
import { watchUserTripMemoriesCount } from './userSaga/UserTripMemoriesCountSaga';

/* ------------------- ROOT SAGA -------------- */

export default function* rootSaga() {
  return yield all([
    /* ------------------- USER -------------- */
    fork(watchUserSignup),
    fork(watchUserLogin),
    fork(watchUserVerifyOtp),
    fork(watchUserForgotPassword),
    fork(watchUserUpdatePassword),
    fork(watchUserHomeScreen),
    fork(watchUserGetProfile),
    fork(watchUserRoadTrip),
    fork(watchUserOffRoadTrip),
    fork(watchUserFilterApi),
    fork(watchUserCreateTrip),
    fork(watchUserTripMemoriesCount),
    fork(watchUserGetAllTrips),

    /* ------------------- GUIDE -------------- */
   fork(watchGuideGetProfile),
   fork(watchGuidePayStatus),
   fork(watchGuideCompleteProfile)

  ]);
}
