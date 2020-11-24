import { writable } from 'svelte/store';
import * as api from 'Api/settings';

export const settings = writable({});

export function updateSettings(params) {
  settings.update((currentSettings) => ({ ...currentSettings, ...params }));
  return api.updateSettings(params);
}
