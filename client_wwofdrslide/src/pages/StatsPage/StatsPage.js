import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "../../components/NavBar/NavBar";
import RiddleStats from "../../components/RiddleStats/RiddleStats";
import './StatsPage.css';

const StatsPage = () => {
    return (
        <div className="statpage-container">
            <NavBar />
            <Container fluid>
                <Row className="stat-content">
                    <Col md={12}>
                        <RiddleStats />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default StatsPage;