import React from 'react';
import { Modal as RNModal, Pressable, View } from 'react-native';
import { Container } from './Container';
import { cn } from 'lib/utils';

interface ModalProps {
  open?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ open = true, onClose, children, className }: ModalProps) {
  if (!open) return null;

  return (
    <RNModal transparent animationType="fade" visible={open} onRequestClose={onClose}>
      <Pressable
        onPress={onClose}
        className="flex-1 items-center justify-center bg-black/50 backdrop-blur-sm">
        <Pressable onPress={(e) => e.stopPropagation()} className="w-full max-w-md">
          <Container
            direction="column"
            bg="white"
            padding="md"
            gap={4}
            className={cn('w-full rounded-2xl shadow-lg', className)}>
            {children}
          </Container>
        </Pressable>
      </Pressable>
    </RNModal>
  );
}
