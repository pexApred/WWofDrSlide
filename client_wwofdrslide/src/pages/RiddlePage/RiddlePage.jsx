import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import RiddleList from "../../components/RiddleList/RiddleList";
import SpecificRiddle from "../../components/SpecificRiddle/SpecificRiddle";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";

const RiddlePage = () => {
    const { id } = useParams();
    const { data: userData } = useQuery(QUERY_ME);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!userData) {
            navigate("/"); 
        }
    }, [userData, navigate]);

    return (
        <div>
        <Container className="mt-4 mb-4">
                { id ? <SpecificRiddle id={id} /> : <RiddleList/>}
        </Container>
        </div>
    );
    }

export default RiddlePage;