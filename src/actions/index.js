export const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED';
export const COMPOSE_FORM_TOGGLED = 'COMPOSE_FORM_TOGGLED';
export const MESSAGE_CREATED = 'MESSAGE_CREATED';
export const SELECT_ALL_TOGGLED = 'SELECT_ALL_TOGGLED';
export const MARKED_AS_READ = 'MARKED_AS_READ';
export const MARKED_AS_UNREAD = 'MARKED_AS_UNREAD';

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

export function markAsRead(prevSelectedMessages) {
  const selectedMessages = prevSelectedMessages.slice();
  selectedMessages.map(message => (message.read = true));
  const request = {
    messageIds: selectedMessages.map(message => message.id),
    command: 'read',
    read: true
  };
  return async dispatch => {
    await fetch(`/api/messages`, {
      method: 'PATCH',
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });
    return dispatch({ type: MARKED_AS_READ, selectedMessages });
  };
}

export function markAsUnread(prevSelectedMessages) {
  const selectedMessages = prevSelectedMessages.slice();
  selectedMessages.map(message => (message.read = false));
  const request = {
    messageIds: selectedMessages.map(message => message.id),
    command: 'read',
    read: false
  };
  return async dispatch => {
    await fetch(`/api/messages`, {
      method: 'PATCH',
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });
    return dispatch({ type: MARKED_AS_UNREAD, selectedMessages });
  };
}

export function toggleComposeForm() {
  return { type: COMPOSE_FORM_TOGGLED };
}
