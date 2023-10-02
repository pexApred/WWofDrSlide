import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { QUERY_RIDDLES, QUERY_ME } from '../../utils/queries';
import { faHatWizard, faPuzzlePiece, faDice } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './UserStatsComponent.css'

const UserComponent = () => {
    const { loading: riddlesLoading, error: riddlesError, data, refetch } = useQuery(QUERY_RIDDLES);
    const { loading: userLoading, error: userError, data: userData } = useQuery(QUERY_ME);

    if (riddlesLoading || userLoading) return <p>'Loading...'</p>;
    if (riddlesError) return <p>`Error! ${riddlesError.message}`</p>;
    if (userError) return <p>`Error! ${userError.message}`</p>;

    const riddles = data.getRiddles;

    const loggedInUser = userData?.me?._id;

    const totalAttempted = riddles.filter(riddle =>
        riddle.interactions && riddle.interactions.some(interaction => interaction.user_id === loggedInUser)
    ).length;

    const totalSolved = riddles.filter(riddle =>
        riddle.interactions && riddle.interactions.some(interaction => interaction.user_id === loggedInUser && interaction.isSolved)
    ).length;

    const totalHintsUsed = riddles.reduce((acc, riddle) => {
        const userInteraction = riddle.interactions && riddle.interactions.find(interaction => interaction.user_id === loggedInUser);
        return acc + (userInteraction && userInteraction.hintsUsed ? userInteraction.hintsUsed.length : 0);
    }, 0);

    // useEffect(() => {

    // }, []);

    return (
        <Row className='user-component-container justify-content-center'>
            <Col sm={8}>
                <Card className='mt-4 stats-card'>
                    <Card.Body>
                        <Row>
                            <Col>
                                <div className='stat-item'>
                                    <FontAwesomeIcon icon={faDice} />
                                    <p>Total Riddles Attempted</p>
                                    <h5>{totalAttempted}</h5>
                                </div>
                            </Col>
                            <Col>
                                <div className='stat-item'>
                                    <FontAwesomeIcon icon={faHatWizard} />
                                    <p>Total Riddles Solved</p>
                                    <h5>{totalSolved}</h5>
                                </div>
                            </Col>
                            <Col>
                                <div className='stat-item'>
                                    <FontAwesomeIcon icon={faPuzzlePiece} />
                                    <p>Total Hints Used</p>
                                    <h5>{totalHintsUsed}</h5>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default UserComponent;