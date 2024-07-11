const BASE_API_URL =    
  'http://ec2-52-66-186-107.ap-south-1.compute.amazonaws.com:5001/api/';
  export default {      
  /*--------------- USER API URLS --------------*/
  USER_SIGN_UP_URL: `${BASE_API_URL}user/signup`,
  USER_VERIFY_OTP_URL: `${BASE_API_URL}user/verifyOtp`,
  USER_LOGIN_URL: `${BASE_API_URL}user/login`,
  USER_FORGOT_PASSWORD_URL: `${BASE_API_URL}user/sendOTP`,
  USER_UPDATE_PASSWORD_URL: `${BASE_API_URL}user/updatePassword`,
  USER_HOME_SCREEN_URL: `${BASE_API_URL}user/homepage`,
  USER_ROAD_TRIP_URL: `${BASE_API_URL}user/roadTripLocal`,
  USER_OFF_ROAD_TRIP_URL: `${BASE_API_URL}user/offRoadLocal`,
  USER_GET_PROFILE_URL: `${BASE_API_URL}user/getProfile`,
  USER_FILTER_API_URL: `${BASE_API_URL}user/getGuideList`,
  USER_CREATE_TRIP_URL: `${BASE_API_URL}user/createTrip`,
  USER_GET_ALL_TRIP_LIST_URL: `${BASE_API_URL}user/getTripList`,
  USER_GET_LOCAL_TRIP_MEMORIES_URL: `${BASE_API_URL}user/getLocalTripMemories`,
  USER_REVIEW_DETAIL_URL: `${BASE_API_URL}user/reviewsDetails`,
  USER_TRIP_MEMORIES_COUNT_URL: `${BASE_API_URL}user/getTripMemoriesCount`,
  USER_GET_PROFILE_DETAIL_URL: `${BASE_API_URL}user/getProfileDetails`,
  USER_GET_ACTIVITIES_URL: `${BASE_API_URL}user/ActivityList`,
  USER_TRIP_DETAILS_URL: `${BASE_API_URL}user/tripDetails`,
  USER_GUIDE_DETAIL_URL: `${BASE_API_URL}user/getProfileDetails`,
  
  /*--------------- GUIDE API URLS --------------*/
  GUIDE_GET_PROFILE_URL: `${BASE_API_URL}guide/getProfileDetails`,
  GUIDE_PAY_STATUS_URL: `${BASE_API_URL}guide/payStatus`,
  GUIDE_COMPLETE_PROFILE_URL: `${BASE_API_URL}guide/completeProfile`,


};
