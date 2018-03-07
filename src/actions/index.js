export const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED';
export const COMPOSE_FORM_TOGGLED = 'COMPOSE_FORM_TOGGLED';

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

export function toggleComposeForm() {
  return { type: COMPOSE_FORM_TOGGLED }
}
