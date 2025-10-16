import React from 'react';
import { Text, TextProps } from 'react-native';

type TextVariant = 'headline' | 'title' | 'subtitle' | 'text' | 'caption' | 'label';

type TextColor = 'primary' | 'black' | 'white';
type TextWeight = 'light' | 'regular' | 'semibold' | 'bold';

interface TypographyProps extends TextProps {
  variant?: TextVariant;
  color?: TextColor;
  weight?: TextWeight;
  className?: string;
  children: React.ReactNode;
}

const variantClasses: Record<TextVariant, string> = {
  headline: 'text-4xl',
  title: 'text-3xl',
  subtitle: 'text-xl',
  text: 'text-base',
  caption: 'text-sm',
  label: 'text-sm tracking-wide',
};

const colorClasses: Record<TextColor, string> = {
  primary: 'text-[#FF8C00]',
  black: 'text-black',
  white: 'text-white',
};

const weightClasses: Record<TextWeight, string> = {
  light: 'font-light',
  regular: 'font-normal',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

export function Typography({
  variant = 'text',
  color = 'black',
  weight = 'regular',
  className = '',
  children,
  ...props
}: TypographyProps) {
  return (
    <Text
      className={[
        variantClasses[variant],
        weightClasses[weight],
        colorClasses[color],
        'align-middle',
        className,
      ].join(' ')}
      {...props}>
      {children}
    </Text>
  );
}
