import { takeLatest, call, put } from "redux-saga/effects";
import { callApiService } from "../../../services/ApiInstance";
import { SagaActions } from "../SagaActions";
import { UIReducer } from "../../reducers";
import { saveUserGetProfile, saveUserGetProfileResponse } from "../../reducers/UserReducer/UserGetProfileReducer";

export function* UserGetProfile(action) {
  yield put(UIReducer.showLoader(true));

  const data = yield call(
    callApiService,
    SagaActions.USER_GET_PROFILE,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveUserGetProfile(data?.result?.data));
    yield put(UIReducer.showLoader(false));
    return;
  }

  const UserGetProfileAccountResponse = {
    status: false,
    message: data?.result?.data?.message ?? "Server Error!!",
  };
  yield put(saveUserGetProfileResponse(UserGetProfileAccountResponse));
  yield put(UIReducer.showLoader(false));
}

/**
 * Watch Login USER function
 */
export function* watchUserGetProfile() {
  yield takeLatest(SagaActions.USER_GET_PROFILE, UserGetProfile);
}
