import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_RIDDLES } from "../../utils/queries";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "../../components/NavBar/NavBar";
import UserComponent from "../../components/UserComponent/UserComponent";
import RiddleStats from "../../components/RiddleStats/RiddleStats";

const ProfilePage = () => {
    return (
        <div>
            <NavBar />
            <Container>
                <Row className="justify-content-center">
                    <Col md={8}>
                        <UserComponent />
                        {/* <RiddleStats /> */}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ProfilePage;