export const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED';
export const COMPOSE_FORM_TOGGLED = 'COMPOSE_FORM_TOGGLED';
export const MESSAGE_CREATED = 'MESSAGE_CREATED';
export const SELECT_ALL_TOGGLED = 'SELECT_ALL_TOGGLED';
export const MARKED_AS_READ = 'MARKED_AS_READ';
export const MARKED_AS_UNREAD = 'MARKED_AS_UNREAD';
export const LABEL_ADDED = 'LABEL_ADDED';
export const LABEL_REMOVED = 'LABEL_REMOVED';
export const SELECT_MESSAGE_TOGGLED = 'SELECT_MESSAGE_TOGGLED';
export const MESSAGE_STAR_TOGGLED = 'MESSAGE_STAR_TOGGLED';
export const MESSAGE_DELETED = 'MESSAGE_DELETED';

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

export function markAsRead(prevMessages) {
  const messages = prevMessages.slice();
  const selectedMessages = messages.filter(
    message => message.selected === true
  );
  messages.map(message => {
    if (message.selected === true) message.read = true;
    return message;
  });
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
    return dispatch({ type: MARKED_AS_READ, messages });
  };
}

export function markAsUnread(prevMessages) {
  const messages = prevMessages.slice();
  const selectedMessages = messages.filter(
    message => message.selected === true
  );
  messages.map(message => {
    if (message.selected === true) message.read = false;
    return message;
  });
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
    return dispatch({ type: MARKED_AS_UNREAD, messages });
  };
}

export function addLabel(prevMessages, label) {
  const messages = prevMessages.slice();
  const selectedMessages = messages.filter(
    message => message.selected === true
  );
  messages.map(message => {
    if (message.selected === true) {
      return message.labels.includes(`${label}`)
        ? message.labels
        : message.labels.push(`${label}`);
    }
    return message;
  });
  const request = {
    messageIds: selectedMessages.map(message => message.id),
    command: 'addLabel',
    label: `${label}`
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
    return dispatch({ type: LABEL_ADDED, messages });
  };
}

export function removeLabel(prevMessages, label) {
  const messages = prevMessages.slice();
  const selectedMessages = messages.filter(
    message => message.selected === true
  );
  messages.map(message => {
    if (message.selected === true) {
      const index = message.labels.indexOf(`${label}`);
      return message.labels.includes(`${label}`)
        ? message.labels.splice(index, 1)
        : message.labels;
    }
    return message;
  });
  const request = {
    messageIds: selectedMessages.map(message => message.id),
    command: 'removeLabel',
    label: `${label}`
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
    return dispatch({ type: LABEL_REMOVED, messages });
  };
}

export function toggleSelectMessage(prevMessages, toggledMessage) {
  const messages = prevMessages.slice();
  const index = messages.findIndex(message => message.id === toggledMessage.id);
  messages[index] = toggledMessage;
  return { type: SELECT_MESSAGE_TOGGLED, messages };
}

export function toggleMessageStar(prevMessages, toggledMessage, request) {
  const messages = prevMessages.slice();
  const index = messages.findIndex(message => message.id === toggledMessage.id);
  messages[index] = toggledMessage;
  return async dispatch => {
    await fetch(`/api/messages`, {
      method: 'PATCH',
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });
    return dispatch({ type: MESSAGE_STAR_TOGGLED, messages });
  };
}

export function trashMessage(prevMessages) {
  const messages = prevMessages.slice();
  const selectedMessages = messages.filter(
    message => message.selected === true
  );
  const remainingMessages = messages.filter(
    message => message.selected !== true
  );
  const request = {
    messageIds: selectedMessages.map(message => message.id),
    command: 'delete'
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
    return dispatch({ type: MESSAGE_DELETED, remainingMessages });
  };
}

export function toggleComposeForm() {
  return { type: COMPOSE_FORM_TOGGLED };
}
