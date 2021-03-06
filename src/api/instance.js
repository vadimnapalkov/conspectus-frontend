import axios from 'axios';

import { backDomain } from '../../config/config';

export const instance = axios.create({
  baseURL: `${backDomain}/api`,
  withCredentials: true,
  timeout: 5000,
  headers: { 'X-Custom-Header': 'conspectus_front' },
});
