import { useUserType } from 'context/UserTypeContext';
import React from 'react';
import { View, ViewProps } from 'react-native';
// import { useUserType } from '@/context/UserTypeContext';

type ContainerBg = 'primary' | 'secondary' | 'white' | 'transparent';
type Direction = 'row' | 'column';
type Align = 'start' | 'center' | 'end' | 'stretch' | 'none';
type Justify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
type Padding = 'none' | 'xs' | 'sm' | 'md' | 'lg';

interface ContainerProps extends ViewProps {
  bg?: ContainerBg;
  direction?: Direction;
  gap?: number | string;
  align?: Align;
  justify?: Justify;
  wrap?: boolean;
  rounded?: boolean;
  shadow?: boolean;
  padding?: Padding;
  fluid?: boolean;
  className?: string;
  children: React.ReactNode;
}

const bgClasses: Record<ContainerBg, string> = {
  primary: 'bg-[#FF8C00]',
  secondary: 'bg-[#4CAF4F]',
  white: 'bg-white',
  transparent: 'bg-transparent',
};

const alignClasses: Record<Align, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  none: '',
};

const justifyClasses: Record<Justify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

const paddingClasses: Record<Padding, string> = {
  none: 'p-0',
  xs: 'p-2',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-10',
};

export function Container({
  bg = 'transparent',
  direction = 'row',
  gap = 0,
  align = 'start',
  justify = 'start',
  wrap = false,
  rounded = false,
  shadow = false,
  padding = 'none',
  fluid = false,
  className = '',
  children,
  ...props
}: ContainerProps) {
  const { userType } = useUserType();

  let bgClassesByUser = bgClasses;

  if (userType === 'ALUNO') {
    bgClassesByUser = {
      ...bgClassesByUser,
      primary: bgClasses.secondary,
      secondary: bgClasses.primary,
    };
  }

  const gapClass = `gap-[${gap}]`;

  return (
    <View
      className={[
        'flex',
        direction === 'row' ? 'flex-row' : 'flex-col',
        alignClasses[align],
        justifyClasses[justify],
        bgClassesByUser[bg],
        paddingClasses[padding],
        rounded ? 'rounded-lg' : '',
        shadow ? 'z-[1000] shadow-sm shadow-black/10' : '',
        wrap ? 'flex-wrap' : '',
        fluid ? 'w-full' : 'w-full max-w-screen-xl self-center',
        `gap-${gap}`,
        className,
      ].join(' ')}
      {...props}>
      {children}
    </View>
  );
}
