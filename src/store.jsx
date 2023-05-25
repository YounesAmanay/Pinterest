import { legacy_createStore } from 'redux';

const initialState = {
  pins: [],
  selectedCategory: null,
  selectedChat : null,
  chat_user: null,
  authUser:null,
  authName:null,
  chat_user_name:null,
  load:false,
  categories:[],
  boards:[],
  pinsLoad:false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_PINS':
      return {
        ...state,
        pins: action.pins,
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
    case 'SET_CATEGORIES':
      return {
        ...state,
        categories: action.categories,
      };
    case 'SEARCH':
      return {
        ...state,
        pins:action.searchPins
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
        authName:action.authName

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
