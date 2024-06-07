import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import RiddleList from "../../components/RiddleList/RiddleList";
import SpecificRiddle from "../../components/SpecificRiddle/SpecificRiddle";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";

import "./RiddlePage.css";

const RiddlePage = () => {
  const { id } = useParams();
  const { data: userData, loading } = useQuery(QUERY_ME);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData && !loading) {
      navigate("/");
    }
  }, [userData, loading, navigate]);

  return (
    <div className="RiddlePage-Wrapper">
      {/* <div className="rules">Scoring Rules:
        <p>* Unlimited guesses, incorrect answers do not affect score</p>
        <p></p>
      </div> */}
      <Container className="sr-container">
        {id ? <SpecificRiddle id={id} /> : <RiddleList />}
      </Container>
    </div>
  );
};

export default RiddlePage;
