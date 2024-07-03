import { takeLatest, call, put } from "redux-saga/effects";
import { callApiService } from "../../../services/ApiInstance";
import { SagaActions } from "../SagaActions";
import { UIReducer } from "../../reducers";
import { saveUserSignup, saveUserSignupResponse } from "../../reducers/UserReducer/UserSignupReducer";

export function* UserSignup(action) {
  yield put(UIReducer.showLoader(true));

  const data = yield call(
    callApiService,
    SagaActions.USER_SIGN_UP,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveUserSignup(data?.result?.data));
    yield put(UIReducer.showLoader(false));
    return;
  }

  const UserSignupAccountResponse = {
    status: false,
    message: data?.result?.data?.message ?? "Server Error!!",
  };
  yield put(saveUserSignupResponse(UserSignupAccountResponse));
  yield put(UIReducer.showLoader(false));
}

/**
 * Watch User  Signup function
 */
export function* watchUserSignup() {
  yield takeLatest(SagaActions.USER_SIGN_UP, UserSignup);
}
