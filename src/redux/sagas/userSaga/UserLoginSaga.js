import { takeLatest, call, put } from "redux-saga/effects";
import { callApiService } from "../../../services/ApiInstance";
import { SagaActions } from "../SagaActions";
import { UIReducer } from "../../reducers";
import { saveUserLogin, saveUserLoginResponse } from "../../reducers/UserReducer/UserLoginReducer";

export function* UserLogin(action) {
  yield put(UIReducer.showLoader(true));

  const data = yield call(
    callApiService,
    SagaActions.USER_LOGIN,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveUserLogin(data?.result?.data));
    yield put(UIReducer.showLoader(false));
    return;
  }

  const UserLoginAccountResponse = {
    status: false,
    message: data?.result?.data?.message ?? "Server Error!!",
  };
  yield put(saveUserLoginResponse(UserLoginAccountResponse));
  yield put(UIReducer.showLoader(false));
}

/**
 * Watch Login USER function
 */
export function* watchUserLogin() {
  yield takeLatest(SagaActions.USER_LOGIN, UserLogin);
}
