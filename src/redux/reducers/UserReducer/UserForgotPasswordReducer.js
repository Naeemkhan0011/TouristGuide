import { createSlice, createAction } from '@reduxjs/toolkit';
import { SagaActions } from '../sagas/SagaActions';

const initialState = {
    UserForgotPasswordData: null,
    UserForgotPasswordResponse: null,
};
const saveUserForgotPasswordData = (state, action) => {
    state.UserForgotPasswordData = action.payload;
    state.UserForgotPasswordResponse = null;
};

const saveUserForgotPasswordResponseData = (state, action) => {
    state.UserForgotPasswordResponse = action.payload || state.UserForgotPasswordResponse;
};

const removeUserForgotPasswordResponseData = state => {
    state.UserForgotPasswordResponse = null;
    state.UserForgotPasswordData = null;
};

/*  Signup Caller Slice  */
const UserForgotPasswordSlice = createSlice({
    name: 'UserForgotPassword',
    initialState,

    reducers: {
        saveUserForgotPassword: saveUserForgotPasswordData,
        saveUserForgotPasswordResponse: saveUserForgotPasswordResponseData,
        removeUserForgotPasswordResponse: removeUserForgotPasswordResponseData,
    },
});

// Get actions from created Signup Caller Slice
const { saveUserForgotPassword, saveUserForgotPasswordResponse, removeUserForgotPasswordResponse } =
    UserForgotPasswordSlice.actions;

const UserForgotPasswordSliceReducer = UserForgotPasswordSlice.reducer;

const selectUserForgotPasswordData = ({ UserForgotPasswordReducer }) =>
    UserForgotPasswordReducer.UserForgotPasswordData ?? null;
const selectUserForgotPasswordResponse = ({ UserForgotPasswordReducer }) =>
    UserForgotPasswordReducer.UserForgotPasswordResponse ?? null;

export {
    saveUserForgotPassword,
    UserForgotPasswordSliceReducer,
    removeUserForgotPasswordResponse,
    saveUserForgotPasswordResponse,
    selectUserForgotPasswordData,
    selectUserForgotPasswordResponse,
};
