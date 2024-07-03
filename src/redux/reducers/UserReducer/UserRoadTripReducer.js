import { createSlice, createAction } from '@reduxjs/toolkit';
import { SagaActions } from '../sagas/SagaActions';

const initialState = {
    UserRoadTripData: null,
    UserRoadTripResponse: null,
};
const saveUserRoadTripData = (state, action) => {
    state.UserRoadTripData = action.payload;
    state.UserRoadTripResponse = null;
};

const saveUserRoadTripResponseData = (state, action) => {
    state.UserRoadTripResponse = action.payload || state.UserRoadTripResponse;
};

const removeUserRoadTripResponseData = state => {
    state.UserRoadTripResponse = null;
    state.UserRoadTripData = null;
};

/*  Login Caller Slice  */
const UserRoadTripSlice = createSlice({
    name: 'UserRoadTrip',
    initialState,

    reducers: {
        saveUserRoadTrip: saveUserRoadTripData,
        saveUserRoadTripResponse: saveUserRoadTripResponseData,
        removeUserRoadTripResponse: removeUserRoadTripResponseData,
    },
});

// Get actions from created Login Caller Slice
const { saveUserRoadTrip, saveUserRoadTripResponse, removeUserRoadTripResponse } =
    UserRoadTripSlice.actions;

const UserRoadTripSliceReducer = UserRoadTripSlice.reducer;

const selectUserRoadTripData = ({ UserRoadTripReducer }) =>
    UserRoadTripReducer.UserRoadTripData ?? null;
const selectUserRoadTripResponse = ({ UserRoadTripReducer }) =>
    UserRoadTripReducer.UserRoadTripResponse ?? null;

export {
    saveUserRoadTrip,
    UserRoadTripSliceReducer,
    removeUserRoadTripResponse,
    saveUserRoadTripResponse,
    selectUserRoadTripData,
    selectUserRoadTripResponse,
};
