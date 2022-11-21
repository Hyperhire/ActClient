export const USER_INFO = 'user-info';
export const STORAGE_SESSION = 'connector-session';

export const getItem = session => {
  return JSON.parse(sessionStorage.getItem(session));
};

export const setItem = (session, item) => {
  return window.sessionStorage.setItem(session, JSON.stringify(item));
};

export const removeItem = session => {
  return window.sessionStorage.removeItem(session);
};

export const addItem = (session, item) => {
  const connectorID = JSON.parse(sessionStorage.getItem(session));
  const newItem = { ...connectorID, ...item };
  return window.sessionStorage.setItem(session, JSON.stringify(newItem));
};
