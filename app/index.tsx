import React from 'react';
import { Dimensions, Image } from 'react-native';
import { Container } from 'components/Container';
import { Typography } from 'components/Typography';
import { ButtonLink } from 'components/ButtonLink';
import { useAssets } from 'expo-asset';
import { View } from 'react-native';

export default function Home() {
  const [assets, error] = useAssets([require('../assets/people.jpg')]);

  return (
    assets?.length && (
      <Container
        align="stretch"
        justify="center"
        direction="column"
        padding="md"
        bg="white"
        style={{
          overflow: 'hidden',
        }}
        className="flex-1">
        <Container
          direction="column"
          align="center"
          justify="center"
          gap={6}
          className="flex-1 px-8 text-center">
          <Typography variant="headline" color="primary" weight="bold">
            Boora !
          </Typography>

          <Typography variant="text" color="primary" className="max-w-[280px] text-center">
            Toda semana um novo desafio pra você se movimentar, acumular pontos e subir no ranking
            da turma!
          </Typography>

          <Container direction="column" gap={2} className="mt-4 w-64">
            <ButtonLink
              href="/select-user?criar=1"
              variant="info"
              textColor="white"
              className="rounded-xl">
              Criar conta
            </ButtonLink>

            <ButtonLink
              href="/select-user"
              variant="primary"
              textColor="white"
              className="rounded-xl">
              Já tenho conta
            </ButtonLink>
          </Container>

          <Image
            source={assets[0]}
            resizeMethod="resize"
            resizeMode="contain"
            style={{
              width: 1000,
              maxWidth: Dimensions.get('window').width - 20,
              height: 1000,
              maxHeight: 250,
            }}
          />
        </Container>
      </Container>
    )
  );
}
