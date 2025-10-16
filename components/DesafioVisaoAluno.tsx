import React, { useEffect, useState } from 'react';
import { Container } from 'components/Container';
import { Typography } from 'components/Typography';
import { ButtonLink } from 'components/ButtonLink';
import { ProfilePicture } from 'components/ProfilePicture';
import { useUser } from 'context/UserContext';
import { getDesafios } from 'services/desafios';
import { getEntregas } from 'services/entregas';
import { getRankingAlunos } from 'services/ranking';
import { Dimensions } from 'react-native';

export function DesafioVisaoAluno() {
  const { user } = useUser();
  const [desafios, setDesafios] = useState([]);
  const [entregas, setEntregas] = useState([]);
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const [d, e, r] = await Promise.all([getDesafios(), getEntregas(), getRankingAlunos()]);
        setDesafios(d);
        setEntregas(e);
        setRanking(r);
      } catch {
        setError('Erro ao carregar dados.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading)
    return (
      <Container
        direction="column"
        align="center"
        padding="md"
        className="flex-1 py-10"
        justify="center"
        style={{
          minHeight: Dimensions.get('window').height - 80,
        }}
        fluid>
        <Typography variant="text">Carregando dados...</Typography>
      </Container>
    );

  if (error)
    return (
      <Container
        direction="column"
        align="center"
        gap={10}
        padding="md"
        className="flex-1 py-10"
        justify="center"
        style={{
          minHeight: Dimensions.get('window').height - 80,
        }}
        fluid>
        <Typography variant="text" className="text-red-500">
          {error}
        </Typography>
      </Container>
    );

  const entregues = entregas.map((e) => e.id_desafio);
  const proximoDesafio = desafios.find((d) => !entregues.includes(d.id));
  const posicao = ranking.findIndex((r) => r.id_aluno === user?.sub) + 1 || ranking.length;
  const posicaoLabel =
    posicao === 1
      ? '1º lugar'
      : posicao === 2
        ? '2º lugar'
        : posicao === 3
          ? '3º lugar'
          : `${posicao}º lugar`;
  const top3 = posicao <= 3;

  return (
    <Container
      padding="md"
      direction="column"
      align="center"
      style={{
        gap: 16,
      }}
      className="flex-1 py-10"
      fluid>
      <Container
        direction="column"
        align="center"
        style={{
          gap: 8,
        }}>
        <ProfilePicture />
        <Typography variant="text" weight="bold" color="black">
          {user?.nome} - {user?.turma?.nome}
        </Typography>
      </Container>

      <Container
        direction="column"
        style={{
          gap: 16,
        }}
        className="mt-12 w-full max-w-md">
        <Container
          bg="primary"
          justify="between"
          align="center"
          rounded
          padding="sm"
          className="w-full">
          <Typography variant="text" color="white" weight="semibold">
            Ranking da Turma
          </Typography>
          <Typography
            variant="text"
            color="white"
            weight="bold"
            className={top3 ? 'text-yellow-300' : ''}>
            {posicaoLabel}
          </Typography>
        </Container>

        <Container
          bg="white"
          justify="between"
          align="center"
          rounded
          padding="sm"
          className="w-full">
          <Typography variant="text" color="black" weight="semibold">
            Próximo Desafio
          </Typography>
          <Typography variant="text" color="white" className="rounded-md bg-[#FF8C00] px-3 py-1">
            {proximoDesafio ? proximoDesafio.nome : 'Todos completos'}
          </Typography>
        </Container>
      </Container>

      {proximoDesafio && (
        <ButtonLink
          href={`/desafios/${proximoDesafio.id}`}
          variant="primary"
          textColor="white"
          className="mt-8 w-full max-w-xs">
          Iniciar Desafio
        </ButtonLink>
      )}
    </Container>
  );
}
