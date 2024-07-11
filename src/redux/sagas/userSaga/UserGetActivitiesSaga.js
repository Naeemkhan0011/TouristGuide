import { takeLatest, call, put } from "redux-saga/effects";
import { callApiService } from "../../../services/ApiInstance";
import { SagaActions } from "../SagaActions";
import { UIReducer } from "../../reducers";
import { saveUSerGetActivities, saveUSerGetActivitiesResponse } from "../../reducers/UserReducer/UserGetActivitiesReducer";

export function* USerGetActivities(action) {
  yield put(UIReducer.showLoader(true));

  const data = yield call(
    callApiService,
    SagaActions.USER_GET_ACTIVITIES,
    action.payload
  );
  if (data.isSucceded) {
    yield put(saveUSerGetActivities(data?.result?.data));
    yield put(UIReducer.showLoader(false));
    return;
  }

  const USerGetActivitiesAccountResponse = {
    status: false,
    message: data?.result?.data?.message ?? "Server Error!!",
  };
  yield put(saveUSerGetActivitiesResponse(USerGetActivitiesAccountResponse));
  yield put(UIReducer.showLoader(false));
}

/**
 * Watch Login USER function
 */
export function* watchUSerGetActivities() {
  yield takeLatest(SagaActions.USER_GET_ACTIVITIES, USerGetActivities);
}
