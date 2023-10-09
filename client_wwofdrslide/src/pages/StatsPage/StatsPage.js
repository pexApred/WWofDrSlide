import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "../../components/NavBar/NavBar";
import RiddleStats from "../../components/RiddleStats/RiddleStats";
import './StatsPage.css';
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";

const StatsPage = () => {
    const { data: userData } = useQuery(QUERY_ME);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!userData?.me) {
            navigate("/"); 
        }
    }, [userData, navigate]);
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