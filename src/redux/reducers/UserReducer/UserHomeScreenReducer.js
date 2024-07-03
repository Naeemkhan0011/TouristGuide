import { createSlice, createAction } from '@reduxjs/toolkit';
import { SagaActions } from '../sagas/SagaActions';

const initialState = {
    UserHomeScreenData: null,
    UserHomeScreenResponse: null,
};
const saveUserHomeScreenData = (state, action) => {
    state.UserHomeScreenData = action.payload;
    state.UserHomeScreenResponse = null;
};

const saveUserHomeScreenResponseData = (state, action) => {
    state.UserHomeScreenResponse = action.payload || state.UserHomeScreenResponse;
};

const removeUserHomeScreenResponseData = state => {
    state.UserHomeScreenResponse = null;
    state.UserHomeScreenData = null;
};

/*  Signup Caller Slice  */
const UserHomeScreenSlice = createSlice({
    name: 'UserHomeScreen',
    initialState,

    reducers: {
        saveUserHomeScreen: saveUserHomeScreenData,
        saveUserHomeScreenResponse: saveUserHomeScreenResponseData,
        removeUserHomeScreenResponse: removeUserHomeScreenResponseData,
    },
});

// Get actions from created Signup Caller Slice
const { saveUserHomeScreen, saveUserHomeScreenResponse, removeUserHomeScreenResponse } =
    UserHomeScreenSlice.actions;

const UserHomeScreenSliceReducer = UserHomeScreenSlice.reducer;

const selectUserHomeScreenData = ({ UserHomeScreenReducer }) =>
    UserHomeScreenReducer.UserHomeScreenData ?? null;
const selectUserHomeScreenResponse = ({ UserHomeScreenReducer }) =>
    UserHomeScreenReducer.UserHomeScreenResponse ?? null;

export {
    saveUserHomeScreen,
    UserHomeScreenSliceReducer,
    removeUserHomeScreenResponse,
    saveUserHomeScreenResponse,
    selectUserHomeScreenData,
    selectUserHomeScreenResponse,
};
