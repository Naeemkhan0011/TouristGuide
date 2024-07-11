import { createSlice, createAction } from '@reduxjs/toolkit';
import { SagaActions } from '../sagas/SagaActions';

const initialState = {
    UserGuideDetailData: null,
    UserGuideDetailResponse: null,
};
const saveUserGuideDetailData = (state, action) => {
    state.UserGuideDetailData = action.payload;
    state.UserGuideDetailResponse = null;
};

const saveUserGuideDetailResponseData = (state, action) => {
    state.UserGuideDetailResponse = action.payload || state.UserGuideDetailResponse;
};

const removeUserGuideDetailResponseData = state => {
    state.UserGuideDetailResponse = null;
    state.UserGuideDetailData = null;
};

/*  Signup Caller Slice  */
const UserGuideDetailSlice = createSlice({
    name: 'UserGuideDetail',
    initialState,

    reducers: {
        saveUserGuideDetail: saveUserGuideDetailData,
        saveUserGuideDetailResponse: saveUserGuideDetailResponseData,
        removeUserGuideDetailResponse: removeUserGuideDetailResponseData,
    },
});

// Get actions from created Signup Caller Slice
const { saveUserGuideDetail, saveUserGuideDetailResponse, removeUserGuideDetailResponse } =
    UserGuideDetailSlice.actions;

const UserGuideDetailSliceReducer = UserGuideDetailSlice.reducer;

const selectUserGuideDetailData = ({ UserGuideDetailReducer }) =>
    UserGuideDetailReducer.UserGuideDetailData ?? null;
const selectUserGuideDetailResponse = ({ UserGuideDetailReducer }) =>
    UserGuideDetailReducer.UserGuideDetailResponse ?? null;

export {
    saveUserGuideDetail,
    UserGuideDetailSliceReducer,
    removeUserGuideDetailResponse,
    saveUserGuideDetailResponse,
    selectUserGuideDetailData,
    selectUserGuideDetailResponse,
};
