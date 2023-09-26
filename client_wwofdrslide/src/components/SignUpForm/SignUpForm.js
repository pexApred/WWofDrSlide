import React, { useState, useContext } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import AuthService from '../../utils/auth';
import { CREATE_USER } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Context from '../../utils/Context';

const SignUpForm = ({ setShowModal }) => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    accesscode: '',
    email: '',
    password: ''
  });
  // set state for form validation
  const [validated, setValidated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  const [createUser, { error }] = useMutation(CREATE_USER);

  const navigate = useNavigate()
  const { setLoggedIn } = useContext(Context);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };
  // submit signup form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      // event.preventDefault();
      event.stopPropagation();
      return;
    }
    setValidated(true);

    try {
      const { data } = await createUser({
        variables: { ...userFormData }
      });

      if (!data) {
        throw new Error('Something went wrong!');
      }
      console.log(data);
      AuthService.login(data.createUser.token);
      navigate('/');
      setLoggedIn(true);
      setShowModal(false);

      // setUserFormData({
      //   accesscode: '',
      //   email: '',
      //   password: '',
      // });
    } catch (err) {
      console.error(err);
      // setShowAlert(true);
    }
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        {error && <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </Alert>}

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='accesscode'>AccessCode</Form.Label>
          <Form.Control
            type='text'
            placeholder='ex. ABC123'
            name='accesscode'
            onChange={handleInputChange}
            value={userFormData.accesscode}
            required
          />
          <Form.Control.Feedback type='invalid'>AccessCode is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Your email address'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
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
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.accesscode && userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignUpForm;
