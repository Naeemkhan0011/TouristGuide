import { createSlice, createAction } from '@reduxjs/toolkit';
import { SagaActions } from '../sagas/SagaActions';

const initialState = {
    UserFilterApiData: null,
    UserFilterApiResponse: null,
};
const saveUserFilterApiData = (state, action) => {
    state.UserFilterApiData = action.payload;
    state.UserFilterApiResponse = null;
};

const saveUserFilterApiResponseData = (state, action) => {
    state.UserFilterApiResponse = action.payload || state.UserFilterApiResponse;
};

const removeUserFilterApiResponseData = state => {
    state.UserFilterApiResponse = null;
    state.UserFilterApiData = null;
};

/*  Signup Caller Slice  */
const UserFilterApiSlice = createSlice({
    name: 'UserFilterApi',
    initialState,

    reducers: {
        saveUserFilterApi: saveUserFilterApiData,
        saveUserFilterApiResponse: saveUserFilterApiResponseData,
        removeUserFilterApiResponse: removeUserFilterApiResponseData,
    },
});

// Get actions from created Signup Caller Slice
const { saveUserFilterApi, saveUserFilterApiResponse, removeUserFilterApiResponse } =
    UserFilterApiSlice.actions;

const UserFilterApiSliceReducer = UserFilterApiSlice.reducer;

const selectUserFilterApiData = ({ UserFilterApiReducer }) =>
    UserFilterApiReducer.UserFilterApiData ?? null;
const selectUserFilterApiResponse = ({ UserFilterApiReducer }) =>
    UserFilterApiReducer.UserFilterApiResponse ?? null;

export {
    saveUserFilterApi,
    UserFilterApiSliceReducer,
    removeUserFilterApiResponse,
    saveUserFilterApiResponse,
    selectUserFilterApiData,
    selectUserFilterApiResponse,
};
