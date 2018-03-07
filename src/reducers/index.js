import { combineReducers } from 'redux';
import { MESSAGES_RECEIVED, COMPOSE_FORM_TOGGLED } from '../actions';

function messages(state = { all: [] }, action) {
  switch (action.type) {
    case MESSAGES_RECEIVED:
      return {
        ...state,
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
      return false;
  }
}

export default combineReducers({
  messages,
  showComposeForm: compose
});
