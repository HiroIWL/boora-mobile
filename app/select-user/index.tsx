import React from 'react';
import { Container } from 'components/Container';
import { Typography } from 'components/Typography';
import { Button } from 'components/Button';
import { useUserType } from 'context/UserTypeContext';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function SelectUser() {
  const { setUserType } = useUserType();
  const router = useRouter();
  const params = useLocalSearchParams();

  const isCriar = params.criar === '1';

  function handleSelect(type: 'ALUNO' | 'PROFESSOR') {
    setUserType(type);
    router.push(isCriar ? '/register' : '/login');
  }

  return (
    <Container
      direction="column"
      align="center"
      justify="center"
      className="flex-1 gap-10"
      padding="sm"
      style={{
        backgroundColor: '#6DB66E',
        display: 'flex',
        gap: 12,
      }}
      fluid>
      <Typography variant="headline" color="primary" weight="bold">
        Boora !
      </Typography>

      <Typography variant="subtitle" color="white" weight="bold">
        Você é:
      </Typography>

      <Container
        style={{
          backgroundColor: '#6DB66E',
          display: 'flex',
          gap: 16,
        }}
        direction="column"
        gap={4}
        className="w-64">
        <Button variant="primary" textColor="white" onPress={() => handleSelect('ALUNO')}>
          Aluno
        </Button>

        <Button variant="primary" textColor="white" onPress={() => handleSelect('PROFESSOR')}>
          Professor
        </Button>
      </Container>
    </Container>
  );
}
