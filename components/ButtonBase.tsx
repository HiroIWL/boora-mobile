import React from 'react';
import {
  Text,
  View,
  Image, ImageSourcePropType
} from 'react-native';

export type ButtonVariant = 'primary' | 'secondary' | 'info' | 'neutral' | 'white';
export type TextColor = 'black' | 'white';

export interface BaseButtonProps {
  variant?: ButtonVariant;
  textColor?: TextColor;
  iconSrc?: ImageSourcePropType;
  iconAlt?: string;
  className?: string;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-[#FF8C00] active:bg-[#cc7000]',
  secondary: 'bg-[#4CAF4F] active:bg-[#3A9C3D]',
  info: 'bg-[#0094FF] active:bg-[#0077cc]',
  neutral: 'bg-[#D9D9D9] active:bg-[#bfbfbf]',
  white: 'bg-[#FFFFFF] active:bg-gray-100',
};

const textColorClasses: Record<TextColor, string> = {
  black: 'text-black',
  white: 'text-white',
};

export function ButtonBase({
  children,
  iconSrc,
  textColor,
}: Pick<BaseButtonProps, 'children' | 'iconSrc' | 'textColor'>) {
  return (
    <View className="flex-row items-center justify-center gap-2">
      <Text className={textColorClasses[textColor]}>{children}</Text>
      {iconSrc && <Image source={iconSrc} className="h-5 w-5" />}
    </View>
  );
}

export function getButtonClasses(variant: ButtonVariant, textColor: TextColor, className?: string) {
  return [
    'rounded-md py-3 w-full flex-row items-center justify-center',
    variantClasses[variant],
    textColorClasses[textColor],
    className,
  ]
    .filter(Boolean)
    .join(' ');
}
