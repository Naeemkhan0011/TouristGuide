import { takeLatest, call, put } from "redux-saga/effects";
import { callApiService } from "../../../services/ApiInstance";
import { SagaActions } from "../SagaActions";
import { UIReducer } from "../../reducers";
import { saveUserOffRoadTrip, saveUserOffRoadTripResponse } from "../../reducers/UserReducer/UserOffRoadTripReducer";

export function* UserOffRoadTrip(action) {
  yield put(UIReducer.showLoader(true));

  const data = yield call(
    callApiService,
    SagaActions.USER_OFF_ROAD_TRIP,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveUserOffRoadTrip(data?.result?.data));
    yield put(UIReducer.showLoader(false));
    return;
  }

  const UserOffRoadTripResponse = {
    status: false,
    message: data?.result?.data?.message ?? "Server Error!!",
  };
  yield put(saveUserOffRoadTripResponse(UserOffRoadTripResponse));
  yield put(UIReducer.showLoader(false));
}

/**
 * Watch Login USER function
 */
export function* watchUserOffRoadTrip() {
  yield takeLatest(SagaActions.USER_OFF_ROAD_TRIP, UserOffRoadTrip);
}
