import {SagaActions} from '../redux/sagas/SagaActions';
import ApiUrls from './ApiUrls';

export const ApiCalls = ({apiType}) => {
  let requestType = '';
  let requestUrl = '';
  switch (apiType) {
    /*--------------- USER API CALLS --------------*/

    /* POST request */
    case SagaActions.USER_SIGN_UP:
      requestType = 'POST';
      requestUrl = ApiUrls.USER_SIGN_UP_URL;
      break;

    case SagaActions.USER_CREATE_TRIP:
      requestType = 'POST';
      requestUrl = ApiUrls.USER_CREATE_TRIP_URL;
      break;

    /* PATCH request */
    case SagaActions.USER_FILTER_API:
      requestType = 'PATCH';
      requestUrl = ApiUrls.USER_FILTER_API_URL;
      break;
    /* PUT request */

    case SagaActions.USER_LOGIN:
      requestType = 'PUT';
      requestUrl = ApiUrls.USER_LOGIN_URL;
      break;

    case SagaActions.USER_VERIFY_OPT:
      requestType = 'PUT';
      requestUrl = ApiUrls.USER_VERIFY_OTP_URL;
      break;

    case SagaActions.USER_FORGOT_PASSWORD:
      requestType = 'PUT';
      requestUrl = ApiUrls.USER_FORGOT_PASSWORD_URL;
      break;

    case SagaActions.USER_UPDATE_PASSWORD:
      requestType = 'PUT';
      requestUrl = ApiUrls.USER_UPDATE_PASSWORD_URL;
      break;

    case SagaActions.USER_HOME_SCREEN:
      requestType = 'PUT';
      requestUrl = ApiUrls.USER_HOME_SCREEN_URL;
      break;

    case SagaActions.USER_ROAD_TRIP:
      requestType = 'PUT';
      requestUrl = ApiUrls.USER_ROAD_TRIP_URL;
      break;

    case SagaActions.USER_OFF_ROAD_TRIP:
      requestType = 'PUT';
      requestUrl = ApiUrls.USER_OFF_ROAD_TRIP_URL;
      break;

    /* GET request */

    case SagaActions.USER_GET_PROFILE:
      requestType = 'GET';
      requestUrl = ApiUrls.USER_GET_PROFILE_URL;
      break;

    /*--------------- GUIDE API CALLS --------------*/

    /* POST request */

    /* PATCH request */

    /* PUT request */
    case SagaActions.GUIDE_COMPLETE_PROFILE:
      requestType = 'PUT';
      requestUrl = ApiUrls.GUIDE_COMPLETE_PROFILE_URL;
      break;

    case SagaActions.GUIDE_PAY_STATUS:
      requestType = 'PUT';
      requestUrl = ApiUrls.GUIDE_PAY_STATUS_URL;
      break;

    /*  GET request */
    case SagaActions.GUIDE_GET_PROFILE:
      requestType = 'GET';
      requestUrl = ApiUrls.GUIDE_GET_PROFILE_URL;
      break;

    case SagaActions.USER_TRIP_MEMORIES_COUNT:
      requestType = 'GET';
      requestUrl = ApiUrls.USER_TRIP_MEMORIES_COUNT_URL;
      break;

    case SagaActions.USER_TRIP_MEMORIES_COUNT:
      requestType = 'GET';
      requestUrl = ApiUrls.USER_TRIP_MEMORIES_COUNT_URL;
      break;

    case SagaActions.USER_GET_ALL_TRIP_LIST:
      requestType = 'GET';
      requestUrl = ApiUrls.USER_GET_ALL_TRIP_LIST_URL;
      break;

    case SagaActions.USER_GET_LOCAL_TRIP_MEMORIES:
      requestType = 'GET';
      requestUrl = ApiUrls.USER_GET_LOCAL_TRIP_MEMORIES_URL;
      break;

    default:
      requestType = '';
      requestUrl = '';
      break;
  }
  return {requestType, requestUrl};
};
