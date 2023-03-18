import {http} from '~/trans/trans'
import { useUserState } from "../data"

export const login = async ({ username, password }) => {
  return await http
    .post('/login', { username, password })
    .then(res=> res.data );
};

export const register = async ({ username, password }) => {
  return await http
    .post('/users', { username, password })
    .then(res => res.data);
};