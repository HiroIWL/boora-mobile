import { apiFetch } from './api'

export async function getRanking() {
  return apiFetch('/ranking', { method: 'GET' }, true)
}

export async function getRankingAlunos() {
  return apiFetch('/ranking/alunos', { method: 'GET' }, true)
}
