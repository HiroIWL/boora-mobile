import React, { useId } from 'react';
import { TextInput } from 'react-native';
import { Container } from './Container';
import { Typography } from './Typography';

interface FormInputProps {
  label: string;
  error?: string;
  maxLength?: number;
  type?: 'text' | 'password' | 'email' | 'number';
  className?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
}

export function FormInput({
  label,
  type = 'text',
  error,
  className = '',
  maxLength,
  value,
  onChangeText,
  placeholder,
}: FormInputProps) {
  const generatedId = useId();

  const isPassword = type === 'password';
  const keyboardType =
    type === 'email' ? 'email-address' : type === 'number' ? 'numeric' : 'default';

  return (
    <Container direction="column" gap={2} className="w-full">
      <Typography variant="label" color="black" weight="semibold">
        {label}
      </Typography>

      <TextInput
        id={generatedId}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        maxLength={maxLength}
        secureTextEntry={isPassword}
        keyboardType={keyboardType}
        className={[
          'w-full rounded-md px-4 py-3 text-gray-900 placeholder-gray-400',
          'border focus:ring-2 focus:ring-[#FF8C00]',
          error ? 'border-red-500 focus:ring-red-400' : 'border-gray-300',
          className,
        ].join(' ')}
      />

      {error && (
        <Typography
          variant="caption"
          color="primary"
          weight="regular"
          className="mt-1 text-red-500">
          {error}
        </Typography>
      )}
    </Container>
  );
}
