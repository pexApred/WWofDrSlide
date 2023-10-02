import React, { useState, useContext } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations'
import AuthService from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import Context from '../../utils/Context';
import { QUERY_ME } from '../../utils/queries';
import { useQuery, useApolloClient } from '@apollo/client';

const LoginForm = ({ setShowModal }) => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [loginUser, { error }] = useMutation(LOGIN_USER);
  const navigate = useNavigate()
  const { setLoggedIn } = useContext(Context);
  const { loading, error: userError, data: userData } = useQuery(QUERY_ME);
  const client = useApolloClient();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      if (!userFormData.email && !userFormData.username) {
        setShowAlert(true);
        return;
      }
      try {
        const { data } = await loginUser({
          variables: { ...userFormData },
        });
        if (data.login.token) {
          AuthService.login();
          client.resetStore();
          setLoggedIn(true);
          setShowModal(false);
          navigate('/profile');
        }
      } catch (err) {
        console.error(err);
        setShowAlert(true);
      }
    }
    setValidated(true);
    setUserFormData({
      email: '',
      password: '',
    });
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>
        {/* <Form.Group className='mb-3'>
          <Form.Label htmlFor='username'>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your username'
            name='username'
            onChange={handleInputChange}
            value={userFormData.username}
            required
          /> */}
          {/* <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback> */}
        {/* </Form.Group> */}
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
            autoComplete="email"
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
            autoComplete="current-password"
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
