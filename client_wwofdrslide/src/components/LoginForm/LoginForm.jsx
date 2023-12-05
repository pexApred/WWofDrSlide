import React, { useState, useContext } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations'
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../utils/Context';
import { useApolloClient } from '@apollo/client';

const LoginForm = ({ setShowModal }) => {
  const [userFormData, setUserFormData] = useState({ username: '', password: '' });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [loginUser] = useMutation(LOGIN_USER);
  const navigate = useNavigate()
  const { setLoggedIn, setUser } = useContext(AuthContext);
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
      if (!userFormData.username) {
        setShowAlert(true);
        return;
      }
      try {
        const { data } = await loginUser({
          variables: { ...userFormData },
        });
        if (data.login.token) {
          setLoggedIn(true); 
          setUser(data.login.user); 
          await client.resetStore();
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
      username: '',
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
          <Form.Label htmlFor='username'>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your username'
            name='username'
            onChange={handleInputChange}
            value={userFormData.username}
            required
            autoComplete="username"
          />
          <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
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
        <div className="flex justify-between items-center mb-6">
          <div className="form-group form-check">
            <input
              type="checkbox"
              className=""
              id="exampleCheck2"
            />
            <label
              className="form-check-label inline-block text-gray-800"
              htmlFor="exampleCheck2"
            >
              Remember me
            </label>
          </div>
          <Link to="/forgot-password" className='forgot-password' >Forgot password?</Link>
        </div>
        <Button
          disabled={!(userFormData.username && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
        <p className="text-sm font-semibold mt-2 pt-1 mb-0">
          Don't have an account?
          <Link
            to="/"
            className="signup-link"
          >
            SignUp
          </Link>
        </p>
      </Form>
    </>
  );
};

export default LoginForm;
