import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { Container } from 'components/Container';
import { FormContainer } from 'components/FormContainer';
import { FormInput } from 'components/FormInput';
import { Typography } from 'components/Typography';
import { Button } from 'components/Button';
import { FormSelect } from 'components/FormSelect';
import { Header } from 'components/Header';
import { useUserType } from 'context/UserTypeContext';
import { getTurmas } from 'services/turmas';
import { registerUser } from 'services/auth';

export default function CadastroAluno() {
  const { userType, setUserType } = useUserType();
  const [turmas, setTurmas] = useState([]);
  const [idTurma, setIdTurma] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nome: '',
    codigo_registro: '',
    senha: '',
  });
  const router = useRouter();

  useEffect(() => {
    async function fetchTurmas() {
      try {
        const data = await getTurmas();
        setTurmas(data);
      } catch {
        setError('Erro ao carregar turmas.');
      }
    }

    fetchTurmas();

    if (!userType) setUserType('ALUNO');
  }, []);

  async function handleSubmit() {
    try {
      setLoading(true);
      setError('');

      if (!form.nome || !form.codigo_registro || !form.senha) {
        setError('Preencha todos os campos obrigatórios.');
        return;
      }

      const payload: any = {
        nome: form.nome,
        senha: form.senha,
        tipo: userType ?? 'ALUNO',
        codigo_registro: form.codigo_registro,
      };

      if (userType === 'ALUNO' && idTurma) payload.id_turma = idTurma;

      await registerUser(payload);

      router.replace('/login');
    } catch {
      setError('Erro ao cadastrar aluno.');
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

      <Container className="w-full max-w-md self-center" direction="column" align="center" gap={6}>
        <Typography className="mb-12" variant="subtitle" color="black" weight="bold">
          Cadastrar Aluno
        </Typography>

        <FormContainer
          direction="column"
          style={{
            gap: 16,
          }}>
          <FormInput
            label="Nome do Aluno"
            placeholder="Digite o nome do aluno"
            value={form.nome}
            onChangeText={(text) => setForm({ ...form, nome: text })}
          />

          <FormInput
            label="Matrícula"
            placeholder="Digite a matrícula do aluno"
            maxLength={6}
            value={form.codigo_registro}
            onChangeText={(text) => setForm({ ...form, codigo_registro: text })}
          />

          <FormInput
            label="Senha"
            type="password"
            placeholder="Digite uma senha"
            value={form.senha}
            onChangeText={(text) => setForm({ ...form, senha: text })}
          />

          {turmas.length > 0 && userType === 'ALUNO' && (
            <FormSelect
              label="Turma"
              required
              options={turmas.map((t) => ({
                label: t.nome,
                value: t.id,
              }))}
              onChange={(value) => typeof value === 'string' && setIdTurma(value)}
            />
          )}

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
            {loading ? 'Salvando...' : 'Salvar'}
          </Button>
        </FormContainer>
      </Container>
    </Container>
  );
}
