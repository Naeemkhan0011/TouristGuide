import { takeLatest, call, put } from "redux-saga/effects";
import { callApiService } from "../../../services/ApiInstance";
import { SagaActions } from "../SagaActions";
import { UIReducer } from "../../reducers";
import { saveUserRoadTrip, saveUserRoadTripResponse } from "../../reducers/UserReducer/UserRoadTripReducer";

export function* UserRoadTrip(action) {
  yield put(UIReducer.showLoader(true));

  const data = yield call(
    callApiService,
    SagaActions.USER_ROAD_TRIP,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveUserRoadTrip(data?.result?.data));
    yield put(UIReducer.showLoader(false));
    return;
  }

  const UserRoadTripResponse = {
    status: false,
    message: data?.result?.data?.message ?? "Server Error!!",
  };
  yield put(saveUserRoadTripResponse(UserRoadTripResponse));
  yield put(UIReducer.showLoader(false));
}

/**
 * Watch Login USER function
 */
export function* watchUserRoadTrip() {
  yield takeLatest(SagaActions.USER_ROAD_TRIP, UserRoadTrip);
}
