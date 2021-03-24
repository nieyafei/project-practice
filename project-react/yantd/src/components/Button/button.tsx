import React, { ButtonHTMLAttributes, AnchorHTMLAttributes, FC, ReactNode, useContext} from "react";
import classNames from "classnames";
import {Omit, tuple} from "../_util/type";
import { ConfigContext } from '../config-provider';
import { defaultGetPrefixCls } from "../config-provider/context";

export enum ButtonSize {
  Large = "lg",
  Small = "sm",
}

const ButtonTypes = tuple('default', 'primary', 'danger', 'dashed', 'link', 'text');
export type ButtonType = typeof ButtonTypes[number];

const ButtonShapes = tuple('circle', 'round');
export type ButtonShape = typeof ButtonShapes[number];

const ButtonHTMLTypes = tuple('submit', 'button', 'reset');
export type ButtonHTMLType = typeof ButtonHTMLTypes[number];

export interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: "lg" | "sm";
  type?: ButtonType;
  children: ReactNode;
  shape?: ButtonShape;
  onClick?: React.MouseEventHandler<HTMLElement>;
  prefixCls?: string;
}

export type AnchorButtonProps = {
  href: string;
  target?: string;
} & BaseButtonProps & Omit<AnchorHTMLAttributes<HTMLElement>, 'type' | 'onClick'>

export type NativeButtonProps = {
  htmlType?: ButtonHTMLType;
} & BaseButtonProps & Omit<ButtonHTMLAttributes<HTMLElement>, 'type' | 'onClick'>;

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;  // 改为可选

export const Button: FC<ButtonProps> = (props) => {
  const { type, className, disabled, size, href, children , htmlType, shape, prefixCls: customizePrefixCls,...restProps} = props;
  // const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = defaultGetPrefixCls('btn', customizePrefixCls);
  const classes = classNames(prefixCls, className , {
    [`${prefixCls}-${type}`]: type,
    [`${prefixCls}-${size}`]: size,
    [`${prefixCls}-${shape}`]: shape,
    disabled
  });

  if (type === "link" && href) {
    return (
      <a href={href} className={classes} {...restProps}>
        {children}
      </a>
    );
  }
  return <button type={htmlType} className={classes} disabled={disabled}  {...restProps}>{children}</button>;
};

Button.defaultProps = {
  disabled: false,
  type: "default",
  shape: "circle",
  htmlType: 'button'
}

export default Button;