import React from "react";
import { Container, Row, Col, Card, Button, Dropdown } from "react-bootstrap";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
// import RiddleForm from "../../components/RiddleForm/RiddleForm";
import RiddleList from "../../components/RiddleList/RiddleList";
import SpecificRiddle from "../../components/SpecificRiddle/SpecificRiddle";

const RiddlePage = () => {
    const { _id } = useParams();

    return (
        <div>
        <NavBar />
        <Container>
            <Row>
            <Col>
                { _id ? <SpecificRiddle _id={_id} /> : <RiddleList/>}
            </Col>
            </Row>
        </Container>
        </div>
    );
    }

export default RiddlePage;