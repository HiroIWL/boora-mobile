import React from 'react';
import { Slot, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import '../global.css';
import { AuthenticatedProvider } from 'context/AuthenticatedContext';
import { UserTypeProvider, useUserType } from 'context/UserTypeContext';
import { UserProvider } from 'context/UserContext';
import { SafeAreaFrameContext, SafeAreaView } from 'react-native-safe-area-context';

export default function Layout() {
  return (
    <AuthenticatedProvider>
      <UserTypeProvider>
        <UserProvider>
          <Gambiarrinha />
        </UserProvider>
      </UserTypeProvider>
    </AuthenticatedProvider>
  );
}

function Gambiarrinha() {
  const { userType } = useUserType();
  return (
    <SafeAreaView
      className="flex-1"
      style={{
        backgroundColor: userType === 'PROFESSOR' ? '#FF8C00' : '#4CAF4F',
      }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
