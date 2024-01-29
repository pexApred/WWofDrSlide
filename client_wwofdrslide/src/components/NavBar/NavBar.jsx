import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  Modal,
  Tab,
  Dropdown,
  ButtonGroup,
  Button,
} from "react-bootstrap";
import SignUpForm from "../SignUpForm/SignUpForm";
import LoginForm from "../LoginForm/LoginForm";
import Banner from "../Banner/Banner";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/Context";
import { useQuery } from "@apollo/client";
import { QUERY_RIDDLES } from "../../utils/queries";
import { useApolloClient } from "@apollo/client";
import "./NavBar.css";

const NavBar = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeTabKey, setActiveTabKey] = useState("login");
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn, setUser } = useContext(AuthContext);
  const { loading, error, data } = useQuery(QUERY_RIDDLES);
  const [expanded, setExpanded] = useState(false);
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

  const collapseNavbar = () => {
    setExpanded(false);
  };

  const handleProfileClick = () => {
    if (loggedIn) {
      navigate("/profile");
    } else {
      setShowModal(true);
    }
    if (error) {
      console.error("GraphQL Error:", error);
    }
    collapseNavbar();
  };

  const handleRiddlesClick = () => {
    if (loggedIn) {
      navigate("/riddles");
    } else {
      setShowModal(true);
    }
    if (error) {
      console.error("GraphQL Error:", error);
    }
    collapseNavbar();
  };

  const handleLogout = async () => {
    await fetch("/logout", {
      method: "POST",
      credentials: "include",
    })
      .then(() => {
        setUser(null);
        setLoggedIn(false);
        client.resetStore();
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
    collapseNavbar();
  };

  return (
    <>
      <Navbar className="navbar" expand="xl" expanded={expanded}>
        <Navbar.Brand as={Link} to="/" onClick={collapseNavbar}>
          <span className="text-em">T</span>he{" "}
          <span className="text-em">W</span>onderful{" "}
          <span className="text-em">W</span>orld of d
          <span className="text-em">R</span> slide
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbar"
          onClick={() => setExpanded((expanded) => !expanded)}
        />
        <Navbar.Collapse className="navigation-btns">
          <Nav className="mr-auto">
            {loggedIn ? (
              <>
                <Nav.Link className="profile" onClick={handleProfileClick}>
                  My Profile
                </Nav.Link>
                <Dropdown className="btnSplit" as={Nav.Item}>
                  <Dropdown as={ButtonGroup}>
                    <Button
                      className="btn"
                      variant="success"
                      onClick={handleRiddlesClick}
                    >
                      Solve a Riddle
                    </Button>
                    <Dropdown.Toggle
                      split
                      variant="success"
                      id="dropdown-split-basic"
                    />
                    <Dropdown.Menu>
                      {riddles.map((riddle) => (
                        <Dropdown.Item
                          key={riddle.id}
                          onClick={() => handleRiddleSelect(riddle.id)}
                        >
                          {riddle.id}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </Dropdown>
                {/* <Nav.Link
                  className="profile"
                  as={Link}
                  to="/statistics"
                  onClick={collapseNavbar}
                >
                  Riddle Insights
                </Nav.Link> */}
                <Nav.Link
                  className="profile"
                  as={Link}
                  to="/leaderboard"
                  onClick={collapseNavbar}
                >
                  Leaderboard
                </Nav.Link>
                <Nav.Link className="profile" onClick={handleLogout}>
                  Exit
                </Nav.Link>
              </>
            ) : (
              <Nav.Link className="profile" onClick={() => setShowModal(true)}>
                Enter
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="signup-modal"
      >
        {/* tab container to do either signup or login component */}
        <Tab.Container
          activeKey={activeTabKey}
          onSelect={(k) => setActiveTabKey(k)}
        >
          <Modal.Header closeButton>
            <Modal.Title id="signup-modal">
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link eventKey="login">Enter</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="signup">Join</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey="login">
                <LoginForm
                  setShowModal={setShowModal}
                  onShowSignup={() => setActiveTabKey("signup")}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="signup">
                <SignUpForm setShowModal={setShowModal} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
      <Banner />
    </>
  );
};

export default NavBar;
