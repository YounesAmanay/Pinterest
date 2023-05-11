
const initialState = {
  pins: [],
  loading: false,
  error: null,
  userProfile: null,
  boards: [],
  selectedBoard: null,
};

const FETCH_PINS_REQUEST = 'FETCH_PINS_REQUEST';
const FETCH_PINS_SUCCESS = 'FETCH_PINS_SUCCESS';
const FETCH_PINS_FAILURE = 'FETCH_PINS_FAILURE';
const FETCH_USER_PROFILE_REQUEST = 'FETCH_USER_PROFILE_REQUEST';
const FETCH_USER_PROFILE_SUCCESS = 'FETCH_USER_PROFILE_SUCCESS';
const FETCH_USER_PROFILE_FAILURE = 'FETCH_USER_PROFILE_FAILURE';
const SEARCH_PINS_REQUEST = 'SEARCH_PINS_REQUEST';
const SEARCH_PINS_SUCCESS = 'SEARCH_PINS_SUCCESS';
const SEARCH_PINS_FAILURE = 'SEARCH_PINS_FAILURE';
const FETCH_BOARDS_REQUEST = 'FETCH_BOARDS_REQUEST';
const FETCH_BOARDS_SUCCESS = 'FETCH_BOARDS_SUCCESS';
const FETCH_BOARDS_FAILURE = 'FETCH_BOARDS_FAILURE';
const SELECT_BOARD = 'SELECT_BOARD';

const pinterestReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PINS_REQUEST:
    case FETCH_USER_PROFILE_REQUEST:
    case SEARCH_PINS_REQUEST:
    case FETCH_BOARDS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_PINS_SUCCESS:
      return {
        ...state,
        loading: false,
        pins: action.payload,
      };
    case FETCH_USER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        userProfile: action.payload,
      };
    case SEARCH_PINS_SUCCESS:
      return {
        ...state,
        loading: false,
        pins: action.payload,
      };
    case FETCH_BOARDS_SUCCESS:
      return {
        ...state,
        loading: false,
        boards: action.payload,
      };
    case SELECT_BOARD:
      return {
        ...state,
        selectedBoard: action.payload,
      };
    case FETCH_PINS_FAILURE:
    case FETCH_USER_PROFILE_FAILURE:
    case SEARCH_PINS_FAILURE:
    case FETCH_BOARDS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default pinterestReducer;
