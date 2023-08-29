import React from 'react';
import { Container, Row, Col, Image, Dropdown, Form, ButtonGroup, Button } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { QUERY_RIDDLE } from '../../utils/queries';
import './SpecificRiddle.css';

const SpecificRiddle = ({ riddleId }) => {
    const { loading, error, data } = useQuery(QUERY_RIDDLE, {
        variables: { id: riddleId }
    });

    if (loading) return <p>'Loading...'</p>;
    if (error) return <p>`Error! ${error.message}`</p>;

    return (
        <Container className="specific-riddle-container">
            <Row className="specific-riddle-row">
                <Col className="specific-riddle-col">
                    <Image className="specific-riddle-image" src={data.getRiddle.background_image} fluid />
                </Col>
            </Row>
            <Row className="specific-riddle-row">
                <Col className="specific-riddle-col">
                    <h1 className="specific-riddle-text">{data.getRiddle.riddleText}</h1>
                </Col>
            </Row>
            <Row className="specific-riddle-row">
                <Col className="specific-riddle-col">
                    <Dropdown className="specific-riddle-dropdown">
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            SHOW HINT
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">{data.getRiddle.riddleHint}</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
            <Row className="specific-riddle-row">
                <Col className="specific-riddle-col">
                    <Form className="specific-riddle-form">
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>ENTER ANSWER</Form.Label>
                            <Form.Control type="text" placeholder="Enter answer" />
                        </Form.Group>
                        <ButtonGroup className="specific-riddle-button-group">
                            <Button variant="primary" type="submit">
                                SUBMIT
                            </Button>
                            <Button variant="secondary" type="submit">
                                RESET
                            </Button>
                        </ButtonGroup>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default SpecificRiddle;
