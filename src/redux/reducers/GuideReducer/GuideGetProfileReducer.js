import { createSlice, createAction } from '@reduxjs/toolkit';
import { SagaActions } from '../sagas/SagaActions';

const initialState = {
    GuideGetProfileData: null,
    GuideGetProfileResponse: null,
};
const saveGuideGetProfileData = (state, action) => {
    state.GuideGetProfileData = action.payload;
    state.GuideGetProfileResponse = null;
};

const saveGuideGetProfileResponseData = (state, action) => {
    state.GuideGetProfileResponse = action.payload || state.GuideGetProfileResponse;
};

const removeGuideGetProfileResponseData = state => {
    state.GuideGetProfileResponse = null;
    state.GuideGetProfileData = null;
};

/*  Signup Caller Slice  */
const GuideGetProfileSlice = createSlice({
    name: 'GuideGetProfile',
    initialState,

    reducers: {
        saveGuideGetProfile: saveGuideGetProfileData,
        saveGuideGetProfileResponse: saveGuideGetProfileResponseData,
        removeGuideGetProfileResponse: removeGuideGetProfileResponseData,
    },
});

// Get actions from created Signup Caller Slice
const { saveGuideGetProfile, saveGuideGetProfileResponse, removeGuideGetProfileResponse } =
    GuideGetProfileSlice.actions;

const GuideGetProfileSliceReducer = GuideGetProfileSlice.reducer;

const selectGuideGetProfileData = ({ GuideGetProfileReducer }) =>
    GuideGetProfileReducer.GuideGetProfileData ?? null;
const selectGuideGetProfileResponse = ({ GuideGetProfileReducer }) =>
    GuideGetProfileReducer.GuideGetProfileResponse ?? null;

export {
    saveGuideGetProfile,
    GuideGetProfileSliceReducer,
    removeGuideGetProfileResponse,
    saveGuideGetProfileResponse,
    selectGuideGetProfileData,
    selectGuideGetProfileResponse,
};
