import React from 'react';
import { Container, Row, Col, Image, Dropdown, Form, ButtonGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_RIDDLES } from '../../utils/queries';
import './RiddleList.css';

const RiddleList = () => {
    const { loading, error, data } = useQuery(QUERY_RIDDLES);

    if (loading) return <p>'Loading...'</p>;
    if (error) return <p>Error! {error.message}</p>;

    return (
        <Container>
            <h1>Start your Journey {} Select a Riddle</h1>
            <Row>
                {data.getRiddles.map((riddle) => (
                    <Col xs={4} sm={3} md={3} lg={2} key={riddle.id}>
                        <Link to={`/riddles/${riddle.id}`} className="riddle-image-link">
                            <Image src={riddle.background_image} alt="Riddle" fluid />
                            <span className="riddle-id-overlay">{riddle.id || "ID"}</span>
                        </Link>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default RiddleList;