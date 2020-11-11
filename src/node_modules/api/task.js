import { instance } from './instance';

export async function createTask(task) {
  const response = await instance.post('/task', { task });
  return response.data;
}

export async function deleteTask(uuid) {
  const response = await instance.delete(`/task/${uuid}`);
  return response.data;
}

export async function updateTask({ uuid, ...task }) {
  const response = await instance.put(`/task/${uuid}`, { task });
  return response.data;
}
