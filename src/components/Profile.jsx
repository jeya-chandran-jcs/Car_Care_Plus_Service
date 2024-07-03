import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import getProfile from '../services/users.js';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';

const Profile = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user && user.token) {
        try {
          const profile = await getProfile(user.token);
          setProfileData(profile);
          console.log("profile data", profile);
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      }
    };

    fetchProfile();
  }, [user]);

  return (
    <Container className="mt-5 mb-5"> 
      <h2 className="text-center mb-4">User Profile</h2>
      {profileData ? (
        <Card className="mx-auto" style={{ maxWidth: '500px' }}>
          <Card.Body>
            <Card.Title className="text-center">Profile Details</Card.Title>
            <Card.Text>
              <Row className="mb-3">
                <Col xs={12} sm={4} className="text-sm-right">
                  <strong>Name:</strong>
                </Col>
                <Col xs={12} sm={8}>
                  {profileData.username}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={12} sm={4} className="text-sm-right">
                  <strong>Email:</strong>
                </Col>
                <Col xs={12} sm={8}>
                  {profileData.email}
                </Col>
              </Row>
            </Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <Alert variant="info" className="text-center">
          <Spinner animation="border" role="status" className="mr-2">
            <span className="sr-only">Loading...</span>
          </Spinner>
          Loading profile...
        </Alert>
      )}
    </Container>
  );
};

export default Profile;
