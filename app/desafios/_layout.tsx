import React from 'react';
import { Container } from 'components/Container';
import { Sidebar } from 'components/Sidebar';
import { Slot, Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Container direction="column" bg="transparent" className="flex-1" fluid>
      <Container className="flex-1">
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </Container>
      <Sidebar />
    </Container>
  );
}
