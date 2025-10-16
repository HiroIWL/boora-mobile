import React from 'react';
import { View, ViewProps } from 'react-native';

type Direction = 'row' | 'column';
type Align = 'start' | 'center' | 'end' | 'stretch';
type Justify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
type Padding = 'none' | 'sm' | 'md' | 'lg';

interface FormContainerProps extends ViewProps {
  direction?: Direction;
  align?: Align;
  justify?: Justify;
  gap?: number | string;
  padding?: Padding;
  shadow?: boolean;
  rounded?: boolean;
  className?: string;
  children: React.ReactNode;
}

const alignClasses: Record<Align, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
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
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-10',
};

export function FormContainer({
  direction = 'column',
  align = 'stretch',
  justify = 'start',
  gap = 0,
  padding = 'none',
  shadow = false,
  rounded = false,
  className = '',
  children,
  ...props
}: FormContainerProps) {
  const gapClass = typeof gap === 'number' ? `gap-${gap}` : gap;

  return (
    <View
      className={[
        'flex w-full',
        direction === 'row' ? 'flex-row' : 'flex-col',
        alignClasses[align],
        justifyClasses[justify],
        paddingClasses[padding],
        rounded ? 'rounded-lg' : '',
        shadow ? 'shadow-md' : '',
        gapClass,
        className,
      ].join(' ')}
      {...props}>
      {children}
    </View>
  );
}
