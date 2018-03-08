export const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED';
export const COMPOSE_FORM_TOGGLED = 'COMPOSE_FORM_TOGGLED';
export const MESSAGE_CREATED = 'MESSAGE_CREATED';

export function fetchMessages() {
  return async dispatch => {
    const response = await fetch(`/api/messages`);
    const json = await response.json();
    dispatch({
      type: MESSAGES_RECEIVED,
      messages: json._embedded.messages
    });
  };
}

export function createMessage(message) {
  return async dispatch => {
    const response = await fetch(`api/messages`, {
      method: 'POST',
      body: JSON.stringify(message),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });
    const json = await response.json();
    return dispatch({
      type: MESSAGE_CREATED,
      message: json
    });
  };
}

export function toggleComposeForm() {
  return { type: COMPOSE_FORM_TOGGLED };
}
