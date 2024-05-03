import React, { MouseEvent } from "react";

export interface ButtonProps {
  type: "submit" | "reset" | "button" | undefined;
  disabled?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;

  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ ...props }) => {
  const className = `dse-button ${props.className ? props.className : ""}`;

  return <Button className={className} {...props}></Button>;
};

export default Button;
