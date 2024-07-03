import { createSlice, createAction } from '@reduxjs/toolkit';
import { SagaActions } from '../sagas/SagaActions';

const initialState = {
    UserTripMemoriesCountData: null,
    UserTripMemoriesCountResponse: null,
};
const saveUserTripMemoriesCountData = (state, action) => {
    state.UserTripMemoriesCountData = action.payload;
    state.UserTripMemoriesCountResponse = null;
};

const saveUserTripMemoriesCountResponseData = (state, action) => {
    state.UserTripMemoriesCountResponse = action.payload || state.UserTripMemoriesCountResponse;
};

const removeUserTripMemoriesCountResponseData = state => {
    state.UserTripMemoriesCountResponse = null;
    state.UserTripMemoriesCountData = null;
};

/*  TripMemoriesCount Caller Slice  */
const UserTripMemoriesCountSlice = createSlice({
    name: 'UserTripMemoriesCount',
    initialState,

    reducers: {
        saveUserTripMemoriesCount: saveUserTripMemoriesCountData,
        saveUserTripMemoriesCountResponse: saveUserTripMemoriesCountResponseData,
        removeUserTripMemoriesCountResponse: removeUserTripMemoriesCountResponseData,
    },
});

// Get actions from created TripMemoriesCount Caller Slice
const { saveUserTripMemoriesCount, saveUserTripMemoriesCountResponse, removeUserTripMemoriesCountResponse } =
    UserTripMemoriesCountSlice.actions;

const UserTripMemoriesCountSliceReducer = UserTripMemoriesCountSlice.reducer;

const selectUserTripMemoriesCountData = ({ UserTripMemoriesCountReducer }) =>
    UserTripMemoriesCountReducer.UserTripMemoriesCountData ?? null;
const selectUserTripMemoriesCountResponse = ({ UserTripMemoriesCountReducer }) =>
    UserTripMemoriesCountReducer.UserTripMemoriesCountResponse ?? null;

export {
    saveUserTripMemoriesCount,
    UserTripMemoriesCountSliceReducer,
    removeUserTripMemoriesCountResponse,
    saveUserTripMemoriesCountResponse,
    selectUserTripMemoriesCountData,
    selectUserTripMemoriesCountResponse,
};
