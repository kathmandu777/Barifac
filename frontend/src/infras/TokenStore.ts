import { Session } from 'domains';

const BARIFAC_USER_ACCESS_TOKEN = 'barifac_user_access_token';

export function setStoreToken(session: Session) {
  return localStorage.setItem(
    BARIFAC_USER_ACCESS_TOKEN,
    JSON.stringify(session),
  );
}

export function getStoreToken() {
  return localStorage.getItem(BARIFAC_USER_ACCESS_TOKEN);
}

export function removeStoreToken() {
  return localStorage.removeItem(BARIFAC_USER_ACCESS_TOKEN);
}
