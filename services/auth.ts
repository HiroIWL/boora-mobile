import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { apiFetch } from 'services/api';

export interface RegisterDto {
  nome: string;
  senha: string;
  tipo: 'ALUNO' | 'PROFESSOR';
  codigo_registro: string;
  id_turma?: string;
}

export interface LoginDto {
  registro_academico: string;
  senha: string;
}

export interface LoginResponse {
  access_token: string;
}

interface DecodedToken {
  sub: string;
  nome: string;
  registro_academico: string;
  role: 'ALUNO' | 'PROFESSOR';
  turma: { id: string; nome: string };
}

export async function registerUser(data: RegisterDto) {
  try {
    const response = await apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    throw new Error('Falha ao registrar usuário. Tente novamente.');
  }
}

export async function loginUser(data: LoginDto) {
  try {
    const { access_token } = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    await AsyncStorage.setItem('access_token', access_token);

    const decoded: DecodedToken = jwtDecode(access_token);
    await AsyncStorage.setItem('user', JSON.stringify(decoded));

    return decoded;
  } catch (error) {
    console.error('Erro no login:', error);
    throw new Error('Falha ao realizar login. Verifique suas credenciais.');
  }
}

export async function logoutUser() {
  try {
    await AsyncStorage.removeItem('access_token');
    await AsyncStorage.removeItem('user');
  } catch (error) {
    console.error('Erro ao sair da conta:', error);
    throw new Error('Falha ao encerrar sessão.');
  }
}

export async function getUser() {
  const raw = await AsyncStorage.getItem('user');
  return raw ? JSON.parse(raw) : null;
}

export async function refreshUser() {
  return getUser();
}
