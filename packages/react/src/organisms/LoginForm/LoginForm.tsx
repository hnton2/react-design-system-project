import React, { FC } from "react";
import Text from "../../atoms/Text";
import Button from "../../atoms/Button";
import FormInput from "../../molecules/FormInput";

const LoginForm: FC = () => {
  return (
    <div>
      <Text>Login</Text>
      <form className='login-form'>
        <FormInput name='username' value='' label='Username' />
        <FormInput name='password' value='' label='Password' type='password' />
        <div className='button-group'>
          <Button type='submit'>Submit</Button>
          <Button type='reset'>Reset</Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
