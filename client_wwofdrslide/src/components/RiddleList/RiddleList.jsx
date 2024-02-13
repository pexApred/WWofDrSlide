import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_RIDDLES, QUERY_ME } from '../../utils/queries';
import './RiddleList.css';
import { BsCheckCircle, BsXCircle, BsHourglass, BsQuestionCircle } from 'react-icons/bs';

const RiddleList = () => {
    const { data: userData } = useQuery(QUERY_ME);
    const { loading, error, data: riddlesData } = useQuery(QUERY_RIDDLES);
    const userId = userData?.me?._id;

    if (loading) return <p>'Loading...'</p>;
    if (error) return <p>Error! {error.message}</p>;

    return (
        <Container>
            <h1 className='riddle-list'>Select a Riddle</h1>
            <Row>
                {riddlesData.getRiddles.map((riddle) => {
                    const userInteraction = riddle.interactions.find(interaction => interaction.userId === userId);
                    let icon;
                    if (userInteraction) {
                        if (userInteraction.isSolved) {
                            icon = <BsCheckCircle color="green" className="status-icon bs-check-circle" />;
                        } else if (userInteraction.givenUp) {
                            icon = <BsXCircle color="red" className="status-icon bs-x-circle" />;
                        } else {
                            icon = <BsHourglass color="yellow" className="status-icon bs-hourglass" />;
                        }
                    } else {
                        icon = <BsQuestionCircle className="status-icon bs-question-circle" />;
                    }

                    return (
                        <Col xs={4} sm={3} md={3} lg={2} key={riddle.id}>
                            <div className="riddle-image-link">
                                <Link to={`/riddles/${riddle.id}`}>
                                    <Image src={riddle.background_image} alt="Riddle" fluid />
                                    {icon}
                                </Link>
                                <div className="riddle-id-overlay">{riddle.id || "ID"}</div>
                            </div>
                        </Col>
                    );
                })}
            </Row>
        </Container>
    );
};

export default RiddleList;
