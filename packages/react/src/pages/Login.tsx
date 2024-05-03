import React, { FC } from "react";
import Template from "../templates/Template";
import LoginForm from "../organisms/LoginForm/LoginForm";

const LoginPage: FC = () => {
  return (
    <Template>
      <div className='login-page'>
        <LoginForm />
      </div>
    </Template>
  );
};

export default LoginPage;
