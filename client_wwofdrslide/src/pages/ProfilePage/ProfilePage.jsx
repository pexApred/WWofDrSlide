import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import { Container, Row, Col } from 'react-bootstrap';
import UserStatsComponent from '../../components/UserStatsComponent/UserStatsComponent';
import EditProfile from '../../components/EditProfile/EditProfile';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const { data: userData, loading } = useQuery(QUERY_ME);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!userData && !loading) {
            navigate('/'); 
        }
    }, [userData,loading, navigate]);

    return (
        <div>
            <Container>
                <Row className='justify-content-center'>
                    <Col md={8}>
                        <EditProfile />
                        <UserStatsComponent />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ProfilePage;