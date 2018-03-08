export const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED';
export const COMPOSE_FORM_TOGGLED = 'COMPOSE_FORM_TOGGLED';
export const MESSAGE_CREATED = 'MESSAGE_CREATED';
export const SELECT_ALL_TOGGLED = 'SELECT_ALL_TOGGLED';

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

export function toggleSelectAll(prevMessages) {
  const messages = prevMessages.slice();
  const selectedMessages = messages.filter(
    message => message.selected === true
  );
  let selected;
  selectedMessages.length === prevMessages.length
    ? (selected = false)
    : (selected = true);
  messages.map(message => {
    message.selected = selected;
    return message;
  });
  return { type: SELECT_ALL_TOGGLED, messages };
}

export function toggleComposeForm() {
  return { type: COMPOSE_FORM_TOGGLED };
}
