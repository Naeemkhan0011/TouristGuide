import { createSlice, createAction } from '@reduxjs/toolkit';
import { SagaActions } from '../sagas/SagaActions';

const initialState = {
    UserTripDetailData: null,
    UserTripDetailResponse: null,
};
const saveUserTripDetailData = (state, action) => {
    state.UserTripDetailData = action.payload;
    state.UserTripDetailResponse = null;
};

const saveUserTripDetailResponseData = (state, action) => {
    state.UserTripDetailResponse = action.payload || state.UserTripDetailResponse;
};

const removeUserTripDetailResponseData = state => {
    state.UserTripDetailResponse = null;
    state.UserTripDetailData = null;
};

/*  Signup Caller Slice  */
const UserTripDetailSlice = createSlice({
    name: 'UserTripDetail',
    initialState,

    reducers: {
        saveUserTripDetail: saveUserTripDetailData,
        saveUserTripDetailResponse: saveUserTripDetailResponseData,
        removeUserTripDetailResponse: removeUserTripDetailResponseData,
    },
});

// Get actions from created Signup Caller Slice
const { saveUserTripDetail, saveUserTripDetailResponse, removeUserTripDetailResponse } =
    UserTripDetailSlice.actions;

const UserTripDetailSliceReducer = UserTripDetailSlice.reducer;

const selectUserTripDetailData = ({ UserTripDetailReducer }) =>
    UserTripDetailReducer.UserTripDetailData ?? null;
const selectUserTripDetailResponse = ({ UserTripDetailReducer }) =>
    UserTripDetailReducer.UserTripDetailResponse ?? null;

export {
    saveUserTripDetail,
    UserTripDetailSliceReducer,
    removeUserTripDetailResponse,
    saveUserTripDetailResponse,
    selectUserTripDetailData,
    selectUserTripDetailResponse,
};
