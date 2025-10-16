import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Link } from 'expo-router';
import { ButtonBase, BaseButtonProps, getButtonClasses } from './ButtonBase';

export type ButtonLinkProps = BaseButtonProps &
  TouchableOpacityProps & {
    href: string;
  };

export function ButtonLink({
  href,
  variant = 'primary',
  textColor = 'black',
  iconSrc,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link href={href} asChild>
      <TouchableOpacity
        className={getButtonClasses(variant, textColor, className)}
        activeOpacity={0.8}
        {...props}>
        <ButtonBase iconSrc={iconSrc}>{children}</ButtonBase>
      </TouchableOpacity>
    </Link>
  );
}
