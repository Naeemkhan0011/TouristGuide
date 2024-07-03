import { createSlice, createAction } from '@reduxjs/toolkit';
import { SagaActions } from '../sagas/SagaActions';

const initialState = {
    GuidePayStatusData: null,
    GuidePayStatusResponse: null,
};
const saveGuidePayStatusData = (state, action) => {
    state.GuidePayStatusData = action.payload;
    state.GuidePayStatusResponse = null;
};

const saveGuidePayStatusResponseData = (state, action) => {
    state.GuidePayStatusResponse = action.payload || state.GuidePayStatusResponse;
};

const removeGuidePayStatusResponseData = state => {
    state.GuidePayStatusResponse = null;
    state.GuidePayStatusData = null;
};

/*  Signup Caller Slice  */
const GuidePayStatusSlice = createSlice({
    name: 'GuidePayStatus',
    initialState,

    reducers: {
        saveGuidePayStatus: saveGuidePayStatusData,
        saveGuidePayStatusResponse: saveGuidePayStatusResponseData,
        removeGuidePayStatusResponse: removeGuidePayStatusResponseData,
    },
});

// Get actions from created Signup Caller Slice
const { saveGuidePayStatus, saveGuidePayStatusResponse, removeGuidePayStatusResponse } =
    GuidePayStatusSlice.actions;

const GuidePayStatusSliceReducer = GuidePayStatusSlice.reducer;

const selectGuidePayStatusData = ({ GuidePayStatusReducer }) =>
    GuidePayStatusReducer.GuidePayStatusData ?? null;
const selectGuidePayStatusResponse = ({ GuidePayStatusReducer }) =>
    GuidePayStatusReducer.GuidePayStatusResponse ?? null;

export {
    saveGuidePayStatus,
    GuidePayStatusSliceReducer,
    removeGuidePayStatusResponse,
    saveGuidePayStatusResponse,
    selectGuidePayStatusData,
    selectGuidePayStatusResponse,
};
