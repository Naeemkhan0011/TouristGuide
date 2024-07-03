import { createSlice, createAction } from '@reduxjs/toolkit';
import { SagaActions } from '../sagas/SagaActions';

const initialState = {
    UserSignupData: null,
    UserSignupResponse: null,
};
const saveUserSignupData = (state, action) => {
    state.UserSignupData = action.payload;
    state.UserSignupResponse = null;
};

const saveUserSignupResponseData = (state, action) => {
    state.UserSignupResponse = action.payload || state.UserSignupResponse;
};

const removeUserSignupResponseData = state => {
    state.UserSignupResponse = null;
    state.UserSignupData = null;
};

/*  Signup Caller Slice  */
const UserSignupSlice = createSlice({
    name: 'UserSignup',
    initialState,

    reducers: {
        saveUserSignup: saveUserSignupData,
        saveUserSignupResponse: saveUserSignupResponseData,
        removeUserSignupResponse: removeUserSignupResponseData,
    },
});

// Get actions from created Signup Caller Slice
const { saveUserSignup, saveUserSignupResponse, removeUserSignupResponse } =
    UserSignupSlice.actions;

const UserSignupSliceReducer = UserSignupSlice.reducer;

const selectUserSignupData = ({ UserSignupReducer }) =>
    UserSignupReducer.UserSignupData ?? null;
const selectUserSignupResponse = ({ UserSignupReducer }) =>
    UserSignupReducer.UserSignupResponse ?? null;

export {
    saveUserSignup,
    UserSignupSliceReducer,
    removeUserSignupResponse,
    saveUserSignupResponse,
    selectUserSignupData,
    selectUserSignupResponse,
};
