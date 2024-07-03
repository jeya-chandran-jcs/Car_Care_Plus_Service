import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Card, Spinner, Alert } from 'react-bootstrap';

const Confirmation = () => {
  const [confirmationData, setConfirmationData] = useState(null);
  const { bookingId } = useParams();

  const fetchConfirmationData = async () => {
    try {
      const response = await axios.get(`https://car-care-backend.onrender.com/bookings/confirmation/${bookingId}`);
      setConfirmationData(response.data);
      console.log('Confirmation Data:', response.data);
    } catch (error) {
      console.error('Error fetching confirmation data:', error);
    }
  };

  useEffect(() => {
    fetchConfirmationData();
  }, [bookingId]);

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Booking Confirmed</h2>
      {confirmationData ? (
        <Card className="text-center">
          <Card.Header>
            <h4>Booking ID: {confirmationData.bookingId}</h4>
          </Card.Header>
          <Card.Body>
            <Card.Title>Booking Details</Card.Title>
            <Card.Text>
              <p><strong>Name:</strong> {confirmationData.name}</p>
              <p><strong>Email:</strong> {confirmationData.email}</p>
              <p><strong>Phone Number:</strong> {confirmationData.phoneNumber}</p>
              <p><strong>District:</strong> {confirmationData.district}</p>
              <p><strong>Date:</strong> {confirmationData.date}</p>
            </Card.Text>
          </Card.Body>
          <Card.Footer className="text-muted">Thank you for choosing our service!</Card.Footer>
        </Card>
      ) : (
        <Alert variant="info" className="text-center">
          <Spinner animation="border" role="status" className="mr-2">
            <span className="sr-only">Loading...</span>
          </Spinner>
          Loading confirmation...
        </Alert>
      )}
    </Container>
  );
};

export default Confirmation;
