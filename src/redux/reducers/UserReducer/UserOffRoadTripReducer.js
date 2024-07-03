import { createSlice, createAction } from '@reduxjs/toolkit';
import { SagaActions } from '../sagas/SagaActions';

const initialState = {
    UserOffRoadTripData: null,
    UserOffRoadTripResponse: null,
};
const saveUserOffRoadTripData = (state, action) => {
    state.UserOffRoadTripData = action.payload;
    state.UserOffRoadTripResponse = null;
};

const saveUserOffRoadTripResponseData = (state, action) => {
    state.UserOffRoadTripResponse = action.payload || state.UserOffRoadTripResponse;
};

const removeUserOffRoadTripResponseData = state => {
    state.UserOffRoadTripResponse = null;
    state.UserOffRoadTripData = null;
};

/*  Login Caller Slice  */
const UserOffRoadTripSlice = createSlice({
    name: 'UserOffRoadTrip',
    initialState,

    reducers: {
        saveUserOffRoadTrip: saveUserOffRoadTripData,
        saveUserOffRoadTripResponse: saveUserOffRoadTripResponseData,
        removeUserOffRoadTripResponse: removeUserOffRoadTripResponseData,
    },
});

// Get actions from created Login Caller Slice
const { saveUserOffRoadTrip, saveUserOffRoadTripResponse, removeUserOffRoadTripResponse } =
    UserOffRoadTripSlice.actions;

const UserOffRoadTripSliceReducer = UserOffRoadTripSlice.reducer;

const selectUserOffRoadTripData = ({ UserOffRoadTripReducer }) =>
    UserOffRoadTripReducer.UserOffRoadTripData ?? null;
const selectUserOffRoadTripResponse = ({ UserOffRoadTripReducer }) =>
    UserOffRoadTripReducer.UserOffRoadTripResponse ?? null;

export {
    saveUserOffRoadTrip,
    UserOffRoadTripSliceReducer,
    removeUserOffRoadTripResponse,
    saveUserOffRoadTripResponse,
    selectUserOffRoadTripData,
    selectUserOffRoadTripResponse,
};
