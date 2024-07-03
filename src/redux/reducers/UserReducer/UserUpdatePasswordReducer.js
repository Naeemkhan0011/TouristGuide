import { createSlice, createAction } from '@reduxjs/toolkit';
import { SagaActions } from '../sagas/SagaActions';

const initialState = {
    UserUpdatePasswordData: null,
    UserUpdatePasswordResponse: null,
};
const saveUserUpdatePasswordData = (state, action) => {
    state.UserUpdatePasswordData = action.payload;
    state.UserUpdatePasswordResponse = null;
};

const saveUserUpdatePasswordResponseData = (state, action) => {
    state.UserUpdatePasswordResponse = action.payload || state.UserUpdatePasswordResponse;
};

const removeUserUpdatePasswordResponseData = state => {
    state.UserUpdatePasswordResponse = null;
    state.UserUpdatePasswordData = null;
};

/*  Signup Caller Slice  */
const UserUpdatePasswordSlice = createSlice({
    name: 'UserUpdatePassword',
    initialState,

    reducers: {
        saveUserUpdatePassword: saveUserUpdatePasswordData,
        saveUserUpdatePasswordResponse: saveUserUpdatePasswordResponseData,
        removeUserUpdatePasswordResponse: removeUserUpdatePasswordResponseData,
    },
});

// Get actions from created Signup Caller Slice
const { saveUserUpdatePassword, saveUserUpdatePasswordResponse, removeUserUpdatePasswordResponse } =
    UserUpdatePasswordSlice.actions;

const UserUpdatePasswordSliceReducer = UserUpdatePasswordSlice.reducer;

const selectUserUpdatePasswordData = ({ UserUpdatePasswordReducer }) =>
    UserUpdatePasswordReducer.UserUpdatePasswordData ?? null;
const selectUserUpdatePasswordResponse = ({ UserUpdatePasswordReducer }) =>
    UserUpdatePasswordReducer.UserUpdatePasswordResponse ?? null;

export {
    saveUserUpdatePassword,
    UserUpdatePasswordSliceReducer,
    removeUserUpdatePasswordResponse,
    saveUserUpdatePasswordResponse,
    selectUserUpdatePasswordData,
    selectUserUpdatePasswordResponse,
};
