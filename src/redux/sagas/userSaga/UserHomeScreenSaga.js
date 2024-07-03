import { takeLatest, call, put } from "redux-saga/effects";
import { callApiService } from "../../../services/ApiInstance";
import { SagaActions } from "../SagaActions";
import { UIReducer } from "../../reducers";
import { saveUserHomeScreen, saveUserHomeScreenResponse } from "../../reducers/UserReducer/UserHomeScreenReducer";

export function* UserHomeScreen(action) {
  yield put(UIReducer.showLoader(true));

  const data = yield call(
    callApiService,
    SagaActions.USER_HOME_SCREEN,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveUserHomeScreen(data?.result?.data));
    yield put(UIReducer.showLoader(false));
    return;
  }

  const UserHomeScreenAccountResponse = {
    status: false,
    message: data?.result?.data?.message ?? "Server Error!!",
  };
  yield put(saveUserHomeScreenResponse(UserHomeScreenAccountResponse));
  yield put(UIReducer.showLoader(false));
}

/**
 * Watch Login USER function
 */
export function* watchUserHomeScreen() {
  yield takeLatest(SagaActions.USER_HOME_SCREEN, UserHomeScreen);
}
