import { apiFetch } from './api';

export async function getDesafios() {
  return apiFetch('/desafios', { method: 'GET' }, true);
}

export async function getDesafioById(id: string) {
  return apiFetch(`/desafios/${id}`, { method: 'GET' }, true);
}

export async function criarDesafio(body: any) {
  return apiFetch('/desafios', { method: 'POST', body: JSON.stringify(body) }, true);
}

export async function vincularDesafio(id: string, body: any) {
  return apiFetch(
    `/desafios/${id}/turmas`,
    {
      method: 'POST',
      body: JSON.stringify(body),
    },
    true
  );
}
