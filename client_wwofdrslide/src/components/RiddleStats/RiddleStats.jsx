import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_RIDDLES } from '../../utils/queries';
import { Col, Row } from 'react-bootstrap';
import './RiddleStats.css';

const RiddleStats = () => {
    const { loading, error, data } = useQuery(QUERY_RIDDLES, {
        fetchPolicy:"network-only"
    });

    if (loading) return <p>'Loading...'</p>;
    if (error) return <p>`Error! ${error.message}`</p>;

    const riddles = data.getRiddles;

    return (
        <Row className="riddle-stats-container">
            <h1>Riddle Statistics</h1>
            {riddles.map((riddle) => {
                const interactions = riddle.interactions || [];
                console.log("start", riddle.id, interactions)
                const totalAttempted = interactions.filter(interaction => interaction.attempted).length;
                const totalSolved = interactions.filter(interaction => interaction.isSolved).length;
                const solvedWithoutHint = interactions.filter(interaction => interaction.isSolved && interaction.hintsUsed.length === 0).length;
                const solvedWithHint = totalSolved - solvedWithoutHint;

                const percentSolved = totalAttempted ? ((totalSolved / totalAttempted) * 100).toFixed(2) : "0.00";
                const percentSolvedWithoutHint = totalAttempted ? ((solvedWithoutHint / totalAttempted) * 100).toFixed(2) : "0.00";
                const percentSolvedWithHint = totalAttempted ? ((solvedWithHint / totalAttempted) * 100).toFixed(2) : "0.00";                

                return (
                    <Col xs={12} sm={6} md={6} lg={4} xl={3} xxl={2} key={riddle._id}>
                        <h2>Riddle: {riddle.id}</h2>
                        <p>Total Attempts: <span>{totalAttempted}</span></p>
                        <p>Solved: <span>{percentSolved}%</span></p>
                        <p>Solved Without Hint: <span>{percentSolvedWithoutHint}%</span></p>
                        <p>Solved With Hint: <span>{percentSolvedWithHint}%</span></p>
                    </Col>
                );
            })}
        </Row>
    );
};

export default RiddleStats;