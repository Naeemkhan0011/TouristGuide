import { createSlice, createAction } from '@reduxjs/toolkit';
import { SagaActions } from '../sagas/SagaActions';

const initialState = {
    UserGetProfileData: null,
    UserGetProfileResponse: null,
};
const saveUserGetProfileData = (state, action) => {
    state.UserGetProfileData = action.payload;
    state.UserGetProfileResponse = null;
};

const saveUserGetProfileResponseData = (state, action) => {
    state.UserGetProfileResponse = action.payload || state.UserGetProfileResponse;
};

const removeUserGetProfileResponseData = state => {
    state.UserGetProfileResponse = null;
    state.UserGetProfileData = null;
};

/*  Signup Caller Slice  */
const UserGetProfileSlice = createSlice({
    name: 'UserGetProfile',
    initialState,

    reducers: {
        saveUserGetProfile: saveUserGetProfileData,
        saveUserGetProfileResponse: saveUserGetProfileResponseData,
        removeUserGetProfileResponse: removeUserGetProfileResponseData,
    },
});

// Get actions from created Signup Caller Slice
const { saveUserGetProfile, saveUserGetProfileResponse, removeUserGetProfileResponse } =
    UserGetProfileSlice.actions;

const UserGetProfileSliceReducer = UserGetProfileSlice.reducer;

const selectUserGetProfileData = ({ UserGetProfileReducer }) =>
    UserGetProfileReducer.UserGetProfileData ?? null;
const selectUserGetProfileResponse = ({ UserGetProfileReducer }) =>
    UserGetProfileReducer.UserGetProfileResponse ?? null;

export {
    saveUserGetProfile,
    UserGetProfileSliceReducer,
    removeUserGetProfileResponse,
    saveUserGetProfileResponse,
    selectUserGetProfileData,
    selectUserGetProfileResponse,
};
