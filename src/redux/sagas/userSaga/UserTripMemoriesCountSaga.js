UserTripMemoriesCount
import { takeLatest, call, put } from "redux-saga/effects";
import { callApiService } from "../../../services/ApiInstance";
import { SagaActions } from "../SagaActions";
import { UIReducer } from "../../reducers";
import { saveUserTripMemoriesCount, saveUserTripMemoriesCountResponse } from "../../reducers/UserReducer/UserTripMemoriesCountReducer";

export function* UserTripMemoriesCount(action) {
  yield put(UIReducer.showLoader(true));

  const data = yield call(
    callApiService,
    SagaActions.USER_TRIP_MEMORIES_COUNT,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveUserTripMemoriesCount(data?.result?.data));
    yield put(UIReducer.showLoader(false));
    return;
  }

  const UserTripMemoriesCountAccountResponse = {
    status: false,
    message: data?.result?.data?.message ?? "Server Error!!",
  };
  yield put(saveUserTripMemoriesCountResponse(UserTripMemoriesCountAccountResponse));
  yield put(UIReducer.showLoader(false));
}

/**
 * Watch User  Signup function
 */
export function* watchUserTripMemoriesCount() {
  yield takeLatest(SagaActions.USER_TRIP_MEMORIES_COUNT, UserTripMemoriesCount);
}
