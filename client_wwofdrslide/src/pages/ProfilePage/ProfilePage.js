import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_RIDDLES } from "../../utils/queries";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "../../components/NavBar/NavBar";
import UserComponent from "../../components/UserComponent/UserComponent";

const ProfilePage = () => {
    return (
        <div>
            <NavBar />
            <Container>
                <Row className="justify-content-center">
                    <Col md={8}>
                        <UserComponent />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ProfilePage;