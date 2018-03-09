import { combineReducers } from 'redux';
import {
  MESSAGES_RECEIVED,
  COMPOSE_FORM_TOGGLED,
  MESSAGE_CREATED,
  SELECT_ALL_TOGGLED,
  MARKED_AS_READ,
  MARKED_AS_UNREAD
} from '../actions';

function messages(state = { all: [] }, action) {
  switch (action.type) {
    case MESSAGES_RECEIVED:
      return {
        ...state,
        all: action.messages
      };
    case MESSAGE_CREATED:
      return {
        ...state,
        all: [...state.all, action.message]
      };
    case SELECT_ALL_TOGGLED:
      return {
        ...state,
        all: action.messages
      };
    case MARKED_AS_READ:
      return {
        ...state,
        all: action.selectedMessages
      };
    case MARKED_AS_UNREAD:
      return {
        ...state,
        all: action.selectedMessages
      };
    default:
      return state;
  }
}

function compose(state = false, action) {
  switch (action.type) {
    case COMPOSE_FORM_TOGGLED:
      return !state;
    default:
      return state;
  }
}

export default combineReducers({
  messages,
  showComposeForm: compose
});
