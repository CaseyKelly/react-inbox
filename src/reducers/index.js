import { combineReducers } from 'redux';
import {
  MESSAGES_RECEIVED,
  COMPOSE_FORM_TOGGLED,
  MESSAGE_CREATED,
  SELECT_ALL_TOGGLED,
  MARKED_AS_READ,
  MARKED_AS_UNREAD,
  LABEL_ADDED,
  LABEL_REMOVED,
  SELECT_MESSAGE_TOGGLED,
  MESSAGE_STAR_TOGGLED
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
        all: action.messages
      };
    case MARKED_AS_UNREAD:
      return {
        ...state,
        all: action.messages
      };
    case LABEL_ADDED:
      return {
        ...state,
        all: action.messages
      };
    case LABEL_REMOVED:
      return {
        ...state,
        all: action.messages
      };
    case SELECT_MESSAGE_TOGGLED:
      return {
        all: action.messages
      };
    case MESSAGE_STAR_TOGGLED:
      return {
        all: action.messages
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
