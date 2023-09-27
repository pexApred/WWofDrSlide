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
            <h1>Select a Riddle</h1>
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

    // return (
    //     <div>
    //         <h1>Select a Riddle</h1>
    //         <ul className="riddle-list">
    //             {data.getRiddles.map((riddle) => (
    //                 <li key={riddle._id} className="riddle-items">
    //                     <Link to={`/riddles/${riddle._id}`}>{riddle.id || "View Riddle"}</Link>
    //                 </li>
    //             ))}
    //         </ul>
    //     </div>
    // );
};

export default RiddleList;