import { createSlice, createAction } from '@reduxjs/toolkit';
import { SagaActions } from '../sagas/SagaActions';

const initialState = {
    UserCreateTripData: null,
    UserCreateTripResponse: null,
};
const saveUserCreateTripData = (state, action) => {
    state.UserCreateTripData = action.payload;
    state.UserCreateTripResponse = null;
};

const saveUserCreateTripResponseData = (state, action) => {
    state.UserCreateTripResponse = action.payload || state.UserCreateTripResponse;
};

const removeUserCreateTripResponseData = state => {
    state.UserCreateTripResponse = null;
    state.UserCreateTripData = null;
};

/*  Signup Caller Slice  */
const UserCreateTripSlice = createSlice({
    name: 'UserCreateTrip',
    initialState,

    reducers: {
        saveUserCreateTrip: saveUserCreateTripData,
        saveUserCreateTripResponse: saveUserCreateTripResponseData,
        removeUserCreateTripResponse: removeUserCreateTripResponseData,
    },
});

// Get actions from created Signup Caller Slice
const { saveUserCreateTrip, saveUserCreateTripResponse, removeUserCreateTripResponse } =
    UserCreateTripSlice.actions;

const UserCreateTripSliceReducer = UserCreateTripSlice.reducer;

const selectUserCreateTripData = ({ UserCreateTripReducer }) =>
    UserCreateTripReducer.UserCreateTripData ?? null;
const selectUserCreateTripResponse = ({ UserCreateTripReducer }) =>
    UserCreateTripReducer.UserCreateTripResponse ?? null;

export {
    saveUserCreateTrip,
    UserCreateTripSliceReducer,
    removeUserCreateTripResponse,
    saveUserCreateTripResponse,
    selectUserCreateTripData,
    selectUserCreateTripResponse,
};
