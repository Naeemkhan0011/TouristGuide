import { takeLatest, call, put } from "redux-saga/effects";
import { callApiService } from "../../../services/ApiInstance";
import { SagaActions } from "../SagaActions";
import { UIReducer } from "../../reducers";
import { saveUserGetTripList, saveUserGetTripListResponse } from "../../reducers/UserReducer/UserGetTripListReducer";

export function* UserGetAllTrips(action) {
  yield put(UIReducer.showLoader(true));

  const data = yield call(
    callApiService,
    SagaActions.USER_GET_ALL_TRIP_LIST,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveUserGetTripList(data?.result?.data));
    yield put(UIReducer.showLoader(false));
    return;
  }

  const UserGetAllTripsAccountResponse = {
    status: false,
    message: data?.result?.data?.message ?? "Server Error!!",
  };
  yield put(saveUserGetTripListResponse(UserGetAllTripsAccountResponse));
  yield put(UIReducer.showLoader(false));
}

/**
 * Watch Login USER function
 */
export function* watchUserGetAllTrips() {
  yield takeLatest(SagaActions.USER_GET_ALL_TRIP_LIST, UserGetAllTrips);
}
