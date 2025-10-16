import React, { useEffect } from 'react';
import { Container } from 'components/Container';
import { Typography } from 'components/Typography';
import { useUser } from 'context/UserContext';
import { TouchableOpacity, Text } from 'react-native';
import { router, usePathname } from 'expo-router';
import { logoutUser } from 'services/auth';

let baseMenuItems = [
  { icon: '', label: 'Desafios', href: '/desafios' },
  { icon: '', label: 'Ranking', href: '/ranking' },
  { icon: '', label: 'Deslogar', href: '/' },
];

export function Sidebar() {
  const { user } = useUser();
  const pathname = usePathname();

  useEffect(() => {}, [user]);

  let menuItems = [...baseMenuItems];

  if (user?.role === 'PROFESSOR') {
    menuItems = [
      { icon: '', label: 'Gerenciar', href: '/desafios' },
      { icon: '', label: 'Entregas', href: '/entregas' },
      { icon: '', label: 'Ranking', href: '/ranking' },
      { icon: '', label: 'Deslogar', href: '/' },
    ];
  }

  return (
    <Container
      direction="row"
      justify="between"
      align="center"
      bg="primary"
      padding="sm"
      className="h-20 w-full">
      {menuItems.map((item) => {
        const isActive = pathname.startsWith(item.href) && item.href !== '/';
        const handlePress = () => {
          if (item.label === 'Deslogar') {
            logoutUser();
          }
          router.push(item.href);
        };
        return (
          <TouchableOpacity
            key={item.href}
            onPress={() => handlePress()}
            className="flex flex-1 items-center justify-center">
            <Text>{item.icon}</Text>
            <Typography
              variant="text"
              color="white"
              weight={isActive ? 'bold' : 'regular'}
              className={isActive ? 'opacity-100' : 'opacity-70'}>
              {item.label}
            </Typography>
          </TouchableOpacity>
        );
      })}
    </Container>
  );
}
