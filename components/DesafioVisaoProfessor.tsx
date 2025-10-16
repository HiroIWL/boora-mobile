import React, { useEffect, useState } from 'react';
import { Container } from 'components/Container';
import { Typography } from 'components/Typography';
import { ButtonLink } from 'components/ButtonLink';
import { getDesafios } from 'services/desafios';
import { Dimensions } from 'react-native';

export function DesafioVisaoProfessor() {
  const [desafios, setDesafios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchDesafios() {
      try {
        const data = await getDesafios();
        setDesafios(data);
      } catch {
        setError('Erro ao carregar desafios.');
      } finally {
        setLoading(false);
      }
    }
    fetchDesafios();
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
        <Typography variant="text">Carregando desafios...</Typography>
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

  return (
    <Container
      direction="column"
      align="center"
      gap={10}
      padding="md"
      className="flex-1 py-10"
      fluid>
      <Typography variant="title" color="black" weight="bold">
        Gerenciar Desafios
      </Typography>

      <Container
        direction="column"
        style={{
          gap: 16,
        }}
        className="mt-16 w-full max-w-md">
        {desafios.map((desafio) => (
          <Container
            key={desafio.id}
            direction="row"
            justify="between"
            align="center"
            bg="secondary"
            rounded
            className="px-6 py-4 shadow-md">
            <Typography variant="text" color="white" weight="semibold">
              {desafio.nome}
            </Typography>
            <ButtonLink
              style={{
                width: 125,
              }}
              href={`/desafios/${desafio.id}/vincular`}
              variant="white"
              textColor="black"
              className="w-[125] rounded-md px-3 py-1">
              Atribuir Desafio
            </ButtonLink>
          </Container>
        ))}
      </Container>

      <ButtonLink
        href="/desafios/novo"
        variant="primary"
        textColor="white"
        className="mt-8 flex w-full max-w-xs items-center justify-center gap-2">
        Criar Novo Desafio +
      </ButtonLink>
    </Container>
  );
}
