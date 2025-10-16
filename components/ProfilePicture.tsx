'use client';

import { useUser } from 'context/UserContext';
import { Container } from './Container';
import { Typography } from './Typography';
import { cn } from 'lib/utils';

export function ProfilePicture() {
  const { user } = useUser();
  if (!user) return null;

  const initials = user.nome
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n: string) => n[0])
    .join('')
    .toUpperCase();

  return (
    <Container
      align="center"
      justify="center"
      bg="white"
      style={{
        width: 100,
        height: 100,
      }}
      className={cn('h-[125px] w-[125px] rounded-full border-4 border-sky-500')}>
      <Typography
        variant="title"
        color="primary"
        weight="regular"
        className="flex w-[36px] items-center justify-center uppercase">
        {initials}
      </Typography>
    </Container>
  );
}
