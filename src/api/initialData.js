import { instance } from './instance';

export async function getInitialData() {
  const response = await instance.get('/initial_data');
  return response.data;
}
