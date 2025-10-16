import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { BaseButtonProps, ButtonBase, getButtonClasses } from './ButtonBase';

export type ButtonProps = BaseButtonProps & TouchableOpacityProps;

export function Button({
  variant = 'primary',
  textColor = 'black',
  iconSrc,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity className={getButtonClasses(variant, textColor, className)} {...props}>
      <ButtonBase textColor={textColor} iconSrc={iconSrc}>
        {children}
      </ButtonBase>
    </TouchableOpacity>
  );
}
