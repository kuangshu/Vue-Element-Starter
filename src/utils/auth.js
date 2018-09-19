// import Cookies from 'js-cookie';
import config from '@/config/index';

const TokenKey = config.TOKEN_KEY;

export function getToken() {
  return sessionStorage.getItem(TokenKey);
}

export function setToken(token) {
  return sessionStorage.setItem(TokenKey, token);
}

export function removeToken() {
  return sessionStorage.removeItem(TokenKey);
}
