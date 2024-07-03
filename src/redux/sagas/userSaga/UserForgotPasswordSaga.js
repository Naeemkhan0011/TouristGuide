import { takeLatest, call, put } from "redux-saga/effects";
import { callApiService } from "../../../services/ApiInstance";
import { SagaActions } from "../SagaActions";
import { UIReducer } from "../../reducers";
import { saveUserForgotPassword, saveUserForgotPasswordResponse } from "../../reducers/UserReducer/UserForgotPasswordReducer";

export function* UserForgotPassword(action) {
  yield put(UIReducer.showLoader(true));

  const data = yield call(
    callApiService,
    SagaActions.USER_FORGOT_PASSWORD,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveUserForgotPassword(data?.result?.data));
    yield put(UIReducer.showLoader(false));
    return;
  }

  const UserForgotPasswordAccountResponse = {
    status: false,
    message: data?.result?.data?.message ?? "Server Error!!",
  };
  yield put(saveUserForgotPasswordResponse(UserForgotPasswordAccountResponse));
  yield put(UIReducer.showLoader(false));
}

/**
 * Watch Login USER function
 */
export function* watchUserForgotPassword() {
  yield takeLatest(SagaActions.USER_FORGOT_PASSWORD, UserForgotPassword);
}
