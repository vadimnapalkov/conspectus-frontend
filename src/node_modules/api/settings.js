import { instance } from './instance';

export async function updateSettings(params) {
  const response = await instance.put("/settings", { settings: params });
  return response.data;
}

export async function completeMeeting() {
  const response = await instance.post("/settings/complete_meeting");
  return response.data;
}
