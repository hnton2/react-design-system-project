import React, { FC } from "react";
import Input from "../../atoms/Input";

interface FormInputProps {
  name: string;
  value: string;
  type?: "text" | "number" | "email" | "password";
  label: string;
}

const FormInput: FC<FormInputProps> = ({ label, name, value, type = "text" }) => {
  return (
    <div className='form-group'>
      <label htmlFor={name}>{label}</label>
      <Input name={name} value={value} type={type} />
      <input type='text' id='username' name={name} />
    </div>
  );
};

export default FormInput;
