import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { QUERY_RIDDLES, QUERY_ME } from '../../utils/queries';
import { faHatWizard, faPuzzlePiece, faDice } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './UserStatsComponent.css'

const UserComponent = () => {
    const { loading: riddlesLoading, error: riddlesError, data:riddlesData } = useQuery(QUERY_RIDDLES);
    const { loading: userLoading, error: userError, data: userData } = useQuery(QUERY_ME);

    if (riddlesLoading || userLoading) return <p>'Loading...'</p>;
    if (riddlesError) return <p>`Error! ${riddlesError.message}`</p>;
    if (userError) return <p>`Error! ${userError.message}`</p>;

    const riddles = riddlesData.getRiddles;

    const loggedInUser = userData?.me?._id;    

    const totalAttempted = riddles.filter(riddle =>
        riddle.interactions && riddle.interactions.some(interaction => interaction.userId === loggedInUser)
    ).length;

    const totalSolved = riddles.filter(riddle =>
        riddle.interactions && riddle.interactions.some(interaction => interaction.userId === loggedInUser && interaction.isSolved && !interaction.usedHint)
    ).length;

    const totalHintsUsed = riddles.filter(riddle =>
        riddle.interactions && riddle.interactions.some(interaction => interaction.userId === loggedInUser && interaction.isSolved && interaction.usedHint)
    ).length;

    return (
        <Row className='user-component-container justify-content-center'>
            <Col sm={8}>
            <Card.Title>Score: {userData?.me?.points}</Card.Title>
                <Card className='mt-4 stats-card'>
                    <Card.Body>
                        <Row>
                            <Col>
                                <div className='stat-item'>
                                    <FontAwesomeIcon icon={faDice} />
                                    <p>Riddles Attempted</p>
                                    <h5>{totalAttempted}</h5>
                                </div>
                            </Col>
                            <Col>
                                <div className='stat-item'>
                                    <FontAwesomeIcon icon={faHatWizard} />
                                    <p>Riddles Solved without Hint</p>
                                    <h5>{totalSolved}</h5>
                                </div>
                            </Col>
                            <Col>
                                <div className='stat-item'>
                                    <FontAwesomeIcon icon={faPuzzlePiece} />
                                    <p>Riddles Solved with Hint</p>
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