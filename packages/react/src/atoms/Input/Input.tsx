import React, { ChangeEvent } from "react";

export interface InputProps {
  type?: "text" | "number" | "email" | "password";
  name?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;

  className?: string;
  style?: React.CSSProperties;
}

const Input: React.FC<InputProps> = ({ type = "text", ...props }) => {
  const className = `dse-input ${props.className ? props.className : ""}`;

  return <input className={className} type={type} {...props} />;
};

export default Input;
