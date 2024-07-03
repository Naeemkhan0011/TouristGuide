import { createSlice, createAction } from '@reduxjs/toolkit';
import { SagaActions } from '../sagas/SagaActions';

const initialState = {
    GuideCompleteProfileData: null,
    GuideCompleteProfileResponse: null,
};
const saveGuideCompleteProfileData = (state, action) => {
    state.GuideCompleteProfileData = action.payload;
    state.GuideCompleteProfileResponse = null;
};

const saveGuideCompleteProfileResponseData = (state, action) => {
    state.GuideCompleteProfileResponse = action.payload || state.GuideCompleteProfileResponse;
};

const removeGuideCompleteProfileResponseData = state => {
    state.GuideCompleteProfileResponse = null;
    state.GuideCompleteProfileData = null;
};

/*  Signup Caller Slice  */
const GuideCompleteProfileSlice = createSlice({
    name: 'GuideCompleteProfile',
    initialState,

    reducers: {
        saveGuideCompleteProfile: saveGuideCompleteProfileData,
        saveGuideCompleteProfileResponse: saveGuideCompleteProfileResponseData,
        removeGuideCompleteProfileResponse: removeGuideCompleteProfileResponseData,
    },
});

// Get actions from created Signup Caller Slice
const { saveGuideCompleteProfile, saveGuideCompleteProfileResponse, removeGuideCompleteProfileResponse } =
    GuideCompleteProfileSlice.actions;

const GuideCompleteProfileSliceReducer = GuideCompleteProfileSlice.reducer;

const selectGuideCompleteProfileData = ({ GuideCompleteProfileReducer }) =>
    GuideCompleteProfileReducer.GuideCompleteProfileData ?? null;
const selectGuideCompleteProfileResponse = ({ GuideCompleteProfileReducer }) =>
    GuideCompleteProfileReducer.GuideCompleteProfileResponse ?? null;

export {
    saveGuideCompleteProfile,
    GuideCompleteProfileSliceReducer,
    removeGuideCompleteProfileResponse,
    saveGuideCompleteProfileResponse,
    selectGuideCompleteProfileData,
    selectGuideCompleteProfileResponse,
};
