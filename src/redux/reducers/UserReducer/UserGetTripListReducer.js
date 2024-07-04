import { createSlice, createAction } from '@reduxjs/toolkit';
import { SagaActions } from '../sagas/SagaActions';

const initialState = {
    UserGetTripListData: null,
    UserGetTripListResponse: null,
};
const saveUserGetTripListData = (state, action) => {
    state.UserGetTripListData = action.payload;
    state.UserGetTripListResponse = null;
};

const saveUserGetTripListResponseData = (state, action) => {
    state.UserGetTripListResponse = action.payload || state.UserGetTripListResponse;
};

const removeUserGetTripListResponseData = state => {
    state.UserGetTripListResponse = null;
    state.UserGetTripListData = null;
};

/*  Signup Caller Slice  */
const UserGetTripListSlice = createSlice({
    name: 'UserGetTripList',
    initialState,

    reducers: {
        saveUserGetTripList: saveUserGetTripListData,
        saveUserGetTripListResponse: saveUserGetTripListResponseData,
        removeUserGetTripListResponse: removeUserGetTripListResponseData,
    },
});

// Get actions from created Signup Caller Slice
const { saveUserGetTripList, saveUserGetTripListResponse, removeUserGetTripListResponse } =
    UserGetTripListSlice.actions;

const UserGetTripListSliceReducer = UserGetTripListSlice.reducer;

const selectUserGetTripListData = ({ UserGetTripListReducer }) =>
    UserGetTripListReducer.UserGetTripListData ?? null;
const selectUserGetTripListResponse = ({ UserGetTripListReducer }) =>
    UserGetTripListReducer.UserGetTripListResponse ?? null;

export {
    saveUserGetTripList,
    UserGetTripListSliceReducer,
    removeUserGetTripListResponse,
    saveUserGetTripListResponse,
    selectUserGetTripListData,
    selectUserGetTripListResponse,
};
