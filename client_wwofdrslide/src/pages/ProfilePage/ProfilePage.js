import React from "react";
import { Container, Row, Col, Card, Button, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import UserComponent from "../../components/UserComponent/UserComponent";
import Footer from "../../components/Footer/Footer";

const ProfilePage = () => {
    return (
        <div>
        <NavBar />
        <Container>
            <Row>
            <Col>
                <UserComponent />
            </Col>
            </Row>
        </Container>
        <Footer />
        </div>
    );
    }

export default ProfilePage;