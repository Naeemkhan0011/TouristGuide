import { createSlice, createAction } from '@reduxjs/toolkit';
import { SagaActions } from '../sagas/SagaActions';

const initialState = {
    UserLoginData: null,
    UserLoginResponse: null,
};
const saveUserLoginData = (state, action) => {
    state.UserLoginData = action.payload;
    state.UserLoginResponse = null;
};

const saveUserLoginResponseData = (state, action) => {
    state.UserLoginResponse = action.payload || state.UserLoginResponse;
};

const removeUserLoginResponseData = state => {
    state.UserLoginResponse = null;
    state.UserLoginData = null;
};

/*  Login Caller Slice  */
const UserLoginSlice = createSlice({
    name: 'UserLogin',
    initialState,

    reducers: {
        saveUserLogin: saveUserLoginData,
        saveUserLoginResponse: saveUserLoginResponseData,
        removeUserLoginResponse: removeUserLoginResponseData,
    },
});

// Get actions from created Login Caller Slice
const { saveUserLogin, saveUserLoginResponse, removeUserLoginResponse } =
    UserLoginSlice.actions;

const UserLoginSliceReducer = UserLoginSlice.reducer;

const selectUserLoginData = ({ UserLoginReducer }) =>
    UserLoginReducer.UserLoginData ?? null;
const selectUserLoginResponse = ({ UserLoginReducer }) =>
    UserLoginReducer.UserLoginResponse ?? null;

export {
    saveUserLogin,
    UserLoginSliceReducer,
    removeUserLoginResponse,
    saveUserLoginResponse,
    selectUserLoginData,
    selectUserLoginResponse,
};
