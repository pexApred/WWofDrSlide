import React from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import RiddleList from "../../components/RiddleList/RiddleList";
import SpecificRiddle from "../../components/SpecificRiddle/SpecificRiddle";

const RiddlePage = () => {
    const { id } = useParams();

    return (
        <div>
        <NavBar />
        <Container className="mt-4 mb-4">
                { id ? <SpecificRiddle id={id} /> : <RiddleList/>}
        </Container>
        </div>
    );
    }

export default RiddlePage;