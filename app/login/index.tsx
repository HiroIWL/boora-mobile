import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { Container } from 'components/Container';
import { Typography } from 'components/Typography';
import { Header } from 'components/Header';
import { FormContainer } from 'components/FormContainer';
import { FormInput } from 'components/FormInput';
import { Button } from 'components/Button';
import { useUserType } from 'context/UserTypeContext';
import { useAuthenticated } from 'context/AuthenticatedContext';
import { loginUser } from 'services/auth';
import { useUser } from 'context/UserContext';

export default function Login() {
  const router = useRouter();
  const { userType, setUserType } = useUserType();
  const { refreshUser } = useUser();
  const { setIsAuthenticated } = useAuthenticated();

  const [form, setForm] = useState({
    registro_academico: '',
    senha: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userType) router.replace('/select-user');
  }, []);

  async function handleSubmit() {
    try {
      setLoading(true);
      setError('');

      if (!form.registro_academico || !form.senha) {
        setError('Preencha todos os campos.');
        return;
      }

      const seila = await loginUser({
        registro_academico: form.registro_academico,
        senha: form.senha,
      });

      console.log(seila.role);
      setUserType(seila.role);
      setIsAuthenticated(true);
      refreshUser();
      router.replace('/desafios');
    } catch {
      setError('Credenciais inválidas. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container direction="column" bg="white" padding="md" className="flex-1" fluid>
      <Container
        direction="column"
        style={{
          marginBottom: 128,
        }}>
        <Header />
      </Container>

      <Container className="w-full max-w-md" direction="column" align="center">
        <Typography variant="subtitle" weight="bold" color="black" className="mb-12">
          Entrar
        </Typography>

        <FormContainer
          direction="column"
          style={{
            gap: 16,
          }}>
          <FormInput
            label="Registro Acadêmico"
            placeholder="Digite seu RA"
            maxLength={6}
            value={form.registro_academico}
            onChangeText={(text) => setForm({ ...form, registro_academico: text })}
          />

          <FormInput
            label="Senha"
            type="password"
            placeholder="Digite sua senha"
            value={form.senha}
            onChangeText={(text) => setForm({ ...form, senha: text })}
          />

          {error && (
            <Typography variant="caption" color="primary" className="text-red-500">
              {error}
            </Typography>
          )}

          <Button
            variant="primary"
            textColor="white"
            className="mt-4"
            onPress={handleSubmit}
            disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </FormContainer>

        <Typography
          variant="caption"
          color="primary"
          className="mt-4 text-blue-600"
          onPress={() => router.push('/register')}>
          Não tem conta? Criar agora
        </Typography>
      </Container>
    </Container>
  );
}
