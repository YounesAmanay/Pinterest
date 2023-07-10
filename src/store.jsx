import { legacy_createStore } from 'redux';

const initialState = {
  pins: [],
  selectedCategory: null,
  categories:[],
  selectedChat : null,
  chat_user: null,
  authUser:null,
  authName:null,
  chat_user_name:null,
  search : false,
  load:false,
  boards:[],
  pinsLoad:false,
  messages:[],
  onboarding:false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_PINS':
      return {
        ...state,
        pins: action.pins,
      };
    case 'SET_CATEGORIES':
      return {
        ...state,
        categories: action.categories,
      };
    case 'SET_BOARDS':
      return {
        ...state,
        boards: action.boards,
      };
    case 'SET_MESSAGES':
      return {
        ...state,
        messages: [...state.messages, action.message],
      };
    case 'CLEAR_MESSAGES':
      return {
        ...state,
        messages:[],
      };
      case 'UPLOAD_PIN':
        return {
          ...state,
          pinsLoad: action.data,
        };      
    case 'SET_CATEGORY_PINS':
      return {
        ...state,
        pins: action.pins,
      };
    case 'SELECT_CATEGORY':
      return {
        ...state,
        selectedCategory: action.selectedCategory,
      };
    case 'SEARCH':
      return {
        ...state,
        search:action.search
      };
    case 'SELECT_CHAT':
      return {
        ...state,
        selectedChat:action.chatID,
        chat_user:action.userID,
        chat_user_name:action.name
      };
    case 'AUTHENTICATED_USER':
      return {
        ...state,
        authUser:action.auth,
        authName:action.authName,
        onboarding:action.onboarding,
      };
    case 'SHOULD_LOAD':
      return {
        ...state,
        load:action.load
      };
    default:
      return state;
  }
}

const store = legacy_createStore(reducer);

export default store;
