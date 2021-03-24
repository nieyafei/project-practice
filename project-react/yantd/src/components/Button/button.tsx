import React, { ButtonHTMLAttributes, AnchorHTMLAttributes, FC, ReactNode} from "react";
import classNames from "classnames";
import {Omit} from "../_util/type";

export enum ButtonSize {
  Large = "lg",
  Small = "sm",
}

export enum ButtonType {
  Primary = "primary",
  Default = "default",
  Dashed = "dashed",
  Danger = "danger",
  Link = "link",
}

export interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: "lg" | "sm";
  type?: "primary" | "default" | "dashed" | "danger" | "link";
  children: ReactNode;
  href?: string;
  htmlType?: "button" | "submit" | "reset";
  shape?: 'circle' | 'round';
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export type AnchorButtonProps = {
  href: string;
  target?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps & Omit<AnchorHTMLAttributes<HTMLElement>, 'type' | 'onClick'>

export type NativeButtonProps = {
  htmlType?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps & Omit<ButtonHTMLAttributes<any>, 'type' | 'onClick'>;

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;  // 改为可选

export const Button: FC<ButtonProps> = (props) => {
  const { type, className, disabled, size, href, children , htmlType, shape, ...restProps} = props;
  const classes = classNames("btn", className , {
    [`btn-${type}`]: type,
    [`btn-${size}`]: size,
    [`btn-${shape}`]: shape,
    disabled: type === ButtonType.Link && disabled,
  });

  if (type === ButtonType.Link && href) {
    return (
      <a href={href} className={classes} {...restProps}>
        {children}
      </a>
    );
  } else {
    return <button type={htmlType} className={classes} disabled={disabled}  {...restProps}>{children}</button>;
  }
};

Button.defaultProps = {
  disabled: false,
  type: "default",
  shape: "circle",
  htmlType: 'button'
}

export default Button;