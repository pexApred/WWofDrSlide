import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab, Dropdown, ButtonGroup, Button } from 'react-bootstrap';
import SignUpForm from '../SignUpForm/SignUpForm';
import LoginForm from '../LoginForm/LoginForm';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utils/Context';
import { QUERY_RIDDLES } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { useApolloClient } from '@apollo/client';
import './NavBar.css';

const NavBar = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn, setUser } = useContext(AuthContext);
  const { loading, error, data } = useQuery(QUERY_RIDDLES);
  const client = useApolloClient();

  const riddles = loading || error ? [] : data.getRiddles;

  const handleRiddleSelect = (selectedId) => {
    if (loggedIn) {
      navigate(`/riddles/${selectedId}`);
    } else {
      setShowModal(true);
    }
    if (error) {
      console.error("GraphQL Error:", error);
  }
  };

  const handleProfileClick = () => {
    if (loggedIn) {
      navigate('/profile');
    } else {
      setShowModal(true);
    }
    if (error) {
      console.error("GraphQL Error:", error);
  }
  };

  const handleRiddlesClick = () => {
    if (loggedIn) {
      navigate('/riddles');
    } else {
      setShowModal(true);
    }
    if (error) {
      console.error("GraphQL Error:", error);
  }
  };

  const handleLogout = () => {
    // Clear the user and loggedIn state
    setUser(null);
    setLoggedIn(false);
    // Reset Apollo client store or any other cleanup needed
    client.resetStore();
    // Redirect to home or login page
    navigate('/');
  };

  return (
    <>
      <Navbar className='navbar' bg='dark' variant='dark' expand='lg'>
        <Container fluid>
          <Navbar.Brand as={Link} to='/'>
            The Wonderful World of dR slide
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar'>
            <Nav className='mr-auto'>
              {loggedIn && (
                <Nav.Link className='profile' onClick={handleProfileClick}>Profile</Nav.Link>
              )}
              <Dropdown className='btnSplit' as={Nav.Item}>
                <Dropdown as={ButtonGroup}>
                  <Button className='btn' variant="success" onClick={handleRiddlesClick}>Riddles</Button>
                  <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                  <Dropdown.Menu>
                    {riddles.map((riddle) => (
                      <Dropdown.Item key={riddle.id} onClick={() => handleRiddleSelect(riddle.id)}>
                        {riddle.id}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Dropdown>
              <Nav.Link className='profile' as={Link} to='/statistics'>Statistics</Nav.Link>
              {loggedIn ? (
                <Nav.Link className='profile' onClick={handleLogout}>Logout</Nav.Link>
              ) : (
                <Nav.Link className='profile' onClick={() => setShowModal(true)}>Login/SignUp</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm setShowModal={setShowModal} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm setShowModal={setShowModal} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default NavBar;