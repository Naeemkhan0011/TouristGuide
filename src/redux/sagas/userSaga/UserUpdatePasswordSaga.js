import { takeLatest, call, put } from "redux-saga/effects";
import { callApiService } from "../../../services/ApiInstance";
import { SagaActions } from "../SagaActions";
import { UIReducer } from "../../reducers";
import { saveUserUpdatePassword, saveUserUpdatePasswordResponse } from "../../reducers/UserReducer/UserUpdatePasswordReducer";

export function* UserUpdatePassword(action) {
  yield put(UIReducer.showLoader(true));

  const data = yield call(
    callApiService,
    SagaActions.USER_UPDATE_PASSWORD,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveUserUpdatePassword(data?.result?.data));
    yield put(UIReducer.showLoader(false));
    return;
  }

  const UserUpdatePasswordAccountResponse = {
    status: false,
    message: data?.result?.data?.message ?? "Server Error!!",
  };
  yield put(saveUserUpdatePasswordResponse(UserUpdatePasswordAccountResponse));
  yield put(UIReducer.showLoader(false));
}

/**
 * Watch Login USER function
 */
export function* watchUserUpdatePassword() {
  yield takeLatest(SagaActions.USER_UPDATE_PASSWORD, UserUpdatePassword);
}
