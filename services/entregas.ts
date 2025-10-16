import { apiFetch } from './api';

export async function getEntregas() {
  return apiFetch('/entregas', { method: 'GET' }, true);
}

export async function getEntregaById(id: string) {
  return apiFetch(`/entregas/${id}`, { method: 'GET' }, true);
}

export async function criarEntrega(body: any) {
  return apiFetch('/entregas', { method: 'POST', body: JSON.stringify(body) }, true);
}

export async function avaliarEntrega(id: string, body: any) {
  return apiFetch(
    `/entregas/${id}/avaliar`,
    {
      method: 'PUT',
      body: JSON.stringify(body),
    },
    true
  );
}
