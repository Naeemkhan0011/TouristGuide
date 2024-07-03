import { createSlice, createAction } from '@reduxjs/toolkit';
import { SagaActions } from '../sagas/SagaActions';

const initialState = {
    UserVerifyOtpData: null,
    UserVerifyOtpResponse: null,
};
const saveUserVerifyOtpData = (state, action) => {
    state.UserVerifyOtpData = action.payload;
    state.UserVerifyOtpResponse = null;
};

const saveUserVerifyOtpResponseData = (state, action) => {
    state.UserVerifyOtpResponse = action.payload || state.UserVerifyOtpResponse;
};

const removeUserVerifyOtpResponseData = state => {
    state.UserVerifyOtpResponse = null;
    state.UserVerifyOtpData = null;
};

/*  Signup Caller Slice  */
const UserVerifyOtpSlice = createSlice({
    name: 'UserVerifyOtp',
    initialState,

    reducers: {
        saveUserVerifyOtp: saveUserVerifyOtpData,
        saveUserVerifyOtpResponse: saveUserVerifyOtpResponseData,
        removeUserVerifyOtpResponse: removeUserVerifyOtpResponseData,
    },
});

// Get actions from created Signup Caller Slice
const { saveUserVerifyOtp, saveUserVerifyOtpResponse, removeUserVerifyOtpResponse } =
    UserVerifyOtpSlice.actions;

const UserVerifyOtpSliceReducer = UserVerifyOtpSlice.reducer;

const selectUserVerifyOtpData = ({ UserVerifyOtpReducer }) =>
    UserVerifyOtpReducer.UserVerifyOtpData ?? null;
const selectUserVerifyOtpResponse = ({ UserVerifyOtpReducer }) =>
    UserVerifyOtpReducer.UserVerifyOtpResponse ?? null;

export {
    saveUserVerifyOtp,
    UserVerifyOtpSliceReducer,
    removeUserVerifyOtpResponse,
    saveUserVerifyOtpResponse,
    selectUserVerifyOtpData,
    selectUserVerifyOtpResponse,
};
