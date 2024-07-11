import { takeLatest, call, put } from "redux-saga/effects";
import { callApiService } from "../../../services/ApiInstance";
import { SagaActions } from "../SagaActions";
import { UIReducer } from "../../reducers";
import { saveUserTripDetail, saveUserTripDetailResponse } from "../../reducers/UserReducer/UserTripDetailReducer";

export function* UserTripDetail(action) {
  yield put(UIReducer.showLoader(true));

  const data = yield call(
    callApiService,
    SagaActions.USER_TRIP_DETAILS,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveUserTripDetail(data?.result?.data));
    yield put(UIReducer.showLoader(false));
    return;
  }

  const UserTripDetailAccountResponse = {
    status: false,
    message: data?.result?.data?.message ?? "Server Error!!",
  };
  yield put(saveUserTripDetailResponse(UserTripDetailAccountResponse));
  yield put(UIReducer.showLoader(false));
}

/**
 * Watch User  Signup function
 */
export function* watchUserTripDetail() {
  yield takeLatest(SagaActions.USER_TRIP_DETAILS, UserTripDetail);
}
