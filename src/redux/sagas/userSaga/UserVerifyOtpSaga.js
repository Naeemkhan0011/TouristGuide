import { takeLatest, call, put } from "redux-saga/effects";
import { callApiService } from "../../../services/ApiInstance";
import { SagaActions } from "../SagaActions";
import { UIReducer } from "../../reducers";
import { saveUserVerifyOtp, saveUserVerifyOtpResponse } from "../../reducers/UserReducer/UserVerifyOtpReducer";

export function* UserVerifyOtp(action) {
  yield put(UIReducer.showLoader(true));

  const data = yield call(
    callApiService,
    SagaActions.USER_VERIFY_OPT,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveUserVerifyOtp(data?.result?.data));
    yield put(UIReducer.showLoader(false));
    return;
  }

  const UserVerifyOtpAccountResponse = {
    status: false,
    message: data?.result?.data?.message ?? "Server Error!!",
  };
  yield put(saveUserVerifyOtpResponse(UserVerifyOtpAccountResponse));
  yield put(UIReducer.showLoader(false));
}

/**
 * Watch User  Signup function
 */
export function* watchUserVerifyOtp() {
  yield takeLatest(SagaActions.USER_VERIFY_OPT, UserVerifyOtp);
}
