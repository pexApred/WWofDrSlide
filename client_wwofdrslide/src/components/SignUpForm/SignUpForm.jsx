import React, { useState, useContext } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { AuthContext } from "../../utils/Context";
import { CREATE_USER } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { QUERY_ME } from "../../utils/queries";

const SignUpForm = ({ setShowModal }) => {
  const [userFormData, setUserFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [createUser, {error}] = useMutation(CREATE_USER, {
    onError: (err) => {
      console.error("Error on mutation", err);
      const message = err.graphQLErrors?.[0]?.message || "An error occurred during the signup process.";
      setErrorMessage(message);
      setShowAlert(true);
    },
    refetchQueries: [
      { query: QUERY_ME}
    ]
  });

  const { setLoggedIn, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.stopPropagation();
      return;
    }
    setValidated(true);

    try {
      const { data } = await createUser({ variables: { ...userFormData } });

      if (data && data.createUser) {
        setUser(data.createUser.user);
        setLoggedIn(true);
        navigate("/profile");        
        setShowModal(false);
      }
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
      {showAlert && (
        <Alert variant="danger">
          {errorMessage}
        </Alert>
      )}

        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your email"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            Email is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control
            type="username"
            placeholder="Your username"
            name="username"
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type="invalid">
            Username is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.username && userFormData.password)}
          to='/signup'
          type="submit"
          variant="success"
        >
          Join
        </Button>
      </Form>
    </>
  );
};

export default SignUpForm;
