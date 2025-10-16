import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView } from 'react-native';
import { Container } from 'components/Container';
import { Typography } from 'components/Typography';
import { getRanking } from 'services/ranking';

interface TurmaRanking {
  id_turma: string;
  nome_turma: string;
  media_desempenho: number;
}

export default function RankingPage() {
  const [ranking, setRanking] = useState<TurmaRanking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchRanking() {
      try {
        const data = await getRanking();
        setRanking(data);
      } catch (err) {
        setError('Erro ao carregar ranking.');
      } finally {
        setLoading(false);
      }
    }
    fetchRanking();
  }, []);

  if (loading)
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
        <Typography variant="text" color="black">
          Carregando ranking...
        </Typography>
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
        <Typography variant="text" color="black" className="text-red-500">
          {error}
        </Typography>
      </Container>
    );

  if (!ranking.length)
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
        <Typography variant="text" color="black">
          Nenhum dado encontrado.
        </Typography>
      </Container>
    );

  return (
    <Container
      direction="column"
      align="center"
      gap={6}
      padding="lg"
      className="flex-1 py-12"
      style={{
        minHeight: Dimensions.get('window').height - 80,
      }}
      fluid>
      <Typography variant="title" color="black" weight="bold">
        Ranking das Turmas
      </Typography>

      <ScrollView
        className="w-full max-w-md flex-1"
        style={{
          minHeight: Dimensions.get('window').height - 165,
        }}
        contentContainerStyle={{ gap: 10, paddingVertical: 10 }}
        showsVerticalScrollIndicator={false}>
        {ranking.map((turma, index) => {
          const posicao = index + 1;
          const isTop3 = posicao <= 3;
          const bgClasse = isTop3 ? 'bg-yellow-400' : 'bg-[#6DB66E]';
          const textColor = isTop3 ? 'text-[#FF0000]' : 'text-white';
          const media = turma.media_desempenho?.toFixed(2) ?? '0.00';

          return (
            <Container
              key={turma.id_turma}
              direction="row"
              justify="between"
              align="center"
              rounded
              padding="sm"
              style={{
                backgroundColor: isTop3 ? '#EFBF04' : '#6DB66E',
              }}
              className={`w-full rounded-full px-6 py-4`}>
              <Typography
                className="w-full flex-1"
                variant={isTop3 ? 'subtitle' : 'text'}
                color="white"
                weight="semibold">
                {turma.nome_turma}
              </Typography>

              <Typography
                variant={isTop3 ? 'subtitle' : 'text'}
                color="white"
                weight="semibold"
                className={textColor}>
                {posicao}º
              </Typography>
            </Container>
          );
        })}
      </ScrollView>
    </Container>
  );
}
