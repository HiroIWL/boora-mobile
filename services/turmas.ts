import { apiFetch } from './api';

export async function getTurmas() {
  return apiFetch('/turmas');
}
