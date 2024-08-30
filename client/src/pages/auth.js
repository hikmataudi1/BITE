import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import {useSnackbar} from "notistack"




const Auth = () => {
  return (
    <div className='auth'>
      <Login />
      <Register />
    </div>
  );
};

export default Auth;

const Login = () => {
  const [_ , setCookies] = useCookies(['access_token']);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {enqueueSnackbar}=useSnackbar()

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://bite-wcsg.onrender.com/auth/login', { username, password });

      setCookies('access_token', response.data.token);
      window.localStorage.setItem('userID', response.data.userID);
      navigate('/');
      enqueueSnackbar(`Welcome back ${username}  , what's your next recipe?`,{variant:"success"})
      setTimeout(()=>{window.location.reload()} , 3000)

    } catch (err) {
      console.log(err);
      enqueueSnackbar("Error , please try again",{variant:'error'})

    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label={'Log in'}
      onSubmit={onSubmit}
      formId={'login-form'}
    />
  );
};

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [_ , setCookies] = useCookies(['access_token']);
  const {enqueueSnackbar}=useSnackbar()
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://bite-wcsg.onrender.com/auth/register', { username, password });
      enqueueSnackbar("Registration completed, you can login now , Enjoy",{variant:"success"})
      setTimeout(()=>{window.location.reload()} , 2000)
      
    

    } catch  (err)  {
      console.log(err);
      
      const errorMessage= err.response.data.message 
      
       enqueueSnackbar(errorMessage|| "There was an error, please change your username or try again later",{variant:'error'})
      
      
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label={'Register'}
      onSubmit={onSubmit}
      formId={'register-form'}
    />
  );
};

const Form = ({ username, setUsername, password, setPassword, label, onSubmit, formId }) => {
  return (
    <div className='auth-container'>
      <form className='auth-form' onSubmit={onSubmit} id={formId}>
        <h2 className='auth-title'>{label}</h2>
        <div className='form-group'>
          <label className='username-input-label' htmlFor={`${formId}-username`}>Username:</label>
          <input
            className='username-input'
            type='text'
            id={`${formId}-username`}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className='form-group'>
          <label className='password-input-label' htmlFor={`${formId}-password`}>Password:</label>
          <input
            className='password-input'
            type='password'
            id={`${formId}-password`}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <button className='form-submit-button' type='submit'>{label}</button>
      </form>
    </div>
  );
};
