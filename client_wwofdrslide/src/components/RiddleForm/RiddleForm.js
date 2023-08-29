import React from 'react';
import { Container, Row, Col, Image, Dropdown, Form, ButtonGroup, Button } from 'react-bootstrap';

const RiddleForm = () => {
    return (        
    <>
        <div>
            <h1>Riddle Page</h1>
        </div>

            <Dropdown as={ButtonGroup} >
                <Button variant="success">Riddles</Button>

                <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">1</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">2</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">3</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <input type="string" id="riddleNumber" placeholder="Answer"></input>
        </>
    );
}

export default RiddleForm;