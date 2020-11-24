import { instance } from './instance';

export async function signIn(data) {
  const response = await instance.post('/user/signin', data);
  return response.data;
}

export async function authUser() {
  const response = await instance.get('/user/auth');
  return response.data;
}

export async function logoutUser() {
  const response = await instance.post('/user/logout');
  return response.data;
}
