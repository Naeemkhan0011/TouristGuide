import { createSlice, createAction } from '@reduxjs/toolkit';
import { SagaActions } from '../sagas/SagaActions';

const initialState = {
    USerGetActivitiesData: null,
    USerGetActivitiesResponse: null,
};
const saveUSerGetActivitiesData = (state, action) => {
    state.USerGetActivitiesData = action.payload;
    state.USerGetActivitiesResponse = null;
};

const saveUSerGetActivitiesResponseData = (state, action) => {
    state.USerGetActivitiesResponse = action.payload || state.USerGetActivitiesResponse;
};

const removeUSerGetActivitiesResponseData = state => {
    state.USerGetActivitiesResponse = null;
    state.USerGetActivitiesData = null;
};

/*  Signup Caller Slice  */
const USerGetActivitiesSlice = createSlice({
    name: 'USerGetActivities',
    initialState,

    reducers: {
        saveUSerGetActivities: saveUSerGetActivitiesData,
        saveUSerGetActivitiesResponse: saveUSerGetActivitiesResponseData,
        removeUSerGetActivitiesResponse: removeUSerGetActivitiesResponseData,
    },
});

// Get actions from created Signup Caller Slice
const { saveUSerGetActivities, saveUSerGetActivitiesResponse, removeUSerGetActivitiesResponse } =
    USerGetActivitiesSlice.actions;

const USerGetActivitiesSliceReducer = USerGetActivitiesSlice.reducer;

const selectUSerGetActivitiesData = ({ USerGetActivitiesReducer }) =>
    USerGetActivitiesReducer.USerGetActivitiesData ?? null;
const selectUSerGetActivitiesResponse = ({ USerGetActivitiesReducer }) =>
    USerGetActivitiesReducer.USerGetActivitiesResponse ?? null;

export {
    saveUSerGetActivities,
    USerGetActivitiesSliceReducer,
    removeUSerGetActivitiesResponse,
    saveUSerGetActivitiesResponse,
    selectUSerGetActivitiesData,
    selectUSerGetActivitiesResponse,
};
