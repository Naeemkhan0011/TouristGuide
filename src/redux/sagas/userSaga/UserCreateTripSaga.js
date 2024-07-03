import { takeLatest, call, put } from "redux-saga/effects";
import { callApiService } from "../../../services/ApiInstance";
import { SagaActions } from "../SagaActions";
import { UIReducer } from "../../reducers";
import { saveUserCreateTrip, saveUserCreateTripResponse } from "../../reducers/UserReducer/UserCreateTripReducer";

export function* UserCreateTrip(action) {
  yield put(UIReducer.showLoader(true));

  const data = yield call(
    callApiService,
    SagaActions.USER_CREATE_TRIP,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveUserCreateTrip(data?.result?.data));
    yield put(UIReducer.showLoader(false));
    return;
  }

  const UserCreateTripResponse = {
    status: false,
    message: data?.result?.data?.message ?? "Server Error!!",
  };
  yield put(saveUserCreateTripResponse(UserCreateTripResponse));
  yield put(UIReducer.showLoader(false));
}

/**
 * Watch Login USER function
 */
export function* watchUserCreateTrip() {
  yield takeLatest(SagaActions.USER_CREATE_TRIP, UserCreateTrip);
}
