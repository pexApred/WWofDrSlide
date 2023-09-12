import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab, Dropdown } from 'react-bootstrap';
import SignUpForm from '../SignUpForm/SignUpForm';
import LoginForm from '../LoginForm/LoginForm';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../utils/auth';
import Context from '../../utils/Context';
import { QUERY_RIDDLES } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import './NavBar.css';

const NavBar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn } = useContext(Context);
  const { loading, error, data } = useQuery(QUERY_RIDDLES);

  const riddles = loading || error ? [] : data.getRiddles;

  const handleLogout = () => {
    console.log("Logout clicked")
    AuthService.logout();
    navigate('/');
    setLoggedIn(false);
    setShowModal(false);
  };

  return (
    <>
      <Navbar className='navbar' bg='dark' variant='dark' expand='lg'>
        <Container fluid="">
          <Navbar.Brand as={Link} to='/'>
            Wonderful World of Dr. Slide
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar' className='d-flex flex-row-reverse'>
            <Nav className='ml-auto d-flex'>
              <Dropdown onSelect={(selectedId) => navigate(`/riddles/${selectedId}`)}>
                <Dropdown.Toggle variant='success' id='dropdown-basic'>
                  Riddles
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {riddles.map((riddle) => (
                    <Dropdown.Item key={riddle._id} eventKey={riddle._id}>
                      {riddle.id}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              {/* if user is logged in show Riddles and logout */}
              {loggedIn ? (
                <>
              <Dropdown onSelect={(selectedId) => navigate(`/riddles/${selectedId}`)}>
                <Dropdown.Toggle variant='success' id='dropdown-basic'>
                  Riddles
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {riddles.map((riddle) => (
                    <Dropdown.Item key={riddle._id} eventKey={riddle._id}>
                      {riddle.id}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* set modal data up */}
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
